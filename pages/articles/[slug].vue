<template>
  <div>
    <Head>
      <Title>{{ article.title }} | Yiddishe Kop</Title>
    </Head>
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
        {{ date(article.createdAt) }}
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

      <div
        class="py-16 my-16 bg-gray-100 bg-opacity-50 border border-gray-100 dark:border-gray-900 sm:px-12 rounded-xl dark:bg-gray-800 dark:bg-opacity-50 blur-bg"
      >
        <ContentRenderer :value="article" class="mx-auto prose dark:prose-dark" />
      </div>

      <nav class="flex items-stretch justify-between space-x-3 text-sm font-semibold text-gray-500">
        <NuxtLink
          v-if="prev"
          :to="prev._path"
          class="flex items-center justify-start flex-1 p-2 space-x-2 rounded bg-gray-50 dark:bg-gray-900 hover:bg-amber-100 hover:text-amber-800 dark:hover:text-amber-400"
        >
          <icon name="arrow-circle-left" class="w-6" />
          <span>{{ prev.title }}</span>
        </NuxtLink>
        <NuxtLink
          v-if="next"
          :to="next._path"
          class="flex items-center justify-end flex-1 p-2 space-x-2 text-right rounded bg-gray-50 dark:bg-gray-900 hover:bg-amber-100 hover:text-amber-800 dark:hover:text-amber-400"
        >
          <span>{{ next.title }}</span>
          <icon name="arrow-circle-left" class="w-6 transform rotate-180" />
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { date } from '~/lib/filters'

const { params, path } = useRoute()
const article = await queryContent().where({ _path: path }).findOne()

const [prev, next] = await queryContent('articles').only(['_path', 'title']).sort({ createdAt: -1 }).findSurround(path)

onMounted(() => {
  document.querySelectorAll('ol[start]').forEach(list => {
    const start = list.getAttribute('start')
    list.style.counterIncrement = `list-counter ${start}`
  })
})
</script>
