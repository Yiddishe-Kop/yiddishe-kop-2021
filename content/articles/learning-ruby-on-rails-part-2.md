---
title: Learning Ruby on Rails - Part 2
description: Attaching a Vue frontend to a Rails backend with Inertia.js
createdAt: 2021-01-24 00:44:00
image: ellaVGqPgww
---

Last week I went by the traditional way of building web apps - using server side rendered Ruby templates [`.erb` files]. But I really like using [Vue](https://vuejs.org/) on the frontend, and [Inertia.js](https://inertiajs.com/) as the adapter between the frontend & backend. I've been building quite a few Laravel apps that way and I really like the speed and simplicity of this stack. Not to mention that by now I have a growing collection of Vue components and layouts for lots of scenarios. So let's convert our Matzati app to a [**Modern monolith**](https://en.wikipedia.org/wiki/Monolithic_application).

### Inertia Dependancies
 The Inertia docs have [instructions](https://inertiajs.com/server-side-setup) how to get started in a Ruby app:

```bash
gem 'inertia_rails'
```

Add the above to the `Gemfile`, which is like `composer.json` or `package.json`, then run `bundle install` to install the dependencies.

### Root layout
We also have to update the root view (`application.html.erb`) to load the js assets that boot up the Vue frontend, and insert `<%= yield %>` in the body - that Inertia will populate with the Vue app.

### Inertia Responses

We can now send Inertia responses from the controller! An Inertia response is comprised of 2 parts:
1. The path to the Vue component to render.
2. The json data that will be passed as props to that Vue component.

Let's update the `aveidas/index` route to return an Inertia response:

```ruby
def index
    aveidas = Aveida.all

    render inertia: 'Aveidas/Index',
      props: {
        aveidas: aveidas.as_json
      }
  end
```
Now, when reloading the page it's blank! That's because haven't yet setup Vue for the frontend. 😀

### Vue Frontend
Let's use Vue 3, because it's fun to be on the cutting edge:

```bash
yarn add vue@next
```

Then install the vue-inertia client-side adapter:

```bash
yarn add @inertiajs/inertia @inertiajs/inertia-vue3
```

The we follow the instructions to setup the main `application.js`:
```js
import { createApp, h } from 'vue'
import { App, plugin } from '@inertiajs/inertia-vue3'

const el = document.getElementById('app')

createApp({
  render: () => h(App, {
    initialPage: JSON.parse(el.dataset.page),
    resolveComponent: name => require(`./Pages/${name}`).default,
  })
}).use(plugin).mount(el)
```

We can see in line 9 that `resolveComponent` expects the page components to reside in `./Pages/${name}` relative to this file. So I guess we should create a `Pages` folder, and then `Aveidas/Index.vue` which we passed as the path in the `aveidas_controller#index` method's response.
Here we can also see how the core of Inertia works: the server renders a single `div#app`, that looks like this:

```html
<div id="app" data-page="{'component':'Aveidas/Index','props':{'aveidas':[{'id':1,'title':'Menorah','body':'Lost a silver Menorah on Zos Channukah','created_at':'2021-01-16T21:06:11.660Z','updated_at':'2021-01-16T21:06:11.660Z'},{'id':3,'title':'Smashed cake','body':'For my daughters cake smash party','created_at':'2021-01-16T22:01:59.487Z','updated_at':'2021-01-16T22:11:29.165Z'},{'id':4,'title':'hello','body':'world','created_at':'2021-01-16T22:02:14.313Z','updated_at':'2021-01-16T22:02:14.313Z'}]},'url':'/','version':null}"></div>
```

It simply inserts the component path & props as json in a `data-page` attribute on the `div#app` right in the HTML. Then, in `application.js` Inertia retreives that with `initialPage: JSON.parse(el.dataset.page)` (in line 8). That's how Vue gets the initial data from the server on. the initial visit.
Once the app is loaded and you click on a link to another page, Inertia intercepts the click [for that we use the `<inertia-link href="..."/>` component instead of a regular `<a href="..."/>`], and instead of making a full page reload, sends an XHR request, and updates the page & props with the JSON response. This makes subsequent page visits really smooth.
Now that I wrote it out, I think Inertia is really simple to understand!

As I'm completely new to Rails ans its ecosystem, I got stuck at loading Vue SFCs with Webpack. [This article](https://dev.to/vannsl/vue3-on-rails-l9d) saved me. See [this commit](https://github.com/Yiddishe-Kop/matzati/tree/e9b58610096f400b5c8a28281b1c24fad72498ed) for the code at this point in time.

So now we create the `Aveidas/Index.vue` component:
```html
<template>
  <div>
    <h1>Aveidas</h1>
    <ul>
      <li v-for="aveida in aveidas" :key="aveida.id">
        <h4>{{ aveida.title }}</h4>
        <p>{{ aveida.body }}</p>
        <inertia-link :href="`/aveidas/${aveida.id}`">
          Show
        </inertia-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AveidasIndex',
  props: {
    aveidas: Array
  },
}
</script>
```

We get `aveidas` as a prop from the Inertia response, and use it like a regular Vue prop. Also Notice the usage of `<inertia-link>` to link to the `show` page for each aveida. That ensures that Inertia will handle the page visit.

### Some Gotchas

When redirecting in Rails, we use `redirect_back` or  `redirect_to ...`. I expected a redirect to an Inertia route to render the Vue page, instead I got a `Turbolinks.visit(...)` response. I had to disable the default Turbolinks, as we want to handle navigation with Inertia and not the default Turbolinks. So just removing `gem 'turbolinks', '~> 5'*` from the `Gemfile` did the trick.

When performing a `POST`  or `PATCH` request, Rails tries to verify the CSRF token. In traditional apps the CSRF token is attached to every request. But as we're using Inertia to make XHR requests, we need to configure it to also attach the CSRF token. One way of doing this is telling Rails to attach tje token to a cookie:

```ruby
class ApplicationController < ActionController::Base

before_action :set_csrf_cookie

# Store the CSRF token in a non-session cookie so Axios can access it
  def set_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token
  end
end
```

Then configure `axios` (which is what Inertia uses under the hood) to pass on the cookie:
```js
import axios from 'axios'
// Tell Axios to send the CSRF token (taken from the cookie)
// in the header named as "X-CSRF-Token", as this is the name
// expected by Rails
axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
axios.defaults.withCredentials = true;
```

To get the dev-server with HMR running, run this command from project root:
```bash
./bin/webpack-dev-server
```

### Wrap

That's it for now. Setting up Inertia and Vue with Rails was fairly straightforward for the most part, I just stumbled upon configuring the Vue SFC loader, and the dev server. But this looks promising!
Next up I want to add [TailwindCSS](https://tailwindcss.com/) (v2) to this app to make styling fast and fun💡.
