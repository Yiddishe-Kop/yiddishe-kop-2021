<template>
  <div>
    <cover-image />

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
};
</script>
