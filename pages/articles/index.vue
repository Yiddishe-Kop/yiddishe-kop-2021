<template>
  <div>
    <cover-image />

    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Overthought</h1>
      <h4 class="mt-4 text-xl">Thinking out loud about design, development, and building excellent software</h4>
    </div>

    <ul class="my-24">
      <transition-group
        name="slideIn"
        appear
        class="relative grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        <blog-card
          v-for="article in articles"
          :key="article.path"
          :article="article"
          class="relative flex flex-col overflow-hidden transition-shadow bg-white rounded-lg shadow dark:bg-gray-900 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
        />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import BlogCard from '~/components/BlogCard.vue'

export default {
  components: { BlogCard },
  name: 'ArticlesIndex',
  head: {
    title: 'Writings',
  },
  async asyncData({ $content }) {
    const articles = await $content('articles').sortBy('createdAt', 'desc').fetch()
    return {
      articles,
    }
  },
}
</script>

<style>
</style>
