<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="p-4 text-6xl text-gray-200 bg-gray-900 rounded-lg">
        yiddishe-kop-2021
      </h1>
      <h2 class="subtitle">
        YiddisheKop personal site
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="p-3 rounded outline-none ring"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
