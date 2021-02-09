<template>
  <div
    class="fixed top-0 z-50 w-screen px-4 bg-white bg-opacity-50 dark:bg-opacity-50 dark:text-white dark:bg-gray-900 blur-bg"
  >
    <header
      class="flex items-center justify-between max-w-screen-lg py-2 mx-auto"
    >
      <nuxt-link to="/" class="mr-8 focus:ring-0">
        <logo class="h-11" />
      </nuxt-link>

      <nav class="hidden space-x-1.5 sm:block">
        <nuxt-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          exact-active-class="active-nav-item"
          class="px-8 py-4 text-sm font-bold transition rounded-md hover:bg-opacity-50 blur-bg hover:bg-amber-100 dark:hover:bg-amber-900"
        >
          {{ item.label }}
        </nuxt-link>
      </nav>

      <!-- Mobile nav -->
      <div class="flex items-center space-x-2">
        <button
          @click="darkMode = !darkMode"
          class="p-1 rounded-full"
          :class="darkMode ? 'text-amber-400' : 'text-gray-800'"
        >
          <icon :name="darkMode ? 'sun' : 'moon'" class="w-6" />
        </button>

        <div class="sm:hidden">
          <button @click="open = !open" class="px-1.5 py-1">
            <octicon :name="open ? 'x' : 'three-bars'" />
          </button>
        </div>
      </div>
    </header>
    <nav v-if="open" class="flex flex-col py-4 space-y-1">
      <nuxt-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        @click.native="open = false"
        exact-active-class="active-nav-item"
        class="px-8 py-4 text-sm font-bold transition rounded-md hover:bg-opacity-50 blur-bg hover:bg-amber-100 dark:hover:bg-gray-900"
      >
        {{ item.label }}
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data: () => ({
    open: false,
    navItems: [
      {
        label: "Home",
        to: "/",
      },
      {
        label: "Timeline",
        to: "/timeline",
      },
      {
        label: "Writing",
        to: "/articles",
      },
      {
        label: "Projects",
        to: "/projects",
      },
      {
        label: "About",
        to: "/about",
      },
    ],
    darkMode: false,
  }),
  watch: {
    darkMode(isDark) {
      localStorage.theme = isDark ? "dark" : "light";
      if (isDark) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
      // Whenever the user explicitly chooses to respect the OS preference
      // localStorage.removeItem('theme')
    },
  },
  mounted() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      this.darkMode = true;
    }
  },
};
</script>

<style>
.blur-bg {
  backdrop-filter: blur(10px);
}
.active-nav-item {
  @apply text-amber-500 bg-opacity-50 bg-amber-100 dark:bg-amber-800 dark:text-amber-50 dark:bg-opacity-50;
}
</style>
