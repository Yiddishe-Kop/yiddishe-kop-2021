<template>
  <div class="px-2 md:px-4">
    <nuxt-link
      to="/articles"
      class="inline-flex items-center p-1 space-x-1 text-gray-500 transition-colors hover:text-amber-500"
    >
      <icon name="arrow-circle-left" class="w-6" />
      <span class="">Articles</span>
    </nuxt-link>

    <h1 class="mt-12 text-4xl font-extrabold text-brand">{{ article.title }}</h1>
    <p class="mt-4 text-sm text-gray-500">{{ article.createdAt | date }}</p>

    <nuxt-content
      :document="article"
      class="mt-12 prose-sm sm:prose lg:prose-lg prose-amber"
    />
  </div>
</template>

<script>
import { date } from "~/plugins/filters";

export default {
  name: "ShowArticle",
  async asyncData({ $content, params }) {
    const article = await $content(`articles/${params.slug}`).fetch();
    return {
      article,
    };
  },
  filters: {
    date,
  },
};
</script>

<style>
</style>
