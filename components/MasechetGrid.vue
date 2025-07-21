<template>
  <NuxtLink
    :to="`/apps/daf-yomi/${masechet}`"
    class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-900 transition-colors"
  >
    <div class="flex items-baseline justify-between">
      <h5 class="text-2xl font-siddur" style="--siddur-weight: 700">{{ masechet }}</h5>
      <span class="font-mono px-2 text-sm opacity-50">{{ percentage }}%</span>
    </div>
    <ul class="flex flex-wrap mt-1 gap-1">
      <li
        v-for="page in dafim"
        :key="page.number"
        :class="{
          'bg-gray-200 dark:bg-gray-700': !page.pages_done,
          'bg-green-300': page.pages_done == 1,
          'bg-green-400': page.pages_done == 2,
        }"
        class="w-3 h-3 rounded"
      ></li>
    </ul>
  </NuxtLink>
</template>

<script setup lang="ts">
import { DafData, Shas } from '~~/lib/shas'

const props = defineProps<{
  masechet: string
  pages: number
}>()

const dafim = ref<DafData[]>([])

const totalPagesDone = computed(() => {
  return dafim.value.reduce((acc, daf) => acc + daf.pages_done, 0)
})

const percentage = computed(() => {
  return parseFloat(((totalPagesDone.value / props.pages) * 100).toFixed(1))
})

onMounted(() => {
  dafim.value = Shas.loadData(props.masechet)
})
</script>
