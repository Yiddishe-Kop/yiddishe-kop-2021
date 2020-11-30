<template>
  <div>
    <div class="absolute top-0 left-0 right-0 z-0 w-full">
      <img
        v-if="coverImage"
        :src="`https://source.unsplash.com/${coverImage}`"
        class="object-cover w-full"
      />
      <div
        class="absolute inset-0 bg-gray-200 bg-opacity-70 bg-gradient-to-t from-gray-200"
      ></div>
    </div>

    <div class="relative my-16 text-center">
      <h1 class="text-3xl font-extrabold">Hey, I'm Yehuda</h1>
      <h4 class="mt-4 text-xl">
        I'm a designer and software developer, currently living in Jerusalem.
      </h4>
      <div class="flex justify-center mt-6 space-x-4">
        <nuxt-link to="/about" class="btn btn-lg">More about me</nuxt-link>
        <nuxt-link to="/writing" class="btn btn-lg btn-brand"
          >Writing</nuxt-link
        >
      </div>
    </div>

    <section class="relative my-12"></section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      coverImage: null,
    };
  },
  created() {
    const unsplashImages = [
      "4rx3NLmWaZk",
      "sdqIx9JQiTw",
      "AeqGXkYWIHM",
      "kbYD_aSAeg8",
    ];
    this.coverImage =
      unsplashImages[Math.randomBetween(0, unsplashImages.length - 1)];
  },
};
</script>
