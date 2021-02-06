<template>
  <nuxt-picture
    :src="src"
    responsive
    placeholder
    @click.native="showLightbox"
    ref="image"
    :height="height"
    :width="width"
    style="cursor: zoom-in"
  />
</template>

<script>
export default {
  name: "LightboxImage",
  props: {
    src: String,
    width: Number,
    height: Number,
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

      const loadedSrc = el.querySelector('img').currentSrc
      console.log({loadedSrc});
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
