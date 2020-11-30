<template>
  <div class="fixed top-0 left-0 right-0 z-50 bg-white blur-bg bg-opacity-70">
    <header class="flex items-center justify-between max-w-screen-lg py-2 mx-auto">
      <nuxt-link to="/">
        <logo class="h-12"/>
      </nuxt-link>

      <nav>
      <nuxt-link v-for="item in navItems" :key="item.to" :to="item.to">
       {{ item.label }}
      </nuxt-link>

      </nav>

    </header>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data: () => ({
    navItems: [
      {
        label: 'Writing',
        to: '/writing'
      }
    ]
  })
}
</script>

<style>
.blur-bg {
  backdrop-filter: blur(5px);
}
</style>
