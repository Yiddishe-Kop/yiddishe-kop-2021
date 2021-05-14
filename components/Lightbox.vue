<template>
  <div
    v-if="$lightbox.open"
    @click="close"
    class="fixed inset-0 flex items-center justify-center"
    style="cursor: zoom-out"
  >
    <transition name="overlay">
      <div
        v-if="$lightbox.open"
        class="fixed inset-0 bg-gray-200 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80"
      ></div>
    </transition>
    <div :style="style" class="relative w-full h-full transition-image-in-out">
      <!-- <img :src="$lightbox.lowResSrc" class="absolute inset-0 object-contain w-full h-full m-auto rounded-md" /> -->
      <nuxt-img
        :src="$lightbox.lowResSrc"
        sizes="sm:95vw md:75vw lg:1200px"
        class="absolute inset-0 object-contain max-h-full m-auto rounded-md"
      />
      <!-- Show high-res version above low-res version -->
      <nuxt-img
        :src="$lightbox.imageSrc"
        sizes="sm:95vw md:75vw lg:1200px"
        class="absolute inset-0 object-contain max-h-full m-auto rounded-md"
      />
    </div>
    <div class="absolute left-0 right-0 flex justify-center bottom-12">
      <div
        class="flex items-center py-2 pl-2 pr-3 text-red-400 bg-white border-2 border-red-400 rounded-full shadow-xl"
      >
        <octicon name="x-circle-fill" large class="w-6 mr-1 text-red-500" />
        <span class="ml-1 text-sm">Click anywhere to close</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lightbox',
  data() {
    return {
      style: null,
    }
  },
  methods: {
    close() {
      const { top, left, width, height } = this.$lightbox.originalPosition
      this.style = `
        position: fixed;
        top: ${top}px;
        left: ${left}px;
        width: ${width}px;
        height: ${height}px;
        object-fit: contain;
        padding: 0px;
      `
      setTimeout(() => {
        this.$lightbox.open = false
        this.style = `
          object-fit: cover;
        `
        document.body.classList.remove('stop-scrolling')
      }, 300)
    },
    setOpenStyle() {
      const documentWidth = document.body.offsetWidth
      const windowHeight = window.innerHeight
      this.style = `
          position: fixed;
          top: 100px;
          left: 50px;
          width: ${documentWidth - 100}px;
          height: ${windowHeight - 150}px;
          object-fit: contain;
          padding: 0px;
        `
    },
  },
  watch: {
    '$lightbox.open': function (isOpen) {
      if (!isOpen) return
      const { top, left, width, height } = this.$lightbox.originalPosition
      this.style = `
        position: fixed;
        top: ${top}px;
        left: ${left}px;
        width: ${width}px;
        height: ${height}px;
        object-fit: cover;
        padding: 0px;
      `
      setTimeout(() => {
        this.setOpenStyle()
        document.body.classList.add('stop-scrolling')
      }, 10)
    },
  },
}
</script>

<style>
.transition-image-in-out {
  transition: all 0.25s ease-in-out;
}
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s;
}
.overlay-enter,
.overlay-leave-active {
  opacity: 0;
}
</style>
