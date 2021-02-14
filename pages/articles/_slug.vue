<template>
  <div>
    <cover-image :image="article.image" />

    <div class="relative px-2 md:px-4">
      <nuxt-link
        to="/articles"
        class="inline-flex items-center px-3 py-2 space-x-1 text-gray-500 transition-colors bg-gray-100 dark:bg-gray-900 dark:bg-opacity-50 hover:bg-opacity-80 bg-opacity-40 hover:text-amber-500"
      >
        <icon name="arrow-circle-left" class="w-6" />
        <span class="">Articles</span>
      </nuxt-link>

      <p class="mt-12 text-sm text-center text-gray-500 dark:text-gray-400">
        {{ article.createdAt | date }}
      </p>
      <h1
        class="max-w-xl mx-auto mt-2 text-3xl font-extrabold text-center text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
      >
        {{ article.title }}
      </h1>
      <p class="mt-4 text-sm font-bold text-center text-gray-500 dark:text-gray-400">
        <octicon name="book" />
        <span class="ml-1">{{ article.readingTime }}</span>
      </p>

      <div class="px-12 py-8 my-16 bg-gray-100 rounded-xl dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 blur-bg">
        <nuxt-content :document="article" class="prose dark:prose-dark" />
      </div>

      <nav class="flex items-stretch justify-between space-x-3 text-sm font-semibold text-gray-500">
        <nuxt-link
          v-if="prev"
          :to="prev.path"
          class="flex items-center justify-start flex-1 p-2 space-x-2 rounded bg-gray-50 dark:bg-gray-900 hover:bg-amber-100 hover:text-amber-800 dark:hover:text-amber-400"
        >
          <icon name="arrow-circle-left" class="w-6" />
          <span>{{ prev.title }}</span>
        </nuxt-link>
        <nuxt-link
          v-if="next"
          :to="next.path"
          class="flex items-center justify-end flex-1 p-2 space-x-2 text-right rounded bg-gray-50 dark:bg-gray-900 hover:bg-amber-100 hover:text-amber-800 dark:hover:text-amber-400"
        >
          <span>{{ next.title }}</span>
          <icon name="arrow-circle-left" class="w-6 transform rotate-180" />
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { date } from '~/plugins/filters'
// Try fix for css insertion at build
import NuxtPicture from '@nuxt/image/dist/runtime/components/nuxt-picture'
import NuxtImg from '@nuxt/image/dist/runtime/components/nuxt-img.vue'

export default {
  name: 'ShowArticle',
  props: { NuxtPicture, NuxtImg },
  head() {
    return {
      title: this.article.title,
    }
  },
  async asyncData({ $content, params }) {
    const article = await $content(`articles/${params.slug}`).fetch()

    const [next, prev] = await $content('articles')
      .only(['title', 'path'])
      .sortBy('createdAt', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
  filters: {
    date,
  },
  mounted() {
    document.querySelectorAll('ol[start]').forEach(list => {
      const start = list.getAttribute('start')
      list.style.counterIncrement = `list-counter ${start}`
    })
  },
}
</script>

<style>
</style>
