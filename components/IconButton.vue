<template>
  <component
    :is="component"
    :href="href"
    :to="href"
    v-bind="$attrs"
    class="inline-flex items-center px-3 py-2 transition rounded-full whitespace-nowrap"
    :class="{
      'space-x-1.5': hasSlotContent,
      'bg-transparent hover:bg-white text-gray-700 hover:text-gray-900': quiet,
      'hover:bg-opacity-75': !quiet,
    }"
  >
    <icon v-if="icon && iconPosition == 'before'" :name="icon" class="w-5" />
    <span>
      <slot />
    </span>
    <icon v-if="icon && iconPosition == 'after'" :name="icon" class="w-4" />
  </component>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    icon: String,
    iconPosition: {
      type: String,
      default: 'before',
    },
    href: String,
    quiet: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    component() {
      if (this.href) {
        return this.href[0] == '#' ? 'a' : 'nuxt-link'
      }
      return 'button'
    },
    hasSlotContent() {
      return !!this.$slots.default
    },
  },
}
</script>
