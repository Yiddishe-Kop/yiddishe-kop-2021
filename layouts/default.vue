<template>
  <div class="flex flex-col min-h-screen pt-20 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
    <the-header />

    <div class="max-w-full px-3 py-2 mx-auto sm:max-w-screen-lg">
      <main>
        <nuxt />
      </main>
    </div>
    <the-footer />

    <lightbox />
  </div>
</template>

<script>
export default {
  name: 'Layout',
}
</script>
