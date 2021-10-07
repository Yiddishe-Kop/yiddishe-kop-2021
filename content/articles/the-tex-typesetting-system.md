---
title: The TeX typesetting system
description: Discovering this amazing tool for complex typesetting
createdAt: 2021-07-22
image: /img/gemara.jpg
---

Today I made an important [discovery](https://tex.stackexchange.com/questions/141924/how-to-typeset-a-complex-layout-like-a-page-of-the-talmud). I learnt about [TeX](https://en.wikipedia.org/wiki/TeX) - a typesetting system which was designed and written by [Donal Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) and first released in 1978. It is so old, yet so powerful. It has been noted as one of the most sophisticated digital typographical systems.

<article-image src="/img/layout.png" caption="Complex book layout"></article-image>
<article-image src="/img/gemara2.jpg" caption="The Vilna Talmud layout"></article-image>

As a child I was already intrigued by the complex layout of the Hebrew Talmud (Vilna edition). How did they manage to do such sophisticated typesetting without any computers? Would it be easier with todays software?

Microsoft Word didn't get me anywhere near the desired layout. Years later I would discover Adobe InDesign, and with this software I did manage to recreate the complex layout, but it was a very tedious task, requiring manual work on every single page. I later got in to scripting, and wrote some [InDesign scripts](https://indesign.yiddishe-kop.com/scripts/4) to vastly speed up the process (This was how I got into programming in the first place 😀).

Now, I finally discovered TeX. And as a programmer, this seems like the best way to typeset books, as it is code based. Here is the most basic *Hello world* TeX document:

```txt
\documentclass{article}

\begin{document}

Hello World!

\end{document}
```

This will output a page with "Hello world" in the top left. Commands start with a backslash. `\documentclass{...}` defines the formatting for the document. In this case we want the formatting called "article". `\begin{document}` tells LaTeX that from here starts the content [kinda like `<body>` in HTML], and that everything up until here was the 'preamble' [like `<head>` in HTML]. Then comes a line of actual content to write on the page. Then the self explanatory `\end{document}`.

### Output to PDF
To generate a PDF, run the following command:

```bash
latex hello.tex
```

This will generate a `hello.dvi` file [DVI = Device Independant]. Now a PDF can be generated with this command:

```bash
dvipdf hello.dvi hello.pdf
```

### Hebrew Typesetting
Everything seemed amazing, until I tried to typeset Hebrew. Looks like Tex doesn't support RTL & Hebrew out of the box. Googling for solutions didn't bring up any usable results, at least for me. So if you have any knowledge how to get Tex to behave nicely with Hebrew typesetting, please reach out!
