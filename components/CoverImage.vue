<template>
  <transition name="fadeIn" appear>
    <div v-if="chosenImage" class="top-0 left-0 right-0 z-0 w-full" :class="fixed ? 'fixed' : 'absolute'">
      <nuxt-picture placeholder :src="imgSrc" class="object-cover w-full max-h-screen" />
      <div
        class="absolute inset-0 bg-gray-200 dark:bg-gray-700 dark:bg-opacity-80 bg-opacity-80 bg-gradient-to-t dark:from-gray-800 from-gray-100"
      ></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CoverImage',
  props: {
    image: String,
    unsplash: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      unsplashImages: ['4rx3NLmWaZk', 'sdqIx9JQiTw', 'AeqGXkYWIHM', 'kbYD_aSAeg8'],
      chosenImage: null,
    }
  },
  computed: {
    imgSrc() {
      return this.unsplash ? `https://source.unsplash.com/${this.chosenImage}` : this.chosenImage
    },
  },
  mounted() {
    if (this.image) {
      this.chosenImage = this.image
      return
    }
    this.chosenImage = this.unsplashImages[Math.randomBetween(0, this.unsplashImages.length - 1)]
  },
}
</script>

<style>
.fadeIn-enter-active {
  transition: all 0.6s ease-in;
}
.fadeIn-leave-active {
  transition: none;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
