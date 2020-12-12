---
title: Eloquent Computed Properties
description: Using computed properties on Eloquent models like Vue computed properties
createdAt: 2020-05-22
image: 7JX0-bfiuxQ
---

As I come from Vue, I was really surprised to learn about this Laravel feature called [**Accessors**](https://laravel.com/docs/7.x/eloquent-mutators#introduction). Let's demonstrate what it is:

I have a store with **product**s. Each product has a **price**. I wanted to add myself the ability to set a global site-wide percentage **discount**.

So how do we go about calculating the right price in all the places we need it?

At first I thought - to keep things simple, let's just add the logic where it's most needed - the payment form.

So I added the logic to check for discounts to the payment form:

```php
// `setting('settingName')` is just a helper I created to get the value of global settings (with caching built in)
@if ($discount = setting('globalDiscount') && $discount != 1)
  <span>
    <span class="line-through">
      // `@money` is a custom blade directive that formats money nicely
      @money($product->price)
    </span>
    <span>
      @money($product->price * $discount) after discount
    </span>
  </span>
@else
  <span>
    @money($product->price)
  </span>
@endif
```

And also to the actual payment logic (in the controller):

```php
$charge = Stripe::charges()->create([
    'customer' => $customer['id'],
    'currency' => 'USD',
    'description' => $product->title,
    'receipt\_email' => $user->email,
    'amount' => $product->price * (setting('globalDiscount') ?: 1), // ahhh this nice ternary shorthand syntax of PHP...
]);
```

So that did the job. Now I can set a global discount, and all products will get discounted with the percentage.

### Adding Discount Per Product

Yesterday I wanted to be able to set a discount price to a single product - without having to put the whole store on sale...

So I added a `discount` column to the products table, which will store the sale price for each product. But now we need to update the logic to not only check for a globalDiscount, but also for a productDiscount. At first I tried something like this:

```php
@if ($discount = setting('globalDiscount') && $discount != 1)
  // use global discount
@elseif ($product->discount)
 // use product discount
@else
 // use regular price
@endif
```

And I also need to update the logic by the actual payment:

```php
$charge = Stripe::charges()->create([
    // ...
    // TODO: also check for product specific discount
    // This would have to get messy 😢
    'amount' => $product->price * (setting('globalDiscount') ?: 1),
]);
```

Then I also wanted to show the discounted price on the product page, and on the store index... I would have to rewrite all this logic in each place, and that's not DRY (**d**on't **r**epeat **y**ourself) code.

### Eloquent Accessors to the Rescue

Fortunately, in Laravel models can have properties that don't actually exist in the database, rather they're just computed from other properties. Think of it like Vue computed properties! They're called [accessors](https://laravel.com/docs/7.x/eloquent-mutators#introduction) in Laravel.

> To define an accessor, create a **`getFooAttribute`** method on your model where **`Foo`** is the "studly" cased name of the column you wish to access.

So here is how we can use it: we'll define an accessor for the `isOnSale` attribute called `getIsOnSaleAttribute`. The accessor will automatically be called by Eloquent when attempting to retrieve the value of the `isOnSale` attribute, which will return a Boolean indicating if the product is on sale:

```php
class Product extends Model {

    // ...

    public function getIsOnSaleAttribute() {
        return !!$this->discount || setting('globalDiscount') != 1;
    }
}
```

And another accessor called `finalPrice`:

```php
public function getFinalPriceAttribute() {
    if ($this->onSale) { // note how we're using the previous accessor here!
        $globalDiscount = $this->price * setting('globalDiscount');
        return ($this->discount && $globalDiscount > $this->discount) ? $this->discount : $globalDiscount;
    } else {
        return $this->price;
    }
}
```

Now anywhere we want to get the products' price, we just use `$product->finalPrice`, and we get the right price. Beautiful!

So we can update the payment form to account for both types of discounts:

```php
@if ($product->isOnSale) // any type of sale
  <span class="line-through">
    @money($product->price)
  </span>
  <span>
    @money($product->finalPrice) after discount
  </span>
@else
  <span>
    @money($product->price)
  </span>
@endif
```

And here is the updated payment method:

```php
 $charge = Stripe::charges()->create([
    // ...
    'amount' => $product->finalPrice, // Aaaahhhhh... Much cleaner! 😍
]);
```

Now it's also very simple to show the discount in all other places:

![](/storage/canvas/images/u3s49dlDfSNbnoHCkD5bKnaKRDtt3onniMbYGVBF.jpeg)

So putting your logic in model accessors not only frees up your views from business logic, it also simplifies everything, and when you need to change the logic you can just do it in one place, instead of changing it in all the separate places.
