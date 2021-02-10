<template>
  <!-- prettier-ignore -->
  <blockquote
    class="p-3 my-3 text-sm leading-snug border-l-4 rounded-r-md"
    :class="{
      info: 'text-blue-900 bg-blue-100 border-blue-600',
      danger: 'text-red-900 bg-red-100 border-red-600',
      alert: 'text-orange-900 bg-orange-100 border-orange-600',
    }[type]"
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
