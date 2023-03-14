---
title: Learning Ruby on Rails - Part 1
description: A Laravel developer learning Rails
createdAt: 2021-01-17 00:44:00
image: /img/ruby-on-rails.jpg
---

I discovered Laravel around a year ago, and it has opened up the possibilities for me to create powerful applications. By now I have built quite a few applications with it and feel quite comfortable writing apps with PHP & Laravel. The thing is, I miss the excitement and motivation that I feel when learning new things... so I've decided to start learning Ruby on Rails. This means learning a new programming language - **Ruby**, and the framework **Ruby on Rails** 👨‍🎓.

For some time now I've been wanting to get into Ruby on Rails, some great apps are built with Rails - take GitHub - which [Microsoft purchased for $7B](https://news.microsoft.com/announcement/microsoft-acquires-github/), and which I use every day, is built with Rails. Rails seems to have lots of similarities to Laravel - it's an MVC framework, but seems to have a shorter and more terse syntax. That's because it's written in **Ruby**, which is a very conversational and nearly punctuationless language.

<quote>

Using Ruby, we are constantly amazed at how much code we can write in one sitting, code that works the first time. There are very few syntax errors, no type violations, and far fewer bugs than usual. This makes sense: there's less to get wrong. No bothersome semicolons to type mechanically at the end of each line. No troublesome type declarations to keep in sync (especially in separate files). No unnecessary words just to keep the compiler happy. No error-prone framework code. ([source](http://docs.ruby-doc.com/docs/ProgrammingRuby/))

</quote>

I'll be building a simple lost'n'found app called **Matzati** ("I found" in Hebrew) to learn on.

## Let's go 🚀!

I updated my local Ruby installation (MacOS comes with Ruby preinstalled) to the latest version. Then I followed the [official instructions](https://github.com/rails/rails) to install Rails:

```bash
gem install rails
rails new matzati
cd matzati
bin/rails server
```

I opened `http://localhost:3000` and got the welcoming "Yay! You’re on Rails!" screen 🎉.

## Routes

Routes are defined in `config/routes.rb`. To add the first route I add:

```rb
Rails.application.routes.draw do

  get "/aveidos", to: "aveidos#index"

end
```

A `GET` request to `/aveidos` will be routed to the `aviedos_controller`'s `index`method.
I like how short & concise it is to add a route. It's very similar to Laravel, just shorter (no need to call `Routes::get(...)`).

## Controllers

Controllers live in `app/controllers`. I generate `aveidos_controller.rb`:

```rb
class AveidosController < ApplicationController
  def index
  end
end
```

The `index` action is empty. In that case Rails will automatically render a view that matches the controller action name. Convention Over Configuration! So this will render `app/views/aveidos/index.html.erb`.

## Models

Rails has a command line tool (just like Artisan in Laravel) that we can use to generate files. To generate a model:

```bash
bin/rails generate model Aveida title:string body:text
```

Unlike Laravel, you can pass the column names & data types to the command!

This generates a migration `db/migrate/20210116205557_create_aveidas.rb` and a model `app/models/aveida.rb` (and tests).

Now I run `bin/rails db:migrate RAILS_ENV=development`, and it just works. I didn't need to setup any database, or edit a config file. This is because by default Rails comes with a `db/development.sqlite3` file that is used as the database in development. Neat! I'm already starting to feel the development speed they say about Rails.

This is the generated migration:

```rb
class CreateAveidas < ActiveRecord::Migration[6.1]
  def change
    create_table :aveidas do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
```

It has the 2 fields passed to the command, plus `timestamps` which is the `created_at` & `updated_at` fields which Rails handles automatically for us. The `id` column is not listed, as by default, the `create_table` method adds an id column as an auto-incrementing primary key.

## CRUD

Let's see how fast we can setup the CRUD actions for Aveidos.

### Show an aveida

Add the route:

```rb
get "/aveidos/:id", to: "aveidos#show"
```

The controller action:

```rb
def show
  @aveida = Aveida.find(params[:id])
end
```

And lastly the view:

```html
<h1><%= @aveida.title %></h1>

<p><%= @aveida.body %></p>
```

Controller variables. (like `@aveida`) are available in the view.
`<% ... %>` are like `<?php ... ?>` in PHP. And `<%=` is like `<?=` .
Notice how little code is needed...

We can simplify the routes file even more by using the conventional resource routes:

```rb
# get "/aveidos/:id", to: "aveidos#show"
resources :aveidos
```

This will generate the following routes according to the convention:

```bash
    aveidos GET    /aveidos(.:format)                aveidos#index
            POST   /aveidos(.:format)                aveidos#create
 new_aveido GET    /aveidos/new(.:format)            aveidos#new
edit_aveido GET    /aveidos/:id/edit(.:format)       aveidos#edit
     aveido GET    /aveidos/:id(.:format)            aveidos#show
            PATCH  /aveidos/:id(.:format)            aveidos#update
            PUT    /aveidos/:id(.:format)            aveidos#update
            DELETE /aveidos/:id(.:format)            aveidos#destroy
```

This is very similar to Laravel's `Route::resource()`.

### Index

We can show a list of all aveidos like so:

```html
<h1>Matzati</h1>

<ul>
  <% @aveidos.each do | aveida | %>
  <li>
    <a href="/aveidos/<%= aveida.id %>"> <%= aveida.title %> </a>
  </li>
  <% end %>
</ul>
```

### Create

The `GET /aveidos/new` will instantiate a new `Aveida` but not save it to the database, and passs it to the **new aveida** form.

```rb
def new
    @aveida = Aveida.new
end
```

## Validation

In Rails validation is defined on the model:

```rb
class Aveida < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
end
```

These rules will automatically be used when creating/updating models. We can display the error messages in the create form:

```html
<%= form_with model: aveida do |form| %>
<div>
  <%= form.label :title %><br />
  <%= form.text_field :title %> <% @aveida.errors.full_messages_for(:title).each do |message| %>
  <div><%= message %></div>
  <% end %>
</div>

<div>
  <%= form.label :body %><br />
  <%= form.text_area :body %> <% @aveida.errors.full_messages_for(:body).each do |message| %>
  <div><%= message %></div>
  <% end %>
</div>

<div><%= form.submit %></div>
<% end %>
```

Rails comes with a form builder, which we instantiate here with `form_with`. The validation messages are on the model instance's `errors` property, which has a `full_messages_for` method which outputs human friendly validation messages.

### Store

Then `POST /aveidos` will save it to the database.

```rb
def create
    @aveida = Aveida.new(aveida_params)

    if @aveida.save
      redirect_to @aveida
    else
      render :new
    end
end

private
    def aveida_params
      params.require(:aveida).permit(:title, :body)
    end

```

Note the conditional - if we succeed to save the new Aveida, we redirect to the show view, otherwise (there was a validation error) we just rerender the same `new` view, which will in turn render the validation error messages.

### Update

We create 2 more actions:

```rb
def edit
  @aveida = Aveida.find(params[:id])
end

def update
  @aveida = Aveida.find(params[:id])

  if @aveida.update(aveida_params)
    redirect_to @aveida
  else
    render :edit
  end
end
```

We can reuse the same form we use for the `new` action, by moving the form into a partial. To create a partial we just have to prepend a `_` to the filename, so we create `app/views/aveidas/_form.html.erb`. It can then be used like so:

```html
<h1>Edit Aveida</h1>

<%= render "form", aveida: @aveida %>
```

### Delete

```rb
def destroy
  @aveida = Aveida.find(params[:id])
  @aveida.destroy

  redirect_to root_path
end
```

The delete link can be rendered with the `link_to` helper:

```html
<%= link_to "Delete", aveida_path(@aveida), method: :delete, data: { confirm: "Are you sure?" } %>
```

Clicking "delete" will trigger a confirmation alert, and if confirmed will perform a `DELETE` request. This is powered by a feature of Rails called **Unobtrusive JavaScript** (UJS). The JavaScript file that implements these behaviors is included by default in fresh Rails applications. Interesting.

## Wrap

It's late, and I'm tired. I learnt quite a bit, and I really like the ease and speed of doing things in Rails. I'm looking forward to continue to dive into the language & framework.

The code above is on [GitHub](https://github.com/Yiddishe-Kop/matzati).
