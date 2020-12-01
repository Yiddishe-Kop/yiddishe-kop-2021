<template>
  <div>
    <cover-image />

    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Overthought</h1>
      <h4 class="mt-4 text-xl">
        Thinking out loud about design, development, and building excellent
        software
      </h4>
    </div>

    <ul class="relative space-y-3">
      <li
        v-for="article in articles"
        :key="article.path"
        class="relative p-4 transition-shadow bg-white rounded-lg shadow dark:bg-gray-800 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
      >
        <h2
          class="text-xl font-bold text-blue-900 transition-colors dark:text-blue-100 group-hover:text-brand"
        >
          {{ article.title }}
        </h2>
        <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">
          {{ article.description }}
        </p>
        <p class="mt-3">
          <badge color="gray">{{ article.createdAt | date }}</badge>
        </p>
        <nuxt-link :to="article.path" class="absolute inset-0 rounded-lg" />
      </li>
    </ul>
  </div>
</template>

<script>
import { date } from "~/plugins/filters";

export default {
  name: "ArticlesIndex",
  head: {
    title: "Writings",
  },
  async asyncData({ $content }) {
    const articles = await $content("articles")
      .sortBy("createdAt", "desc")
      .fetch();
    return {
      articles,
    };
  },
  filters: {
    date,
  },
};
</script>

<style>
</style>
