<template>
  <div class="pt-12">
    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Projects</h1>
      <h4 class="mt-4 text-xl">A list of recent projects I've been working on</h4>
    </div>

    <div>
      <section
        v-for="(project, i) in projects"
        :key="project.path"
        class="relative p-4 group"
        :class="i % 2 == 0 ? 'bg-gray-800 text-gray-100' : 'text-gray-800 bg-gray-100'"
      >
        <container>
          <img class="block h-16" :src="project.logo" :alt="project.title" />
          <p class="mt-12 text-sm">{{ project.description }}</p>
          <div class="mt-4">
            <a
              :href="project.link"
              target="_blank"
              :class="i % 2 == 0 ? 'bg-gray-200  text-gray-800' : 'bg-gray-800 text-gray-100'"
              class="relative z-10 inline-flex items-center px-4 py-1 space-x-1 text-sm font-semibold rounded-full"
            >
              <span>Open</span>
              <octicon name="arrow-right" class="w-4" />
            </a>
          </div>
          <p class="mt-4 text-sm opacity-75">Started: {{ project.createdAt | date }}</p>
          <nuxt-link :to="project.path" class="absolute inset-0 z-0 rounded-lg" />
        </container>
      </section>
    </div>
  </div>
</template>

<script>
import { date } from '~/plugins/filters'

export default {
  name: 'ProjectsIndex',
  head: {
    title: 'Writings',
  },
  layout: 'landing',
  async asyncData({ $content }) {
    const projects = await $content('projects').sortBy('createdAt', 'desc').fetch()
    return {
      projects,
    }
  },
  filters: {
    date,
  },
}
</script>

<style>
</style>
