<template>
  <div>
    <h2
      class="text-xl font-bold text-blue-900 transition-colors dark:text-blue-100 group-hover:text-brand"
    >
      {{ design.title }}
    </h2>
    <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">
      {{ design.description }}
    </p>
    <ul v-if="design.images" class="mt-3 space-y-4">
      <li v-for="image in design.images" :key="image.href">
        <nuxt-image :src="image.href" responsive placeholder class="object-cover rounded-md shadow" :class="image.position || 'object-center'" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DesignItem",
  props: {
    design: Object,
  },
};
</script>
