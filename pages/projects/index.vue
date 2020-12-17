<template>
  <div>
    <cover-image />

    <div class="relative my-16 text-center">
      <h1 class="text-4xl font-extrabold">Projects</h1>
      <h4 class="mt-4 text-xl">
        A list of recent projects I've been working on
      </h4>
    </div>

    <ul class="relative space-y-3">
      <li
          v-for="project in projects"
          :key="project.path"
          class="relative p-4 transition-shadow bg-white rounded-lg shadow dark:bg-gray-800 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
        >
          <h2
            class="text-xl font-bold text-blue-900 transition-colors dark:text-gray-200 group-hover:text-brand"
          >
            {{ project.title }}
          </h2>
          <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">{{ project.description }}</p>
          <p class="mt-3">
            <badge color="gray">{{ project.createdAt | date }}</badge>
          </p>
          <nuxt-link :to="project.path" class="absolute inset-0 rounded-lg" />
        </li>
    </ul>
  </div>
</template>

<script>
import { date } from "~/plugins/filters";

export default {
  name: "ProjectsIndex",
  head: {
    title: "Writings",
  },
  async asyncData({ $content }) {
    const projects = await $content("projects")
      .sortBy("createdAt", "desc")
      .fetch();
    return {
      projects,
    };
  },
  filters: {
    date,
  },
};
</script>

<style>
</style>
