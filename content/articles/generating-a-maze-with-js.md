---
title: Generating a Maze with JS
description: Using computed properties on Eloquent models like Vue computed properties
createdAt: 2021-01-09 22:00:00
image: _qXjdWm8YEo
---

I came across this `MazeGenerator` class on [GitHub](https://github.com/rendertom/Maze-Generator), which I thought looked quite interesting. The only problem with it - was that it renders the maze in text form in the console. Something like this:

```js
> new MazeGenerator(10, 10).generate(' ', '##');

// output:
// ##########################################
// ##      ##                      ##      ##
// ##  ##  ##############  ##  ##  ######  ##
// ##  ##              ##  ##  ##      ##  ##
// ##  ##############  ######  ######  ##  ##
// ##      ##      ##          ##  ##      ##
// ##  ##  ##  ##  ##  ##########  ######  ##
// ##  ##  ##  ##  ##  ##      ##      ##  ##
// ##  ##  ##  ######  ##  ##  ##  ##  ##  ##
// ##  ##  ##          ##  ##  ##  ##      ##
// ######  ##############  ##  ##############
// ##      ##      ##      ##      ##      ##
// ##  ##  ##  ######  ##########  ##  ##  ##
// ##  ##  ##          ##      ##      ##  ##
// ##  ##################  ##  ##########  ##
// ##      ##              ##  ##          ##
// ##  ##  ##  ##############  ##  ##########
// ##  ##      ##          ##      ##      ##
// ##  ##################  ##########  ##  ##
// ##                                  ##  ##
// ##########################################
```

So let's take it to the next level 🚀.

Inspecting the source, I saw there is a `get()` method, that unlike `generate()` which outputs a string of characters, returns a 2D array of booleans [An array of arrays, the first array is the rows, and in each row is an array of columns, where each item is `true` if is a pathway, and `false` if it is a wall]. That is very handy, because we can take that and transform it into anything we want! 💡

So let's create a simple Vue component, and draw the maze by looping over the maze-array:

```html
<div v-for="(row, i) in maze" :key="i" class="flex">
  <div
    v-for="(col, j) in row"
    :key="j"
    :class="col ? 'bg-gray-200 hover:bg-brand dark:bg-gray-800' : 'bg-gray-900 dark:bg-gray-300'"
    class="w-3 h-3 transition-colors"
  ></div>
</div>
```

That's it, we've drawn the maze.

<maze :show-controls="false"></maze>

### Adding Controls

Let's make it a bit more dynamic, by adding controls to customize the maze generation.

1. **Number of rows & columns**: we add props for `rows` & `cols`, then pass them into the maze constructor.
2. **Cell size**: we can control this with a `cell-size` prop, that we pass to the cell style.
3. **Refresh**: click this button to regenerate the maze.

<maze :cols="20" :rows="20" :cell-size="8"></maze>

For a finishing touch, we can change the cursor to a *not-allowed* icon when going on a wall, with the following css:

```css
.wall {
  cursor: not-allowed;
}
```

Enjoy generating mazes!
