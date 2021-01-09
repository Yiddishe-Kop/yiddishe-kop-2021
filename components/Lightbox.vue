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
      <img
        :src="$lightbox.lowResSrc"
        class="absolute inset-0 w-full m-auto rounded-md"
      />
      <img
        :src="$lightbox.imageSrc"
        class="absolute inset-0 w-full m-auto rounded-md"
      />
    </div>
    <div class="absolute left-0 right-0 flex justify-center bottom-12">
      <div class="px-3 py-2 text-gray-500 bg-gray-200 rounded-full shadow-xl">
        <octicon name="x-circle-fill" large />
        <span class="ml-1 text-sm">Click anywhere to close</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lightbox",
  data() {
    return {
      animationStates: {
        NOT_STARTED: 0,
        FINISHED: 3,
      },
      animationState: 0,
      style: null,
    };
  },
  methods: {
    close() {
      const { top, left, width, height } = this.$lightbox.originalPosition;
      this.style = `
        position: fixed;
        top: ${top}px;
        left: ${left}px;
        width: ${width}px;
        height: ${height}px;
        object-fit: contain;
        padding: 0px;
      `;
      setTimeout(() => {
        this.$lightbox.open = false;
        this.style = `
          object-fit: cover;
        `;
        document.body.classList.remove("stop-scrolling");
      }, 300);
    },
    setOpenStyle() {
      const documentWidth = document.body.offsetWidth;
      const windowHeight = window.innerHeight;
      this.style = `
          position: fixed;
          top: 100px;
          left: 50px;
          width: ${documentWidth - 100}px;
          height: ${windowHeight - 150}px;
          object-fit: contain;
          padding: 0px;
        `;
    },
  },
  watch: {
    "$lightbox.open": function (isOpen) {
      if (!isOpen) return;
      const { top, left, width, height } = this.$lightbox.originalPosition;
      this.style = `
        position: fixed;
        top: ${top}px;
        left: ${left}px;
        width: ${width}px;
        height: ${height}px;
        object-fit: cover;
        padding: 0px;
      `;
      setTimeout(() => {
        this.setOpenStyle();
        document.body.classList.add("stop-scrolling");
      }, 10);
    },
  },
};
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
