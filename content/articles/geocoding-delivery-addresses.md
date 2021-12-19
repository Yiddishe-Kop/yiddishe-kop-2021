---
title: Geocoding Delivery Addresses
description: Optimizing ecommerce deliveries by creating delivery areas
createdAt: 2021-12-19 21:30:00
image: p79nyt2CUj4
---

In one of the projects I'm working on ([5Dakot](https://5dakot.com)), I was building the deliveries system, which was initially structured something like this:

```yaml
Order:
  attributes:
    # ...
    address_id
  relations:
    address

Address:
  attributes:
    user_id,
    address,
    address_2,
    floor,
    # ...
    apt,
    town_id
  relations:
    user,
    town

Town:
  attributes:
    name,
    slots, # array of delivery time slots
    areas # array of areas in this town
```

The admin could add the `Town`s they want to offer delivery to, and users could save multiple addresses.

When saving an address, the user would have to select a `Town` & `area` from a dropdown that was dynamically populated from the available towns & areas.

### Shortcomings

This worked quite well. But the user could still enter an address outside the supported towns, and we just had to rely on the user to understand that we don't deliver outside the listed towns.

### Additional Requirements

Sales were booming 🚀🚀🚀.

Grouping deliveries by `Town` was not sufficient anymore. They wanted to be able to split a `Town` into **Delivery Areas**, then be able to set separate delivery slots for each area.

I knew I had 2 options how to build this:

1. Getting a list of all streets in Israel, maually assigning each to an area, then in the `Address` form require the user to select from this list of streets. But this would be very tedious... and what do we do if we want to split a long street into multiple areas?
2. Let the admin literally draw areas on a map, and then automatically attach `Address`es to their corresponding area based on their location. This would be way better!

But this seemed way too complicated... Where do I even start?

Luckily this turned out to be easier than it seemed!

### Outline

Let's break it down into smaller pieces:

1. Build a UI where an admin can draw an `Area` on a map.
2. Save GPS coordinates with each `Address`.
3. Automatically attach each `Address` to its `Area` based on its GPS coordinates.

Now let's see what we'll need from the technical side, by updating the above outline:

```yaml
Order:
  attributes:
    address_id
  relations:
    address

Address:
  attributes:
    user_id,
    address,
    address_2,
    floor,
    apt,
    lng, # longitude
    lat, # latitude
    area_id # instead of town_id
  relations:
    user,
    area # instead of town

# New!
Area:
  attributes:
    name,
    polygon, # this will define the borders of the area
    slots, # array of delivery time slots
    town_id
  relations:
    town

Town:
  attributes:
    name
```

Now that we've outlined it, let's build it!

## Drawing the Area on the Map

<article-image src="/img/map-ui-large.jpg" caption="Drawing the area on the Map"></article-image>

I used the [Google Maps API](https://developers.google.com/maps/documentation/javascript) to create the above UI.

The API provides the full functionality for [drawing shapes](https://developers.google.com/maps/documentation/javascript/shapes) on the map!

What we need, is a [Polygon](https://developers.google.com/maps/documentation/javascript/shapes#polygons):

<quote>

A `Polygon` represents an area enclosed by a closed path (or loop), which is defined by a series of coordinates. `Polygon` objects are similar to `Polyline` objects in that they consist of a series of coordinates in an ordered sequence. `Polygons` are drawn with a stroke and a fill.

</quote>

With that knowledge in mind, we can create the above UI:

```js
// Initialize the map
map = new google.maps.Map(document.getElementById('map'), {
  center: townCoords[0],
  zoom: 12,
})

// Construct the polygon.
polygon = new google.maps.Polygon({
  paths: [ // default starting Polygon
    { lat: 31.755976167072834, lng: 35.14138275146484 },
    { lat: 31.720342984569367, lng: 35.25284960937502 },
    { lat: 31.819437779330364, lng: 35.231975524902325 },
  ],
  strokeColor: '#E3163B',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#E3163B',
  fillOpacity: 0.35,
  editable: true, // this is all we need to make the polygon editable on the map!
  // draggable: true,
})

polygon.setMap(map) // add the polygon to the map
```

This gives us a starting polygon, which is editable on the map by adding/dragging points:

<article-image src="/img/polygon.jpg" caption="You can edit the polygon by adding & dragging points"></article-image>

### Saving the Area to our Database

All we need to save to our database - is the Polygon, which is just an array of `[lng, lat]` points. We can save this in a `json` field on the `Area`.

When the user clicks "save" we get the Polygon from the map like so:

```js
getPolygon() {
  let vertices = polygon.getPath() // polygon is defined in the previous snippet
  let polygonCoords = []
  for (let i = 0; i < vertices.getLength(); i++) {
    const xy = vertices.getAt(i)
    polygonCoords.push({ lat: xy.lat(), lng: xy.lng() })
  }
  return polygonCoords
}
```

Now that the areas are done, we need to add GPS coordinated to the `Address`es!

## Adding GPS Coordinates to Addresses

I updated the Address form to use Google's Places Autocomplete API, and also made that a user can only select his address from the Autocomplete list, which then also gives us the addresses coordinates.

```js
// Jerusalem center coordinates
const jerusalem = { lat: 31.7820715, lng: 35.2106184 }

// Create a bounding box with sides ~30km away from jerusalem center
const jerusalemAreaBounds = {
  north: jerusalem.lat + 0.3,
  south: jerusalem.lat - 0.3,
  east: jerusalem.lng + 0.3,
  west: jerusalem.lng - 0.3,
}

const options = {
  bounds: jerusalemAreaBounds, // only give results within these bounds
  componentRestrictions: { country: 'il' }, // only give results from this country
  fields: ['address_components', 'geometry', 'name'], // 'geometry' - GPS coordinates
  origin: jerusalem,
  strictBounds: true,
  types: ['address'],
}

const autocomplete = new google.maps.places.Autocomplete('input-selector', options)

// handle user select address result
this.googlePlacesAutocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place.geometry.location) {
      this.address.lat = place.geometry.location.lat() // set address lat
      this.address.lng = place.geometry.location.lng() // set address lng
    }
})
```

Now we can save the `lat` and `lng` coordinates with the `Address`.

## Attaching the Address to an Area

We now have a list of `Area`s, and an `Address` with `lat` & `lng`. How do we find out in which `Area` it is located?

Let's break it down.

First we need a way to check if a given Areas `polygon` contains a given GPS point. Thankfully, there are already open-source implementations of the algrithm needed to do this. I used the [mjaschen/phpgeo](https://github.com/mjaschen/phpgeo) PHP package:

```php
class Area extends Model {

    /**
     *  Check if Area contains these coordinates
     */
    public function containsCoordinates($lng, $lat): bool
    {
        if (!$this->polygon) return false;

        $addressCoordinate = new Coordinate($lat, $lng);

        $polygon = new Polygon();
        foreach ($this->polygon as $point) {
            $polygon->addPoint(new Coordinate($point['lat'], $point['lng']));
        }
        return $polygon->contains($addressCoordinate);
    }

}
```

So now we can check if a given Area contains a coordinate:

```php
$area->containsCoordinates($address->lng, $address->lat); // boolean
```

Now for the nice Laravel finishing touch 😋: We can use Laravel's form validation to ensure that the chosen address is in one of our supported Areas!

```php
class UpdateAddressRequest extends FormRequest
{
    public function prepareForValidation()
    {
        // automatically set `area_id` by finding the Area that contains this address
        $this->merge([
            'area_id' => Area::findByCoordinates($this->lng, $this->lat)?->id,
        ]);
    }

    public function rules()
    {
        return [
            'user_id' => 'nullable',
            'address' => 'required',
            'address2' => 'nullable|string',
            'floor' => 'required|string',
            'apt' => 'required|string',
            'lng' => 'required',
            'lat' => 'required',
            'area_id' => 'required|exists:areas,id',
        ];
    }

    public function messages()
    {
        return [
            'area_id.required' => "Sorry, we don't deliver to this area yet.",
        ];
    }
}
```

Note how we automatically set the `area_id` by finding the Area that contains this Address. If we don't find an Area that contains this address, we return a descriptive validation error message to the user - 'Sorry, we don't deliver to this area yet.' 👌

We can now have multiple Areas in a Town, Addresses automatically get attached to their Area, and we can have delivery slots per area.

### Extras

I also created an Artisan Command to add coordinates to all existing Addresses (~1700 addresses!) by using the [Google Places Geocoding API](https://developers.google.com/maps/documentation/places/web-service/search-find-place):

```php
 // get lng lat for address
public function geocode()
{
  $result = Http::timeout(3)->get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json", [
        'fields' => 'geometry',
        'input' => $this->address,
        'inputtype' => 'textquery',
        'key' => config('services.google.api_key'),
    ]);
    return Arr::get($result->json(), 'candidates.0.geometry.location');
}
```

Another thing I need to handle is when the admin updates an Area bounds `polygon`, all addresses `area_id` need to be updated.

## Conclusion

I really enjoyed solving this challenge, which worked out way better than I thought it would. It was also surprisingly much easier than I thought such a feature would be to implement, thanks to Google Maps APIs, and some open-source libraries.
