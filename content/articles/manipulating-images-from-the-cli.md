---
title: Manipulating images from the CLI
description: An intro to SIPS cli tool
createdAt: 2020-05-13 09:12:00
image: p8kaVRe4edM
---

I often need to resize images - for many reasons: to downsize massive images from the camera to a regular size, or to convert Mac screenshots from png to jpg.

Until today I would open Photoshop, which takes around 10 seconds (on a fast machine!), export as, choose the right settings, and save it to disk.

TIL (today I learnt) there's a super-fast and easy way to do it: `sips`. SIPS is a command line tool that comes installed with every Mac (on Windows you have [ImageMagick](https://imagemagick.org/index.php)), that stands for - **S**criptable **I**mage **P**rocessing **S**ystem.

If you just enter `sips` in your Terminal, you'll get a list of options and commands available.

### Resize an image

To resize an image, use this command:

```bat
sips -Z 640 path/to/yourImage.jpg
```

The `-Z` argument tells sips to keep the original image aspect ratio. The number `640` tells it to resize the image to 640 pixels (in this case the largest side of the image will become 640px).

### Convert image format

To convert from png to jpg, use this one:

```bat
sips -Z 640 --setProperty format jpeg originalImage.png --out newImage.jpg
```

### Batch Processing Images

Convert a folder of jpgs to pngs:

```bat
for file in *.jpg; do sips -s format png $file --out $file.png; done
```

Just be careful, as this tool does its job unapologetically...

### Summary

This tool is saving me so much time, it's very fast even on big images. Not needing to open a clunky massive Photoshop for simple image resizing & converting is a big timesaver.

Although most _regular_ people who are afraid of the Terminal won't use this, but for us developers this is simple... You can probably even build a UI for this tool, and sell it to _regular_ people, which will wonder at your genius tool that can do so many things with images... 🤣
