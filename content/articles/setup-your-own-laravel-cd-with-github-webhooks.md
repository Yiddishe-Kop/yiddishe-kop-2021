---
title: Setup your own Laravel CD with GitHub webhooks
description: How to setup continuous Laravel deployment with GitHub webhooks.
createdAt: 2020-05-04 05:48:00
image: 842ofHC6MaI
---

I recently discovered the [Laravel framework](https://laravel.com) - and I really like it. As I was learning the framework, I wanted to build something with it, as the best way to learn something is by building something with it. So I built a [Torah learning platform](https://torah.yiddishe-kop.com/), which you can visit now...

Once the application was ready to be deployed, I deployed it to an AWS server. But the process was not as simple as I would like it (I was coming from the frontend - where we have experiences like Netlify where you just push to deploy). After a commit, I would need to SSH into the server, and manually run a `git pull` and `php artisan migrate`...

So I researched around for a solution, and I found that I could use GitHub webhooks for that. I struggled quite a while until I got it to work, so I'm documenting it here for future reference.

### Basic Overview

Here is a basic overview how it will work:

1.  When you push a change to GitHub, GitHub will send a POST request to a **deploy** endpoint on your server.
2.  The server will verify that the request is really from GitHub...
3.  The server will then run a script that will perform the git pull and all that's needed to update the application.

### Setting up the Deploy mechanism on your server

This needs a few parts:

1.  The `/deploy` route.
2.  The `DeployController`.
3.  The bash script that will run the tasks.

First let's define the route (in web.php):

```php
Route::post('deploy', 'DeployController@deploy');
```

Next, let's first create the **DeployController** (location: app/Http/Controllers):

```php
<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Symfony\\Component\\Process\\Process;

class DeployController extends Controller {

    public function deploy(Request $request) {
        $githubPayload = $request->getContent();
        $githubHash = $request->header('X-Hub-Signature');
        $localToken = config('app.deploy_secret');
        $localHash = 'sha1=' . hash_hmac('sha1', $githubPayload, $localToken, false);

        if (hash_equals($githubHash, $localHash)) {
            $root_path = base_path();
            $process = new Process(['./deploy.sh'], $root_path);
            $process->run(function ($type, $buffer) {
                echo $buffer;
                return response()->json([
                    'buffer' => $buffer,
                    'type' => $type,
                ]);
            });
        } else {
            return response()->json(['result' => 'failed']);
        }
    }
}
```

We also need a `deploy_secret` in the app config (config/app.php):

```php
'deploy_secret' => env('APP_DEPLOY_SECRET'),
```

Now add the actual secret to the `.env` file (should be a long random string):

```bash
APP_DEPLOY_SECRET=hfiluefhofwkiuehf74yor374o87r3h4o8hr3o4rh8hfpqilwjdwliuefhlw8f9384i3uh4fi
```

The last thing is to exclude the deploy route from CSRF verification, by adding the route to the `$except` array in `app/Http/Middleware/VerifyCsrfToken.php`:

```php
protected $except = [
      '/deploy',
];
```

Now let's create the bash script that will actually run the tasks. Create a `deploy.sh` file in the root of your project, like so:

```bash
#!/bin/bash
# activate maintenance mode
php artisan down

# update source code
git reset --hard HEAD
git pull

# I couldn't get the next line to work - permissions issues...
# npm run build

# update PHP dependencies
# composer install --no-interaction --no-dev --prefer-dist

php artisan migrate --force
# --force  Required to run when in production.
# stop maintenance mode
php artisan up
```

Finally, we're done with our server. Now we just need to setup the webhook trigger on GitHub!

### Setting up the Webhook on GitHub

Go to your repo's settings page, into the webhooks section. Add a new webhook:

![GitHub repo webhooks section](https://blog.yiddishe-kop.com/storage/canvas/images/BPlm4jQQO9fHfBsmoUGxImbwZrD5raRwZ3jyhqeh.png)

GitHub repo webhooks section

For Payload URL insert your deploy route, which I set to `/deploy` . For the secret (which will be used to verify the authenticity of the request) use the same hash you added to your `.env` file above. Lastly, set only `push` events to trigger this webhook.

![webhook settings](https://blog.yiddishe-kop.com/storage/canvas/images/DWkQKfqstS8SmSqYxjjeO7HNh7Fg7HekcwwKREyQ.png)

webhook settings

Save the webhook, and now we can just run git push locally, and within a few seconds your live application should be updated! 😎

If you run into issues, you can check the webhooks recent deliveries on GitHub, and inspect the request & response to see what went wrong.

### Summary

This makes a very good developer experience - write some code, then just push to deploy. But there's still room for improvement. I don't know if you noticed, in the deploy.sh there's a line that's commented out:

```bash
# I couldn't get the next line to work - permissions issues...
# npm run build
```

Ideally I would also like to run npm run build on the server (saving me from building locally before every push), but I couldn't get it to work. I was getting permission errors, and couldn't figure out how to solve them. I `chmod`'ed and `chown`'ed for hours, to no avail... I think it's got to do with the node installation on my server, but I don't know for sure... If you know of a solution, please let me know!

**Edit** (5 Jul 2020): I just published [another article](/articles/setting-up-a-fresh-server-for-continuous-deployment-with-git) with a revised way of doing this, which fixes all issues!
