<template>
  <div class="absolute top-0 left-0 right-0 z-0 w-full">
    <img
      v-if="chosenImage"
      :src="`https://source.unsplash.com/${chosenImage}`"
      class="object-cover w-full"
    />
    <div
      class="absolute inset-0 bg-gray-200 bg-opacity-80 bg-gradient-to-t from-gray-100"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CoverImage",
  props: {
    image: String,
  },
  data() {
    return {
      unsplashImages: [
        "4rx3NLmWaZk",
        "sdqIx9JQiTw",
        "AeqGXkYWIHM",
        "kbYD_aSAeg8",
      ],
      chosenImage: null,
    };
  },
  mounted() {
    if (this.image) {
      this.chosenImage = this.image
      return
    }
    this.chosenImage = this.unsplashImages[
      Math.randomBetween(0, this.unsplashImages.length - 1)
    ];
  },
};
</script>
