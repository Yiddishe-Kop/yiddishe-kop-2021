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
    <ul v-if="design.images" class="grid grid-cols-2 gap-2 mt-3">
      <li v-for="image in design.images" :key="image.href" class="aspect-h-1 aspect-w-1">
        <nuxt-image :src="image.href" class="object-cover rounded-md shadow" :class="image.position || 'object-center'" />
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
