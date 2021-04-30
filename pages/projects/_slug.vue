<template>
  <div>
    <cover-image :image="project.image" />

    <div class="relative px-2 md:px-4">
      <nuxt-link
        to="/projects"
        class="inline-flex items-center px-3 py-2 space-x-1 text-gray-500 transition-colors bg-gray-100 dark:bg-gray-900 dark:bg-opacity-50 hover:bg-opacity-80 bg-opacity-40 hover:text-amber-500"
      >
        <icon name="arrow-circle-left" class="w-6" />
        <span class="">Projects</span>
      </nuxt-link>

      <p class="mt-12 text-sm text-center text-gray-500">
        {{ project.createdAt | date }}
      </p>
      <h1 class="max-w-xl mx-auto mt-2 text-3xl font-extrabold text-center sm:text-4xl lg:text-5xl text-brand">
        {{ project.title }}
      </h1>

      <div class="mt-8 text-center">
        <a
          :href="project.link"
          target="_blank"
          class="inline-flex items-center justify-end flex-1 px-3 py-2 space-x-2 text-right text-gray-900 rounded bg-brand hover:bg-amber-500"
        >
          <span>Visit</span>
          <icon name="arrow-circle-left" class="w-6 transform rotate-180" />
        </a>
      </div>

      <nuxt-content :document="project" class="my-16 prose dark:prose-dark" />

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

export default {
  name: 'ShowProject',
  head() {
    return {
      title: this.project.title,
    }
  },
  async asyncData({ $content, params }) {
    const project = await $content(`projects/${params.slug}`).fetch()

    const [next, prev] = await $content('projects')
      .only(['title', 'path'])
      .sortBy('createdAt', 'desc')
      .surround(params.slug)
      .fetch()

    return {
      project,
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
