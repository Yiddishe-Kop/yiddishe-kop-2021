---
title: Proper file permissions for Laravel
description: How to set up proper file permissions for a Laravel project on a Linux server
image: yekGLpc3vro
createdAt: 2020-12-02
---

## Step by step guide

1. `ssh` into your server.

2. `cd` into your project directory.

```bat
cd /var/www/<project-folder>
```

3. Assuming your web server is `www-data`, assign you Laravel project to that group:

```bat
sudo chown -R <my-username>:www-data .
```

4. Add your user to the `www-data` group (so you should also have permission to read/write):

```bat
sudo usermod -a -G www-data <my-username>
```

Good practice is to set all your directories to `755`, and all files to `644`.

5. Set folder permissions using the following command:

```bat
sudo find . -type d -exec chmod 755 {} \;
```

6. Set file permissions using the following command:

```bat
sudo find . -type f -exec chmod 644 {} \;
```

7. Give the webserver permission to upload & write files to the `storage` & `cache` folders:

```bat
sudo chmod -R ug+rwx storage bootstrap/cache
```

Done 🥳 .

## Queue worker

If you have a queue worker running, like [supervisor](http://supervisord.org/index.html), you should configure the user to be `www-data`, not your user:

```bat{6}[laravel-worker.conf]
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/PROJECT_NAME/artisan queue:work database --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=6
redirect_stderr=true
stdout_logfile=/var/www/PROJECT_NAME/worker.log
stopwaitsecs=3600
```
