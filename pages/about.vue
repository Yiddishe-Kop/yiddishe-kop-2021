<template>
  <div>
    <div class="relative mt-24 text-center">
      <h1 class="text-4xl font-extrabold">Hey, I'm Yehuda</h1>
      <h4 class="mt-4 text-xl">
        I'm a designer and software developer, currently living in Jerusalem.
      </h4>
      <div class="flex justify-center mt-6 space-x-4">
        <a
          href="https://github.com/Yiddishe-Kop"
          target="_blank"
          class="flex items-center space-x-2 btn btn-lg"
        >
          <octicon large />
          <span>GitHub</span>
        </a>
        <nuxt-link to="/articles" class="btn btn-lg btn-brand"
          >Writing</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  head: {
    title: "About | Yiddishe Kop",
  },
};
</script>

<style>
</style>
