<template>
  <div
    class="flex items-stretch transition-shadow bg-white rounded-lg shadow-soft dark:bg-gray-900 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
  >
    <div class="w-32">
      <nuxt-picture placeholder :src="item.image" class="rounded-l" />
    </div>
    <div class="flex-1 p-4 ml-4">
      <h2 class="text-xl font-bold text-blue-900 transition-colors dark:text-gray-200 group-hover:text-brand">
        {{ item.title }}
      </h2>
      <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">
        {{ item.description }}
      </p>
    </div>
    <nuxt-link :to="item._path" class="absolute inset-0 rounded-lg" />
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: {
    item: Object,
  },
}
</script>
