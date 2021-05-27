<template>
  <figure>
    <lightbox-image :src="src" class="h-56 rounded-lg shadow" />
    <figcaption v-if="caption" class="text-center">{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'ArticleImage',
  props: {
    src: String,
    caption: String,
  },
}
</script>

<style lang="scss">
.article-img {
  img {
    @apply rounded-md mt-2 mb-0;
  }
}
</style>
