<template>
  <div class="fixed top-0 left-0 right-0 z-50 bg-white blur-bg bg-opacity-70">
    <header
      class="flex items-center justify-center max-w-screen-lg py-2 mx-auto"
    >
      <nuxt-link to="/" class="mr-8 focus:ring-0">
        <logo class="h-11" />
      </nuxt-link>

      <nav class="space-x-1">
        <nuxt-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          active-class="active-nav-item"
          class="px-8 py-4 text-sm font-bold text-gray-900 transition rounded-md hover:bg-opacity-70 blur-bg hover:bg-amber-100"
        >
          {{ item.label }}
        </nuxt-link>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data: () => ({
    navItems: [
      {
        label: "Writing",
        to: "/articles",
      },
      {
        label: "Projects",
        to: "/projects",
      },
    ],
  }),
};
</script>

<style>
.blur-bg {
  backdrop-filter: blur(10px);
}
.active-nav-item {
  @apply text-amber-500 bg-opacity-70 bg-amber-100;
}
</style>
