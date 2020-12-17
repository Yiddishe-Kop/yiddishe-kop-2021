<template>
  <div>
    <h2
      class="text-xl font-bold text-blue-900 transition-colors dark:text-gray-200 group-hover:text-brand"
    >
      {{ item.title }}
    </h2>
    <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">
      {{ item.description }}
    </p>
    <div class="flex items-stretch mt-3 space-x-3">
      <a
        v-for="action in item.actions"
        :key="action.label"
        :href="action.url"
        class="flex items-center space-x-3 text-sm btn"
        target="_blank"
        rel="nofollow noopener noreferrer"
        >
        <icon v-if="action.icon" :name="action.icon" class="w-4 text-gray-500 dark:text-gray-400"/>
        <octicon v-if="action.octicon" :name="action.octicon" class="w-4 text-gray-500 dark:text-gray-400"/>
        <span>{{ action.label }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "OpenSourceItem",
  props: {
    item: Object,
  },
};
</script>

<style>
</style>
