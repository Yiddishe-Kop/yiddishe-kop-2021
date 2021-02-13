<template>
  <li
    class="relative flex flex-col overflow-hidden transition-shadow bg-white rounded-lg shadow dark:bg-gray-900 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
  >
    <nuxt-picture placeholder :src="getImgSrc(article.image)" class="w-full h-52" />
    <div class="flex-1 p-4">
      <h2 class="text-xl font-bold text-blue-900 transition-colors dark:text-gray-200 group-hover:text-brand">
        {{ article.title }}
      </h2>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {{ article.description }}
      </p>
    </div>
    <p
      class="flex items-center justify-between p-3 mt-3 text-xs bg-gray-100 border-t dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
    >
      <span> <octicon name="book" class="w-4 mr-2 text-gray-400 dark:text-gray-500" />{{ article.readingTime }} </span>
      <span
        >{{ article.createdAt | timeAgo }}<octicon name="calendar" class="w-4 ml-2 text-gray-400 dark:text-gray-500"
      /></span>
    </p>
    <nuxt-link :to="article.path" class="absolute inset-0 rounded-lg" />
  </li>
</template>

<script>
import imgMixin from '~/mixins/img'
import { timeAgo } from '~/plugins/filters'

export default {
  name: 'BlogCard',
  props: {
    article: Object,
  },
  mixins: [imgMixin],
  filters: {
    timeAgo,
  },
}
</script>

<style>
</style>
