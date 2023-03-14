---
title: Teach Yourself Programming
description: If you enjoy problem-solving, challenges and learning new things - you should give coding a try!
createdAt: 2021-02-13 23:15:00
image: /img/baby-coding.jpg
---

**Tim Cook** (CEO of Apple) famously said:

<quote>
Coding the most important second language you can learn.
</quote>

Some of the best programmers didn't pay $100,000 for a computer-science degree, rather they tought it themselves. The thing is that one of the traits you need to be a good programmer is continuous self learning. So why not teach yourself from the beginning?

### Your First Line of Code

Follow these steps for the fastest way to write your first line of code. It will be a simple one, but you'll still write and execute a real line of code!

1. Right-click on this webpage.
2. Select **Inspect** (or **Inspect Element**).
3. The **DevTools** opens up.
4. Find and open the **Console**.

:article-image{src="/img/console.png"}

1. Type `1 + 1`, then hit `Enter`.

:article-image{src="/img/console2.png"}

Congratulations! You've just written your first line of code. 🎉

The **console** is a Javascript [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) - an interactive language shell where you can input commands, evaluate them and receive the output.

The expression `1 + 1` outputs `2`, as Javascript (like every programming language) supports arithmetic operations.

But wait, is that all you can do with code?! Add `1 + 1`?...

Of course not...

Let's do something more powerful. Copy the following code into your console, and hit `enter`:

```js
for (let i = 0; i < 101; i++) {
  console.log(i)
}
```

Here we're creating a **loop**, from `1` till `101`, and running a command `console.log(i)` **100** times. This will output all numbers from `1` till `100`, as `i` will hold the number of the current iteration of the loop. If you tried changing the `101` to a higher number - you are the adventurous type 🤓 ...

### Getting the price of Bitcoin

Where is the price of Bitcoin up to? We can do that with a single line of code:

```js
await (await fetch('https://blockchain.info/ticker')).json()
```

This will output the current price of Bitcoin in multiple currencies.

Turns out, there isn't much you **cannot** do with code. The worlds largest companies are run by software.

### Learning Path

Everyone has a different way of learning, but I'll write what worked for me:

#### Javascript

Start by learning a programming language. Javascript is a good first candidate, as it's widely used and has lots of learning resources.

I found this resource very helpful: https://javascript.info. It is a modern Javascript tutorial that starts from the basics, and has simple detailed explanations.

The best thing you can do while learning - is doing. Try to build something with what you allready know, get stuck, figure it out, get stuck again... That's the best way to learn.

#### HTML & CSS

Once you have a basic grasp over JS, you want to be able to build something you can _see_. With HTML & CSS you'll be able to build visual interfaces. [w3schools](https://www.w3schools.com) is an excellent place to learn them.

#### JS Frameworks

Then there are frameworks which make building large applications much easier. There are a few popular ones today:

- [React](https://reactjs.org/)
- [Angular](https://angular.io/)
- [Vue](https://vuejs.org/)
- [Svelte](https://svelte.dev/)

I like **Vue**. But just pick one (just not Angular 😉 ), and stick with that, and eventually you'll become really good in that one.

You can stop here, and be a great frontend developer. But you might want to continue on...

#### Backend

Today you can do more and more just on the frontend (the JAMstack), but most large applications need a backend. That's where you have the database and secure parts of the application.

You can use literally any programming language for backend development, but there are a few popular ones:

- PHP
- Python
- Javascript
- Ruby
- C#

Each one has their own framework(s) (which is an openly maintained library that makes building applications easier, faster & more secure). I use PHP and a fantastic framework called [Laravel](https://laravel.com/). Their [docs](https://laravel.com/docs/master) are a fantastic place to start learning it.

Knowing how to design a database schema, and how to query the database with `SQL` helps a lot. [w3schools](https://www.w3schools.com/sql/) has this covered as well.

### Getting Stuck

Whenever you get stuck, [StackOverflow](https://stackoverflow.com/) will be there to help you out. Just Google your problem/error and you should find that someone already asked the question on StackOverflow, and there are a few answers/solutions available.

### Summary

Learning to code is not easy. It takes lots of effort. The hardest stage will be going from not knowing any programming to grasping what programming is and how it works. It takes some time untill things will start to click in your head, but once it does, things will be much easier. The main thing: don't give up. It's worth it!

Is short: start by learning a programming language properly. So this could be a good path:

1. **Javascript** (The language, OOP, Browser APIs).
2. **HTML**.
3. **CSS** (Layout, styling, animations).
4. **Vue**.

By now you should be able to get a job as a front-end developer.

To become a fullstack developer add these:

5. **PHP**
6. **Laravel**
7. **SQL**

If you enjoy challenges, solving problems and learning new things, you'll enjoy programming so much, that it will feel like a big adventure.

Programming is a unique combination of problem-solving, logic, & creativity. It is very rewarding and satisfying when your creations work. And if you enjoy what you do for a living, you won't work a day in your life.

### Appendix

The cover image was generated with [Midjourney](https://www.midjourney.com/home/) AI.

<article-image src="/img/baby-coding.jpg" caption="a cute happy smart baby dressed as a software developer coding and hacking on a Mac, editorial, hyperrealistic, golden hour sunlight --ar 4:3"></article-image>

Another one I've generated for this post that I like:

<article-image src="/img/goat-programmer.jpg" caption="a goat dressed as a software developer coding on a Mac, editorial, hyperrealistic, golden hour rimlight --ar 4:3"></article-image>
