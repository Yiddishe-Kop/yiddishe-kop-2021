<template>
  <img :src="require(`~/assets/img/${src}`)">
</template>

<script>
export default {
  name: 'NuxtImage',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
}
</script>
