<template>
  <div class="pt-12">
    <Head>
      <Title>Apps | Daf Yomi Tracker</Title>
    </Head>
    <div v-if="isLoading" class="flex justify-center pt-28 pb-20">
      <Loader />
    </div>
    <div v-else class="relative !my-16 text-center !block px-1">
      <p class="text-gray-500 font-siddur text-2xl leading-none">מסכת</p>
      <h1
        class="font-siddur"
        :style="{
          fontSize: `${masechet.name.length * 1.2}vw`,
          marginTop: '-0.4em',
          '--siddur-weight': 900,
          '--siddur-width': 400,
        }"
      >
        {{ masechet.name }}
      </h1>
      <h4 class="text-3xl leading-none text-gray-500 font-siddur" style="--siddur-weight: 500">
        מעקב יומי ללימוד דף יומי
      </h4>
    </div>

    <Container v-if="masechet.name" padding="pb-12" dir="rtl">
      <LinearProgress
        icon="book"
        icon-end="champagne"
        :max="masechet.pages"
        :value="totalPagesDone"
        class="max-w-screen-sm mt-8 mx-auto text-gray-600"
        dir="rtl"
      >
        <template #default="{ percentage }">
          <div class="flex items-center justify-between pt-1">
            <p class="font-siddur -mt-2 text-lg text-gray-400">
              <strong class="font-sans text-sm text-gray-700">{{ percentage.toFixed(1) }}%</strong> מתוך
              {{ romanToHebrewNumber(totalDafim) }} דפים
            </p>
            <p class="font-siddur -mt-2 text-xl text-gray-400" style="--siddur-weight: 800">הדרן עלך!</p>
          </div>
        </template>
      </LinearProgress>

      <ul
        class="grid grid-flow-col grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 mt-8"
        :style="{ 'grid-template-rows': `repeat(${gridRows}, minmax(0, 1fr))` }"
      >
        <li
          v-for="daf in dafim"
          :key="daf.number"
          :class="{
            'bg-white': !daf.pages_done,
            'bg-green-100': daf.pages_done == 1,
            'bg-green-200': daf.pages_done == 2,
          }"
          class="flex items-center rounded-md transition-colors"
        >
          <strong
            :class="{
              'text-green-700': !!daf.pages_done,
            }"
            class="font-siddur p-3 flex-1 text-4xl leading-none -mt-[0.5em]"
            style="--siddur-weight: 900"
          >
            {{ daf.hebrew_number }}
          </strong>
          <button
            type="button"
            :class="{
              'hover:bg-gray-50 text-gray-300': !daf.pages_done,
              'hover:bg-green-300/50 text-green-500': !!daf.pages_done,
            }"
            class="p-3 rounded-r-none self-stretch rounded-l-md transition-colors"
            @click="togglePagesDone(daf)"
          >
            <Icon :name="daf.pages_done == 2 ? 'checks' : 'check'" class="w-5 h-5" />
          </button>
        </li>
        <li class="relative">
          <div
            class="absolute top-1 animate-pulse right-1/2 translate-x-1/2 text-green-400 bg-green-100 rounded-full p-2"
          >
            <Icon name="champagne" class="w-7 h-7" />
          </div>
          <p
            class="font-siddur text-2xl md:text-4xl text-center text-gray-700 relative top-4"
            style="--siddur-weight: 900; --siddur-width: 400"
          >
            הדרן עלך!
          </p>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { romanToHebrewNumber } from '~/lib/gimatria'
import { Shas } from '~/lib/shas'

definePageMeta({ layout: 'landing' })

const isLoading = ref(false)
const masechet = reactive({
  name: '',
  pages: 0,
})

const totalDafim = computed(() => {
  return masechet.pages ? Math.floor(masechet.pages / 2) : 0
})

const gridRows = computed(() => {
  if (!totalDafim.value) return 0
  let columns = 2
  if (window.innerWidth > 768) {
    columns = 4
  }
  return Math.ceil((totalDafim.value - 1) / columns)
})

type DafData = {
  number: number
  hebrew_number: string
  pages_done: number
  chazara_times: number
}
const dafim = ref<DafData[]>([])

const totalPagesDone = computed(() => {
  return dafim.value.reduce((acc, daf) => acc + daf.pages_done, 0)
})

const togglePagesDone = (daf: DafData) => {
  if (daf.pages_done == 2) {
    daf.pages_done = 0
  } else {
    daf.pages_done++
  }
  saveData()
}

const saveData = () => {
  const key = `daf-yomi-tracker.${masechet.name}`
  localStorage.setItem(key, JSON.stringify(dafim.value))
}

const loadData = () => {
  const key = `daf-yomi-tracker.${masechet.name}`
  const data = localStorage.getItem(key)
  if (data) {
    dafim.value = JSON.parse(data)
  } else {
    // Initialize with default values if no data exists
    dafim.value = Array.from({ length: totalDafim.value - 1 }, (_, i) => ({
      number: i + 2,
      hebrew_number: romanToHebrewNumber(i + 2),
      pages_done: 0,
      chazara_times: 0,
    }))
  }
}

onMounted(async () => {
  isLoading.value = true
  const currentMasechet = await new Shas().getCurrentMasechet()
  if (currentMasechet) {
    masechet.name = currentMasechet.name
    masechet.pages = currentMasechet.pages
    loadData()
  }
  isLoading.value = false
})

// Watch for changes to dafim and automatically save
watch(
  dafim,
  () => {
    if (masechet.name) {
      saveData()
    }
  },
  { deep: true }
)
</script>
