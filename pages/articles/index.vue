<template>
  <div>
    <Head>
      <Title>Writings | Yiddishe Kop</Title>
    </Head>
    <cover-image />

    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Overthought</h1>
      <h4 class="mt-4 text-xl">Thinking out loud about design, development, and building excellent software</h4>
    </div>

    <ul class="relative grid grid-cols-1 gap-4 my-24 lg:gap-6 sm:grid-cols-2 md:grid-cols-3">
      <blog-card
        v-for="article in articles"
        :key="article._path"
        :article="article"
        class="relative flex flex-col overflow-hidden transition-shadow bg-white rounded-lg shadow dark:bg-gray-900 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
      />
    </ul>
  </div>
</template>

<script setup>
import BlogCard from '~/components/BlogCard.vue'

const articles = await queryContent('articles').sort({ createdAt: -1 }).find()
</script>
