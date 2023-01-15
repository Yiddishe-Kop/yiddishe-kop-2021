<template>
  <component
    :is="component"
    :href="href"
    :to="href"
    v-bind="$attrs"
    class="inline-flex items-center justify-center font-semibold leading-none uppercase transition-colors duration-150 ease-in-out border rounded-full shadow-sm group whitespace-nowrap dark:border-gray-700 focus:outline-none focus:ring"
    :class="[
      colorClasses,
      sizeClasses,
      {
        'bg-transparent hover:bg-white text-gray-700 hover:text-gray-900': quiet,
        'hover:bg-opacity-75': !quiet,
      },
    ]"
  >
    <icon v-if="icon && iconPosition == 'before'" :name="icon" class="w-5" />
    <span>
      <slot />
    </span>
    <icon v-if="icon && iconPosition == 'after'" :name="icon" class="w-4" />
    <AnimatedArrow v-if="arrow" :class="{ dark: ['brand', 'dark'].includes(color) }" />
  </component>
</template>

<script>
import AnimatedArrow from '@/components/AnimatedArrow.vue'

export default {
  name: 'IconButton',
  props: {
    tag: String,
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
    size: {
      type: String,
      default: 'base',
    },
    color: {
      type: String,
      default: 'brand',
    },
    arrow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AnimatedArrow,
  },
  computed: {
    component() {
      if (this.tag) {
        return this.tag
      }
      if (this.href) {
        return this.href[0] == '#' ? 'a' : 'nuxt-link'
      }
      return 'button'
    },
    sizeClasses() {
      return {
        xs: 'py-0 px-1 text-xs space-x-1',
        sm: `py-1 text-xs  space-x-2 ${this.isIconButton ? 'px-1' : 'px-3'}`,
        base: `py-2  text-xs space-x-2 ${this.isIconButton ? 'px-2' : 'px-4'}`,
        lg: `py-3 space-x-4 ${this.isIconButton ? 'px-2' : 'px-6'}`,
        xl: `py-4 space-x-6 ${this.isIconButton ? 'px-2' : 'px-8'}`,
      }[this.size]
    },
    iconSizeClasses() {
      return {
        xs: 'w-4',
        sm: 'w-4',
        base: 'w-5',
        lg: 'w-5',
        xl: 'w-6',
      }[this.size]
    },
    colorClasses() {
      return {
        brand:
          'bg-brand-500 dark:bg-brand-100 border-transparent text-white dark:text-brand-800 hover:bg-brand-900 dark:hover:bg-brand-50 focus:bg-brand-900 focus:ring-brand-400',
        gradient:
          'bg-gradient-to-br from-brand-300 via-brand-700 to-brand-500 border-0 text-white focus:bg-brand-900 focus:ring-brand-400',
        secondary:
          'bg-white border-gray-200 dark:border-brand-500 text-gray-500 dark:text-brand-100 dark:hover:text-brand-50 dark:bg-brand-800 hover:bg-gray-50 dark:hover:bg-brand-700 hover:text-gray-700 focus:text-gray-700 focus:ring-brand-400',
        quiet:
          'shadow-none border-0 hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:ring-brand-400',
        danger:
          'bg-white border-red-200 dark:border-red-700 dark:bg-red-800 text-red-500 dark:text-red-200 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-100 focus:text-red-700 focus:ring-red-400',
        warning:
          'bg-white dark:bg-orange-800 dark:border-orange-700 border-orange-200 text-orange-500 hover:bg-orange-50 dark:text-orange-200 dark:hover:text-orange-100 hover:text-orange-700 focus:text-orange-700 focus:ring-orange-400',
        success:
          'bg-white border-green-300 text-green-500 hover:bg-green-50 hover:text-green-700 focus:text-green-700 focus:ring-green-400',
        dark: 'bg-brand-900 border-transparent text-white hover:bg-brand-900/75 focus:bg-brand-900/75 dark:hover:bg-brand-800',
      }[this.color]
    },
    isIconButton() {
      return this.icon && !this.$slots.default
    },
  },
}
</script>
