<template>
  <!-- prettier-ignore -->
  <blockquote
    class="p-3 my-3 border-l-4 rounded-r-md"
    :class="type"
  >
    <slot />
  </blockquote>
</template>

<script>
export default {
  name: 'Quote',
  props: {
    type: {
      type: String,
      default: 'info',
    },
  },
}
</script>

<style lang="scss">
blockquote {
  font-style: normal !important;
  &.info {
    @apply text-blue-900 bg-blue-100 border-blue-600 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-500;
  }
  &.danger {
    @apply text-red-900 bg-red-100 border-red-600 dark:bg-red-900 dark:text-red-100 dark:border-red-500;
  }
  &.alert {
    @apply text-amber-900 bg-amber-100 border-amber-600 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-500;
  }
}
</style>
