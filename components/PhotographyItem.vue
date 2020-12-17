<template>
  <div>
    <div class="px-3 py-2 bg-gray-100 rounded-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <h2
          class="text-xl font-bold text-blue-900 transition-colors dark:text-gray-200 group-hover:text-brand"
        >
          {{ item.title }}
        </h2>
        <badge color="dark-gray">Canon EOS 80D</badge>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ item.description }}
      </p>
    </div>
    <div
      v-if="item.images && item.images.length == 3"
      class="grid grid-cols-2 gap-3 mt-3"
    >
      <nuxt-image
        v-for="(img, i) in item.images"
        :key="img"
        :class="{ 'row-span-2': i == 0 }"
        :src="img"
        responsive
        placeholder
        class="object-cover object-center rounded-md shadow"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotographyItem",
  props: {
    item: Object,
  },
};
</script>
