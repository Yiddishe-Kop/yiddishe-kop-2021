<template>
  <div class="flex items-center justify-center loader-wrapper">
    <div class="loader" style="height: 26px; width: 26px">
      <svg height="100%" viewBox="0 0 32 32" width="100%">
        <circle cx="16" cy="16" fill="none" r="14" stroke-width="4" style="opacity: 0.2" />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          stroke-width="4"
          style="stroke-dasharray: 80px; stroke-dashoffset: 60px"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style lang="scss">
.loader-wrapper {
  .loader {
    animation: rotate 0.75s linear infinite;
    svg {
      circle {
        @apply text-amber-500;
        stroke: currentColor;
      }
    }
  }
  &.light {
    .loader svg circle {
      @apply text-amber-200;
      stroke: currentColor;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
