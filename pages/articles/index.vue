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

    <ul class="my-24">
      <transition-group name="slideIn" appear class="relative grid grid-cols-1 gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="article in articles"
          :key="article.path"
          class="relative flex flex-col overflow-hidden transition-shadow bg-white rounded-lg shadow dark:bg-gray-900 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
        >
          <img
            :src="`https://source.unsplash.com/${article.image}`"
            class="object-cover w-full h-40"
          />
          <div class="flex-1 p-4">
            <h2
              class="text-xl font-bold text-blue-900 transition-colors dark:text-gray-200 group-hover:text-brand"
            >
              {{ article.title }}
            </h2>
            <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">
              {{ article.description }}
            </p>
          </div>
          <p class="flex items-center justify-between p-3 mt-3 text-xs bg-gray-100 border-t dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900">
            <span>
              <octicon name="book" class="w-4 mr-2" />{{ article.readingTime }}
            </span>
            <span>{{ article.createdAt | timeAgo }}<octicon name="calendar" class="w-4 ml-2" /></span>
          </p>
          <nuxt-link :to="article.path" class="absolute inset-0 rounded-lg" />
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { timeAgo } from "~/plugins/filters";

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
    timeAgo,
  },
};
</script>

<style>
</style>
