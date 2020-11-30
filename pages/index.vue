<template>
  <div>
    <cover-image />

    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Hey, I'm Yehuda</h1>
      <h4 class="mt-4 text-xl">
        I'm a designer and software developer, currently living in Jerusalem.
      </h4>
      <div class="flex justify-center mt-6 space-x-4">
        <nuxt-link to="/about" class="btn btn-lg">More about me</nuxt-link>
        <nuxt-link to="/articles" class="btn btn-lg btn-brand"
          >Writing</nuxt-link
        >
      </div>
    </div>

    <section class="relative my-12">
      <ul class="relative space-y-3">
        <li
          v-for="article in articles"
          :key="article.path"
          class="relative p-4 transition-shadow bg-white rounded-lg shadow hover:shadow-xl bg-opacity-60 group"
        >
          <h2
            class="text-xl font-bold text-blue-900 transition-colors group-hover:text-brand"
          >
            {{ article.title }}
          </h2>
          <p class="mt-2 text-gray-800">{{ article.description }}</p>
          <p class="mt-3">
            <badge>{{ article.createdAt | date }}</badge>
          </p>
          <nuxt-link :to="article.path" class="absolute inset-0 rounded-lg" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { date } from "~/plugins/filters";

export default {
  name: "Home",
  head: {
    title: "Home | Yiddishe Kop",
  },
  async asyncData({ $content }) {
    const articles = await $content("articles")
      .sortBy("createdAt", "desc")
      .fetch();
    return {
      articles,
    };
  },
  filters: { date },
};
</script>
