---
title: Powerful Terminal Commands to have in your Toolbox
description: Some powerful Terminal commands worth having in your toolbox
createdAt: 2020-07-13
image: LqKhnDzSF-8
---

When deploying applications to servers, most of the time you'll be working in the Terminal, or command-line. Yes, the scary (or cool) black screen, which looks like the computers of 50 years ago.

Although the Terminal looks very outdated, it is actually much more powerful than the GUI (Graphical User Interface), as you have much more commands and powers.

Here are some recent commands I used in my work.

### Copying Files Between Servers

If you want to copy a file from your server to your computer, you can't just drag it from your Terminal onto your desktop, as that only works in the GUI. Get ready to meet the much more powerful `scp` command. `scp` stands for **Secure Copy**.

Here are some examples:

### copy a file from a server to your local machine

```bat
scp user@your.server.example.com:/path/to/foo.txt ~/Desktop/foo.txt
```

### copy an entire folder (recursively) to your local machines' Desktop folder

```bat
scp -r user@your.server.example.com:/path/to/foo ~/Desktop/
```

### copy a file from server-1 to server-2 (AMAZING!)

```bat
scp -3 user@server1:/path/to/file.txt user@server2:/path/to/file﻿.txt
```

Of course, you need to have access to the servers (e.g. SSH keys) for the command to work.

Now try copying files from an AWS server to a Digital Ocean droplet with a GUI 🤓 ...

### Copying MySQL Databases between Servers

Today I moved an application from a cheap Azure server to a bigger & better Digital Ocean droplet (just a fancy name for a server). The problem was that the client already added some content in the application, that was saved to the MySQL database on the Azure server. So I needed to copy the database to the new server.

Luckily it's very easy to do:

1. Create a dump of the database on the old server:

```bat
mysqldump database-name table-name > dump.sql
```

You can omit `table-name` to dump the whole database.

2. Copy the `dump.sql` file to the new server (using `scp` mentioned above 😎).

3. Import the database on the new server:

```bat
mysql database-name < dump.sql
```

Done!

By the way, the `dump.sql` that `mysqldump` generates is very human readable & nicely formatted!

This is it for now, I might add more to this post in the future!
