<template>
  <nuxt-img
    :src="src"
    responsive
    placeholder
    @click.native="showLightbox"
    ref="image"
    style="cursor: zoom-in"
    class="w-full h-full"
  />
</template>

<script>
export default {
  name: "LightboxImage",
  props: {
    src: String,
  },
  data() {
    return {
      open: false,
      coordinates: null,
      style: null,
    };
  },
  methods: {
    showLightbox() {
      const el = this.$refs.image.$el;
      const { top, left, width, height } = el.getBoundingClientRect();

      const loadedSrc = el.currentSrc
      this.$lightbox.open = true;
      this.$lightbox.imageSrc = this.src;
      this.$lightbox.lowResSrc = loadedSrc;
      this.$lightbox.originalPosition = {
        top,
        left,
        width,
        height,
      };
    },
  },
};
</script>

<style>
.stop-scrolling {
  height: 100%;
  overflow: hidden;
}
</style>
