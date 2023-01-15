<template>
  <div class="w-full">
    <Head>
      <Title>{{ project.title }} | Yiddishe Kop</Title>
    </Head>
    <div class="fixed top-0 left-0 right-0 z-10 h-16 border-b-4" :style="`border-color: ${project.theme}a0`" />
    <cover-image :image="project.image" />

    <div class="relative px-2 md:px-4">
      <nuxt-link
        to="/projects"
        class="inline-flex items-center px-3 py-2 space-x-2 text-gray-500 transition-colors bg-gray-100 dark:bg-gray-900 dark:bg-opacity-50 hover:bg-opacity-80 bg-opacity-40 hover:text-amber-500"
      >
        <icon name="arrow-circle-left" class="w-6" />
        <span class="">Projects</span>
      </nuxt-link>

      <p class="mt-12 text-sm text-center text-gray-500">
        {{ date(project.createdAt) }}
      </p>
      <img class="block h-16 mx-auto my-4" :src="project.logo" :alt="project.title" />
      <h1 :style="`color: ${project.theme}`" class="max-w-xl mx-auto text-xl text-center text-brand">
        {{ project.title }}
      </h1>

      <div class="mt-8 text-center">
        <icon-button
          arrow
          tag="a"
          size="lg"
          :href="project.link"
          target="_blank"
          :style="`background-color: ${project.theme}; color: ${project.color}`"
        >
          Open app
        </icon-button>
      </div>

      <div
        class="py-16 my-16 bg-gray-100 bg-opacity-50 border border-gray-100 dark:border-gray-900 sm:px-12 rounded-xl dark:bg-gray-800 dark:bg-opacity-50 blur-bg"
      >
        <ContentRenderer :value="project" class="mx-auto prose dark:prose-dark" />
      </div>
      <nav class="flex items-stretch justify-between space-x-3 text-sm font-semibold text-gray-500">
        <nuxt-link
          v-if="prev"
          :to="prev._path"
          class="flex items-center justify-start flex-1 p-2 space-x-2 rounded bg-gray-50 dark:bg-gray-900 hover:bg-amber-100 hover:text-amber-800 dark:hover:text-amber-400"
        >
          <icon name="arrow-circle-left" class="w-6" />
          <span>{{ prev.title }}</span>
        </nuxt-link>
        <nuxt-link
          v-if="next"
          :to="next._path"
          class="flex items-center justify-end flex-1 p-2 space-x-2 text-right rounded bg-gray-50 dark:bg-gray-900 hover:bg-amber-100 hover:text-amber-800 dark:hover:text-amber-400"
        >
          <span>{{ next.title }}</span>
          <icon name="arrow-circle-left" class="w-6 transform rotate-180" />
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { date } from '~/lib/filters'

const { params, path } = useRoute()
const project = await queryContent().where({ _path: path }).findOne()

const [prev, next] = await queryContent('projects').only(['_path', 'title']).sort({ createdAt: -1 }).findSurround(path)

onMounted(() => {
  document.querySelectorAll('ol[start]').forEach(list => {
    const start = list.getAttribute('start')
    list.style.counterIncrement = `list-counter ${start}`
  })
})
</script>
