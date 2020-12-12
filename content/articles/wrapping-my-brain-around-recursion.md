---
title: Wrapping my Brain around Recursion
description: Trying to understand the concept of recursion in programming
createdAt: 2020-06-04 16:29:00
image: YfCVCPMNd38
---

When I was at the start of my programming career, whenever I saw something about recursion, I would run away as fast as I could — 😲 RECURSION 😲 — what could be scarier than this complicated concept?

One day (about 2 years into my programming journey), I was coding along, when suddenly an unexpected thought popped up in my brain: wait! **recursion** is the perfect way to solve this problem/challenge!

## The Challenge

I was building a desktop client to edit wikipedia pages (or any wiki powered site) offline. The way it works is like so: I present the user with a list of categories that exist on the site. The list is a tree, where every category can have subcategories, and subcategories have subcategories, and so forth. The category tree is many levels deep, and every branch ends with a list of pages in the category.

The user would then select some categories, and press a button to save them all to his computer for offline use.

So the first thing we need to do — is to build up the category tree & store it in a json file for the program to use.

I found a Node Wiki API library called [**`nodemw`**](https://github.com/macbre/nodemw), which exposes lots of nice methods to interact with the API.

We can use this methods the library provides us:

- `getSubcategories`: this method takes the category title as a parameter, and returns an array of all subcategories & pages that are members of this category.

Unfortunately, the wiki API doesn't have an endpoint for retreiving all nested categories at once, we can only get 1 level of children at once. But we need to get all the subcategories however deep they might go...

## The Brainstorm

This is a complex challenge, so let's try to break it down into small parts:

1.  Get subcategories of the root category.
2.  For each item in the returned array: Each item could be either a subcategory, or a page. So we need to check:

    - If it is a page, do nothing.
    - But if it's a subcategory — then we need to get **its** subcategories — in other words: **go back to step 1**! 💡💡💡 (when you arrive here the 2nd time — go back to 1 again, forever 😲)
    - But that's not all: after we get its subcategories, we need to assign it to its parent category, because we're building a tree, right?

Here is where it clicked in my head: **This is recursion!!!**

We need to repeat a task over & over again for an unknown amount of times, until a certain condition is met. If we don't put a solid condition in place - the computer might repeat over the task infinitely — until the computer crashes, or until there is a stack-overflow 🤯 (between ~10,000 - ~30,000 levels).

## Implementation

Once we understand the concept - we can get to write the code to do the task 😎. And oh is this part complicated... especially when we need to fetch data over the network in each iteration of the loop...

I spent 2 days overheating my brain writing this function... There were countless sub-challenges that I had to break through in the process. But first let's have a look at the final working code 👀:

I added comments in the code, instead of explaining every line separately.

```js
async rebuildCategoryTree() {

  // 1. Get children of root category
  const rootCats = await this.$wiki.getSubcategories('עץ קטגוריות ראשי');

  // 2. Here we define the recursive function
  const getChildren = async cats => {
	// do some important checks
    if (cats.some(cat => cat.type == 'subcat' && !cat.subcats)) {
      console.log('diving deeper...', cats);
      for (const cat of cats) {
          if (cat.type == 'subcat') {
            let subcats = [];
            let cachedCat = this.cachedCats[cat.title];
            if (cachedCat) {
              // we already fetched these from the server
              if (cachedCat.visited) {
                // STOP! we have an infinite loop!
                console.log('TERMINATING INFINITE LOOP', cat.title);
                return cachedCat.subcats;
              }
              console.log('...Using cache', cat.title);
              // my solution to overcome infinite loops (circular relations)
              cachedCat.visited = true;
              subcats = cachedCat.subcats; // use from cache
            } else {
              console.log('...Fetching fresh', cat.title);
              // THE ACTUAL WORK - fetch category members
              subcats = await this.$wiki.getSubcategories(cat.title);
              // add to cache
              this.cachedCats[cat.title] = {
                ...cat,
                subcats,
              };
            }
            // calls this function itself - to recursively fetch children
            cat.subcats = await getChildren(subcats);
          }
        }
    } else {
      console.log('coming out...', cats);
    }
    return cats;
  };

    // 3. Start working!
    // this tiggers the recursion
    const catTree = await getChildren(rootCats);

    // 4. Save the resulting tree as a json file
    this.writeFile(catTree);
}
```

## Sub-Challenges

Here are some of the challenges that arose while writing the recursive function:

### 1. Circular Relations** (infinite loops):

I was testing the code, and it seemed to be working, but it was taking forever... Although the wiki site I was working with has 83,691 pages, it still seemed to be taking too long.

After debugging a while — I caught the culprit. Not a bug in my code, but on the wiki site. They had a few circular relationships (where **category A** had **category B** which had **category A** as a child...) which caused an infinite loop 🤯.

At first they fixed it on the wiki site, but I still couldn't guarantee that such loops don't exist in other places in the tree. So I had to come up with a solution to detect such loops, and get out of them in time...

The solution presented itself from a different thing I wanted to fix: not to lose all progress if the function stops unexpectedly (by a network error etc.). For that I started saving every `getSubcategories` result which came back from the server to an object I called `cachedCats` (which **caches** the results from the network, so if it gets interrupted & we need to start again - we shouldn't need to start from scratch).

Once I had that, I could use that object to know if we already visited that branch in the tree. Albeit not the first time, because we might be after an unexpected error, so the 1st time we encounter something in the cache we record that visit (by adding `visited: true`), then if we encounter the cache with `visited == true` we know that we've caught an infinite loop! So we log a scary message and return early:

```js
if (cachedCat.visited) {
  // STOP! we have an infinite loop!
  console.log('TERMINATING INFINITE LOOP', cat.title);
  return cachedCat.subcats;
}
```

### 2. Asynchronous Operations:

As we're fetching data from a remote server - which take time - there's more complexity.

The `nodemw` library was written quite a few years ago, so all methods were written in the old callback style, where each method takes a callback function as a parameter, which gets called after the data comes back from the server. The callback function in turn gets 2 parameters: `error, data`, so we first need to check for the error, only if not present we can assume that we got the data.

```js
// BEFORE:
// callback based function
getChildren((err, cats) => {
   // first handle the err (if it exists)
   if (err) {
     console.error(err);
     return;
   }
    // Now we can use the categories...
    cat.subcats = cats
});
```

This was nearly impossible to use in a recursive function, because every callback will get called separately at a different time... (probably possible, but makes it much more complicated).

At first I thought I'll fork the `nodemw` repo, and update it to use Promise based async functions. I actually [forked the repo](https://github.com/Yiddishe-Kop/nodemw), but the work to rewrite the whole library in Promises is easier said than done...

Luckily, I discovered that Node's `utils` module has a method to do exactly that! 😃 Just pass an old style callback function to `utils.promisify`, and you get back a modern Promise based function!

So I wrote a thin [wrapper class](https://github.com/Yiddishe-Kop/jewishbooks-wiki/blob/master/src/renderer/helpers/wiki.js) around the `nodemw` library that converts the few methods I needed to Promise based functions:

```js
class wikiAPI {

	/**
   * Login the user to the wiki
   * @param {string} username
   * @param {string} password
   */
  logIn = util.promisify(this.Bot.logIn).bind(this.Bot)

  /**
   * Edit a page on the wiki
   * @param {string} title - Page title.
   * @param {string} content - Page content
   * @param {string} summary - Summary message
   * @param {boolean} minor - If it's a minor edit
   */
  edit = util.promisify(this.Bot.edit).bind(this.Bot)

	//...

}
```

(I added `jsdoc` documentation, why not?)

Now I could use `async` `await` , which made things mush easier & cleaner. 😀

```js
// AFTER:
// Aaaaahhhhh.... much better!
cat.subcats = await getChildren(subcats);
```

## Summary

It was really challenging to get everything working perfectly, but it's so worth it to tackle these types of challenges head on — you learn so much & get a deeper understanding of Javascript concepts.

In the end, it's amazing to watch your function do its job, recursively building a massive tree, doing a task thousands of times, deciding by itself when to go deeper, and when to come back up a level...

That's the power of code!
