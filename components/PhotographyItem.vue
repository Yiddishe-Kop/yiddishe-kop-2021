<template>
  <div>
    <div class="px-3 py-2 bg-gray-100 rounded-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-blue-900 transition-colors dark:text-gray-200 group-hover:text-brand">
          {{ item.title }}
        </h2>
        <badge color="dark-gray">Canon EOS 80D</badge>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ item.description }}
      </p>
    </div>
    <div v-if="item.images && item.images.length == 3" class="grid grid-cols-2 gap-3 mt-3" style="height: 475px">
      <lightbox-image
        v-for="(img, i) in item.images"
        :key="img"
        :class="{ [horizontal ? 'col-span-2' : 'row-span-2']: i == 0 }"
        :src="img"
        class="rounded rounded-lg shadow"
      />
    </div>
    <div v-else-if="item.images && item.images.length == 2" class="grid gap-3 mt-3">
      <lightbox-image v-for="(img, i) in item.images" :key="img" :src="img" class="h-56 rounded rounded-lg shadow" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotographyItem',
  props: {
    item: Object,
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
