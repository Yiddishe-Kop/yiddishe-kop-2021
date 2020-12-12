<template>
  <div>
    <h2
      class="text-xl font-bold text-blue-900 transition-colors dark:text-blue-100 group-hover:text-brand"
    >
      {{ feature.title }}
    </h2>
    <p class="mt-2 text-sm text-gray-800 dark:text-gray-400">
      {{ feature.description }}
    </p>
    <ul v-if="feature.images" class="grid grid-cols-2 gap-2 mt-3">
      <li v-for="img in feature.images" :key="img.href">
        <nuxt-image :src="img.href" responsive placeholder class="object-cover rounded-md shadow" :class="img.position || 'object-center'" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FeatureItem",
  props: {
    feature: Object,
  },
};
</script>
