<template>
  <div :class="[padding, maxWidth, fullWidth ? '' : 'px-4 mx-auto sm:px-6']">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    padding: {
      type: String,
      default: 'py-12',
    },
    maxWidth: {
      type: String,
      default: 'max-w-5xl',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
