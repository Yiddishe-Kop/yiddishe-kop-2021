<template>
  <div class="px-2 md:px-4">
    <nuxt-link
      to="/articles"
      class="inline-flex items-center p-1 space-x-1 text-gray-500 transition-colors hover:text-amber-500"
    >
      <icon name="arrow-circle-left" class="w-6" />
      <span class="">Articles</span>
    </nuxt-link>

    <p class="mt-12 text-sm text-center text-gray-500">{{ article.createdAt | date }}</p>
    <h1 class="max-w-xl mx-auto mt-2 text-3xl font-extrabold text-center sm:text-4xl lg:text-5xl text-brand">{{ article.title }}</h1>

    <nuxt-content
      :document="article"
      class="my-16 prose prose-amber"
    />
  </div>
</template>

<script>
import { date } from "~/plugins/filters";

export default {
  name: "ShowArticle",
  head() {
    return {
      title: this.article.title
    }
  },
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
