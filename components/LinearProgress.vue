<template>
  <div v-tippy="`${percentage}%`">
    <div class="flex items-center">
      <Icon v-if="icon" :name="icon" class="w-5 ml-2" />
      <div
        :style="{ height, backgroundColor: bgColor }"
        :class="{
          'rounded-full': !square,
        }"
        class="overflow-hidden flex-1"
      >
        <div
          class="bg-striped h-full transition-all duration-1000 ease-out"
          :class="{
            gray: muted,
            'rounded-full': !square,
          }"
          :style="{ width: mounted ? `${percentage}%` : 0 }"
        />
      </div>
      <Icon v-if="iconEnd" :name="iconEnd" class="w-5 mr-2" />
    </div>
    <slot :percentage="percentage" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  height: {
    type: [Number, String],
    default: '16px',
  },
  bgColor: {
    type: String,
    default: '#e2e8f0',
  },
  color: {
    type: String,
    default: '#10b981',
  },
  muted: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  icon: String,
  iconEnd: String,
})

const percentage = computed(() => {
  return parseFloat(((props.value / props.max) * 100).toFixed(2))
})

const lightColor = computed(() => {
  return `${props.color}a0`
})

const mounted = ref(false)
// animate in
onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)
})
</script>

<style lang="scss">
.bg-striped {
  background: repeating-linear-gradient(
    45deg,
    v-bind(color),
    v-bind(color) 10px,
    v-bind(lightColor) 10px,
    v-bind(lightColor) 20px
  );
  &.gray {
    background: repeating-linear-gradient(
      45deg,
      theme('colors.gray.500'),
      theme('colors.gray.500') 10px,
      theme('colors.gray.400') 10px,
      theme('colors.gray.400') 20px
    );
  }
}
</style>
