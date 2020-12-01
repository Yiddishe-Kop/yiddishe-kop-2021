<template>
  <div class="p-4 transition-shadow bg-white rounded-lg shadow dark:bg-gray-900 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group">
    <h2
      class="text-xl font-bold text-blue-900 transition-colors dark:text-blue-100 group-hover:text-brand"
    >
      {{ item.title }}
    </h2>
    <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">
      {{ item.description }}
    </p>
    <nuxt-link :to="item.path" class="absolute inset-0 rounded-lg" />
  </div>
</template>

<script>
export default {
  name: "BlogItem",
  props: {
    item: Object
  },
};
</script>

<style>
</style>
