<template>
  <div class="pt-12">
    <Head>
      <Title>Writings | Yiddishe Kop</Title>
    </Head>
    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Projects</h1>
      <h4 class="mt-4 text-xl">Some recent projects I've been working on</h4>
    </div>

    <section
      v-for="project in projects"
      :key="project._path"
      class="relative p-4 border-b-4 group"
      :style="`background-color: ${project.theme}30; border-color: ${project.theme}`"
    >
      <container>
        <img class="block h-16" :src="project.logo" :alt="project.title" />
        <h1 class="mt-4 text-2xl font-black">{{ project.title }}</h1>
        <p class="text-sm">{{ project.description }}</p>
        <div class="mt-10">
          <a
            :href="project.link"
            target="_blank"
            class="relative z-10 inline-flex items-center px-4 py-1 space-x-1 text-sm font-semibold rounded-full"
            :style="`background-color: ${project.theme}; color: ${project.color}`"
          >
            <span>Open app</span>
            <octicon name="arrow-right" class="w-4" />
          </a>
        </div>
        <p class="mt-4 text-sm opacity-75">Started: {{ date(project.startedAt) }}</p>
        <nuxt-link :to="project._path" class="absolute inset-0 z-0 rounded-lg" />
      </container>
    </section>
  </div>
</template>

<script>
import { date } from '~/lib/filters'

definePageMeta({ layout: 'landing' })

export default {
  name: 'ProjectsIndex',
  async setup() {
    const { data: projects } = await useAsyncData('projects', () =>
      queryContent('/projects').sort({ createdAt: -1 }).find()
    )
    return { projects }
  },
  methods: {
    date,
  },
}
</script>
