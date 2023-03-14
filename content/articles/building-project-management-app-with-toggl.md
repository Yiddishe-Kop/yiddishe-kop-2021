---
title: Building a project management app
description: Managing my projects with the Toggl API
createdAt: 2021-05-27
image: /img/time-management.jpg
---

My day to day work involves writing software for multiple client projects. And as I get paid by the hour, I need a way to track the time I work on each project. Thankfully, there's an excellent time-tracking application called [Toggl](https://toggl.com/track/), which has a nice little desktop app that tracks time spent on each project, and generates nice reports on their web dashboard.

I started relying heavily on this time tracker to keep track of all hours worked on each project. Then I can get a report for each project how many hours I've worked on it, and calculate the amount the client owes.

But there's one thing missing. Most projects are ongoing, and pay every let's say 30 hours. Now I want to be able to save how many hours have already been paid. So in addition of knowing the total amount of hours worked on a project, I would like to know how many hours have already been paid.

Another thing is setting the hourly rate per project (this is available only in the paid tier of Toggl, not in the free tier). So let's say on a new project we agreed on $80/hr, I would like to be able to set the rate per project. Once I have these 2 features, I'll be able to calculate the total price for each project `hours * rate`, and the outstanding balance `(hours * rate) - (hours_paid * rate)`.

### DIY 👷‍♀️

Toggl prides themselves in being [open source](https://github.com/toggl-open-source), so maybe they have an API? Luckily [they do](https://github.com/toggl/toggl_api_docs). And it's available even for the free tier users!

That means I can retreive all projects and time data from Toggl, and store the extras like hourly rates and payments in my own application.

Once that's built, it would be simple to add a portal for clients to see their project hours total, total owed & previous payments.

Oh, and then if a client exceeds an amount of hours unpaid, we can automatically send them an email, and set their project's status as "on-hold". 😎

This is going to save me so much time and headache!

### Getting Started

We're going to use **Laravel** for the backend, of course. **Vue 3** & **Tailwindcss** for the frontend and **Inertia.js** for routing.

I got a quick start with [Laravel Breeze](https://laravel.com/docs/8.x/starter-kits#laravel-breeze), and after afew minutes had this up and running 🚀:

<article-image src="/img/yk-portal-start.png"></article-image>

### Business Logic

We'll create these models to handle our business:

- **User** - the regular User model that comes with Laravel out of the box.
- **Project**
- **Payment**

#### The Project Model

A `Project` will have the folowing fields:

- `user_id`
- `toggl_project_id`
- `hourly_rate`
- `currency`
- `created_at`
- `updated_at`

#### The Payment Model

A `Payment` will have the folowing fields:

- `project_id`
- `amount`
- `currency`
- `method`
- `created_at`
- `updated_at`

This is the database schema, drawn in [DrawSQL](https://drawsql.app/):

<article-image src="/img/yk-portal-table-schema.png"></article-image>

Next, we need to setup the model relationships, and implement the traits.

More on that, next time.
