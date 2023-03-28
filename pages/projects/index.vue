<template>
  <div class="pt-12">
    <Head>
      <Title>Writings | Yiddishe Kop</Title>
    </Head>
    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Projects</h1>
      <h4 class="mt-4 text-xl">Some recent projects I've been working on</h4>
    </div>

    <Container>
      <ul class="grid gap-6 md:grid-cols-2">
        <li
          v-for="project in projects"
          :key="project._path"
          class="relative flex flex-col items-center overflow-hidden bg-white dark:bg-gray-900 rounded-2xl"
          :style="{
            backgroundColor: `${project.theme}30`,
          }"
        >
          <img class="block h-16 m-4" :src="project.logo" :alt="project.title" />
          <div
            class="flex flex-col self-stretch flex-1 p-3 mt-4 border-t-2 bg-white/40 dark:bg-gray-700/80"
            :style="{
              borderColor: project.theme,
            }"
          >
            <h3 class="font-bold text-gray-800 dark:text-gray-100">
              {{ project.title }}
            </h3>
            <p class="flex-1 text-sm text-gray-600 dark:text-gray-300">
              {{ project.description }}
            </p>
            <div class="flex justify-end pt-2">
              <icon-button
                arrow
                tag="a"
                :href="project.link"
                target="_blank"
                class="relative z-10"
                :style="`background-color: ${project.theme}; color: ${project.color}`"
              >
                Open app
              </icon-button>
            </div>
            <nuxt-link :to="project._path" class="absolute inset-0 z-0 rounded-2xl" />
          </div>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup>
import { date } from '~/lib/filters'

definePageMeta({ layout: 'landing' })

const projects = await queryContent('/projects').sort({ createdAt: -1 }).find()
</script>
