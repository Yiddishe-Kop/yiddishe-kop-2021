---
title: Imagination Driven Development
description: Developing software using the Imagination Driven Development principle
createdAt: 2020-10-11
image: J9NDmBVhN04
---

The nice thing about creating your own software from scratch is that you can make it work just like your rosiest imaginations. When writing the developer exposed API for the [Laravel Commerce](https://laravel-commerce.yiddishe-kop.com/) PHP package, I started by creating the high level methods, in a way that I would want them to look. I wanted the API to be as simple and expressive as possible, so it's a pleasure to work with. Inspired by Laravel of course 😎.

## Laravel Commerce Package

After searching for a simple ecommerce package for Laravel and not finding a lightweight simple to use solution - I decided to attempt to create one myself.

So where do we start?

When thinking about ecommerce the first thing that comes to mind is the **cart** (products come first, but is not part of the package, but part of every application itself). So let's imagine how we'd like to be able to interact with the cart. First up - add products to the cart, hmm... I think it couldn’t get simpler than this:

```php[cart.php]
Cart::add($product);
```

But what if we want to set the quantity to add? 🤔 This looks nice:

```php
Cart::add($product, int $quantity);
```

It would be nice to be able to remove a product from the cart as well...

```php
Cart::remove($product);
```

Wouldn't it be nice to be able to empty the whole cart in one go?

```php
Cart::empty(); // nice!
```

At checkout we need a way to calculate the totals (tax, shipping, coupons etc):

```php
Cart::calculateTotals();
```

## Implementing the Logic

Once I was happy with the surface API, and we could do everything we'd need to to interact with the cart, now comes the task of actually making this imaginary API actually work! 😀

So now we get into the weeds of creating the DB table for the cart & cart-items, getting an instance of a cart, storing the cart in the session (so guests can also have a cart) and dealing with all the edge cases. We'll get stuck in deep rabbit holes, but when we come out, our surface API will still be as beautiful as they were in our imagination, because we wrote that before going into the implementation. We made the implementation fit to our API, and not the other way around 👌.

### Takeaway

I learnt a new way of developing software - start with the outside shell, make it look like your best dream, then implement the logic to get it to work. It's like designing the exterior of a car to your imagination, then building the engines to fit.

The above packages development is well underway, and is open-source on [GitHub](https://github.com/Yiddishe-Kop/laravel-commerce), and there's really nice [documentation](https://laravel-commerce.yiddishe-kop.com/) too!
