---
title: Typehinting server side props
description: Adding types to server side props to get the complete Typescript experience with Vue
createdAt: 2023-01-22
image: PGdW_bHDbpI
---

My current prefered stack is using Laravel for the backend, Vue 3 for the frontend and Inertia.js for the communication between backend & frontend and routing.

We have Models on the backend, which are the entities that make up the application. These models are sent to the frontend as json, which get passed to the Vue page component as props.

Let's take this example: we have a `Post` model, which has the following shape:

```json
{
  "id": 1,
  "cover_image": "https://example.com/storage/1/cover-image.jpg",
  "title": "Laravel is great",
  "excerpt": "...",
  "body": "<p>...</p>",
  "published_at": "2022-11-20T00:00:00.000000Z",
  "author": {
    "id": 1,
    "name": "John Doe"
  }
}
```

In the Vue page component we have the following:

```js
const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
})
```

Our IDE knows nothing about the type of `posts`, other than it's an `Array`. We don't get any autocompletion for the `post`s, we need to check the backend code to see the shape of the `post` object, and it's very error prone, as the IDE won't warn if we make a typo.

### Automatically Generating Typescript Definitions

The first step we need to take is to write Typescript definitions for our backend models. But this can be tedious to do by hand, especially when our models tend to change during development.

Thankfully, there's a useful package we can use to auto generate TS definitions for our Laravel models, [`based/laravel-typescript`](https://github.com/lepikhinb/laravel-typescript).

Once installed with `composer` we can generate TS definitions with this command:

```bash
php artisan typescript:generate
```

This generates a `models.d.ts` file containing the following (for our example above):

```ts
declare namespace App.Models {
  export interface User {
    id: number
    name: string
  }

  export interface Post {
    id: number
    cover_image: string
    title: string
    body: string
    published_at: string | null
    author?: App.Models.User | null
  }
}
```

### Typehinting Vue Props

Now we can typehint the props like so:

```js
import { PropType } from 'vue'

const props = defineProps({
  posts: {
    type: Array as PropType<App.Models.Post[]>,
    required: true,
  },
})
```

Once the `post` prop has been typehinted, we get intellisense autocompletion in the `<script>` and also in the `<template>` part of Vue SFCs (make sure to use the Volar VScode extension instead of the old Vetur).

This is already a massive DX improvement. We get intellisense for model properties, compile-time errors if we make a mistake or when our model definitions change.

### Dynamic Types

We still have a problem. When paginating query results, Laravel wraps the array of models in an object containing more details about the pagination.

For instance, when paginating `Post`s, instead of a `Post[]` (an array of `Post`s), we get an object in the following shape:

```json
{
  "data": [
    /* Posts */
  ],
  "meta": {
    "from": 1,
    "to": 20,
    "per_page": 20,
    "total": 199,
    "current_page": 1,
    "last_page": 20,
    "path": "https://example.com/posts"
  }
}
```

We can't typehints `posts` as `App.Models.Post[]`, because now it's an object containing extra meta about the pagination, in additional to a `data` property which contains the actual `App.Models.Post[]` array.

We don't want to manually create types for the paginated version of each of our models either.

Luckily, Typescript has a nifty solution for this. It's called [**Generics**](https://www.typescriptlang.org/docs/handbook/2/generics.html). It's basically a way to add parameters to type definitions. So this is how we can declare one type definition for paginated models:

```ts
type Paginator<T> = {
  data: T[]
  meta?: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}
```

We declare a type `Paginator` which takes a parameter `T`. The `data` property is then typed as `T[]`, which simply means - an array of the type `T`, which is passed as a parameter when the type is used.

Here is an example usage:

```js
defineProps({
    posts: Object as PropType<Paginator<App.Models.Post>>,
});
```

Now our IDE knows the exact shape of `posts`, and the `Paginator` type can be reused for any paginated model in our codebase. Amazing!
