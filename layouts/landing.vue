<template>
  <div
    class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
  >
    <the-header />

    <div class="max-w-full">
      <main>
        <nuxt />
      </main>

      <the-footer />
    </div>

    <lightbox />
  </div>
</template>

<script>
export default {
  name: "LandingLayout",
};
</script>
