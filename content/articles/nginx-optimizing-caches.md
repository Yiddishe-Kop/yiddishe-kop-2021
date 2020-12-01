---
title: NGINX - Optimizing with Gzip & Cache-Control
description: Configuring cache control and gzip with nginx
createdAt: 2020-09-11
image: woWf_VJ7dNs
---

Today I was reading about SEO, and how site speed affects the ranking of a site. I wondered how apps built with the [Laravel](https://laravel.com) framework fare in these speed tests. So I ran [Pninim](https://pninim.yiddishe-kop.com/) through a [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) test (by Google).

The site scored a **95** 😎 for desktop, and **66** for mobile. I was pretty satisfied by the desktop score, but let's see what we can do to make it even faster.



## Browser Caching

First up we can leverage browser caching to speed up subsequent visits to our site.


### How it Works

We can tell the visitors' browser that it doesn't need to refetch assets (like JS, CSS, images & fonts) every time the user visits our site; instead cache it [save it locally] after the initial visit for future visits, so future visits will be MUCH faster 🚀.

The way we tell this to the browser, is by adding a `Cache-Control` header saying how long the browser can cache the resource.

In Laravel, by default everything has a `Cache-Control: no-cache` set, which tells the browser: "don't cache me at all", which might be what we want for dynamic resources, but inefficient for static files.

I'm using **nginx** to serve [Pninim](https://pninim.yiddishe-kop.com/), and static files are served directly by nginx. So let's configure nginx to add the right `Cache-Control` headers to our static assets.

We add this to the top of our nginx configuration:

```bash
# Expires map
map $sent_http_content_type $expires {
    default                    off;
    text/html                  30d;
    text/css                   max;
    application/javascript     max;
    ~image/                    max;
    ~font/                     max;
    application/octet-stream   max;
}
```

Here we first set the default `expires` to be `off`. Then we override it for specific file types. `30d` will set the cache to expire in 30 days. `max` will give 10 years until it expires.

Then in our `server` block we add this:

```bash
expires $expires;
```

We reload nginx, and then we see that assets get the right headers:

![](https://blog.yiddishe-kop.com/storage/canvas/images/rFTs9lfWVdVB28T9oNO7t5TgCGqtSINLm4chY6vO.png)

Now browsers will load these files from cache on repeat requests.



### What about Cache Busting?

There is one problem with this approach: what happens when we make changes and we update the Javascript? Visitors will still get the old version from their cache.

A nice solution is to add a version query string to the urls. So for `https://pninim.yiddishe-kop.com/app.js` we add an id like so: `https://pninim.yiddishe-kop.com/app.js?id=e89f64ieac9234987`. Now every time we update our JS we also update this id, which invalidates the cache (because even though the URL is the same, a change in the query parameter is considered a different url for the browser cache).

And don't worry, this is all done automatically by **webpack** on build (using [**Laravel Mix**](https://laravel-mix.com/)):

```js
if (mix.inProduction()) {
  mix
    .version() // <- adds the version query parameter
    .sourceMaps()
}
```

## Gzip Compression

Another optimization we can add - is gzip compression. Text based resources can be compressed to minimize the amount of bytes transferred over the network.

Turns out it's quite simple to configure in **nginx**:

```bash
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;
```

In the last line we specify all file types we want to apply gzip compression.

### Results

After enabling browser caching & gzip compression, our PageSpeed Insights results went up to **97** for desktop & **74** for mobile, which is really good!

I'm attaching the full **nginx** config for convenience:

<script src="https://gist.github.com/Yiddishe-Kop/61ff1140e97d393d4da6c0ad6d7a4518.js"></script>
