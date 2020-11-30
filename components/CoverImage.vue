<template>
  <div class="absolute top-0 left-0 right-0 z-0 w-full">
    <img
      :src="`https://source.unsplash.com/${
        unsplashImages[Math.randomBetween(0, unsplashImages.length - 1)]
      }`"
      class="object-cover w-full"
    />
    <div
      class="absolute inset-0 bg-gray-200 bg-opacity-70 bg-gradient-to-t from-gray-200"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CoverImage",
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
    console.log(this.unsplashImages);
    this.chosenImage = this.unsplashImages[Math.randomBetween(0, this.unsplashImages.length - 1)]
    console.log(this.chosenImage);
  }
};
</script>
