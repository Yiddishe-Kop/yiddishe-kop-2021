<template>
  <div class="pt-12">
    <Head>
      <Title>Apps | Gimatrikon</Title>
    </Head>
    <div class="relative !my-16 text-center !block">
      <h1 class="text-7xl font-siddur" style="--siddur-weight: 900; --siddur-width: 700">גימטריקון</h1>
      <h4 class="mt-4 text-3xl text-gray-500 font-siddur" style="--siddur-weight: 500">אוצר רמזים וגמטריאות</h4>
    </div>

    <Container dir="rtl">
      <input
        v-model="query"
        type="text"
        placeholder="הקלד משהו בעברית"
        class="!block max-w-2xl pb-3 text-center pt-0 mx-auto text-4xl px-6 leading-none bg-gray-200 rounded-full outline-none font-siddur focus:ring-amber-200/40 focus:ring-2 focus:border-amber-600 placeholder:text-gray-400 dark:placeholder:text-gray-700 dark:bg-gray-900"
      />
      <div class="!grid max-w-lg gap-2 mx-auto !my-10 font-siddur text-3xl">
        <transition-group
          v-if="matchingPhrases"
          name="slideIn"
          tag="ul"
          class="space-y-2 list-decimal marker:text-brand marker:font-sans marker:text-lg marker:font-thin"
        >
          <li
            class="pb-3 px-6 pt-0.5 text-4xl bg-gray-200 rounded-xl dark:bg-gray-900"
            v-for="(phrase, i) in matchingPhrases"
            :key="phrase"
          >
            {{ phrase }}
          </li>
        </transition-group>
        <div v-else class="text-center text-gray-500">אין תוצאות</div>
      </div>
    </Container>
  </div>
</template>

<script setup>
import { date } from '~/lib/filters'

definePageMeta({ layout: 'landing' })

const letters = {
  א: 1,
  ב: 2,
  ג: 3,
  ד: 4,
  ה: 5,
  ו: 6,
  ז: 7,
  ח: 8,
  ט: 9,
  י: 10,
  כ: 20,
  ך: 20,
  ל: 30,
  מ: 40,
  ם: 40,
  נ: 50,
  ן: 50,
  ס: 60,
  ע: 70,
  פ: 80,
  ף: 80,
  צ: 90,
  ץ: 90,
  ק: 100,
  ר: 200,
  ש: 300,
  ת: 400,
}
let db = {}

const query = ref('')
const gimatriya = computed(() => {
  if (!query.value) return null
  return query.value
    .split('')
    .map(letter => letters[letter] || 0)
    .reduce((acc, val) => acc + val, 0)
})

const matchingPhrases = computed(() => {
  if (!gimatriya.value) return null
  return db[gimatriya.value]
})

onMounted(async () => {
  const data = await await (await fetch('/gimatriyos.json')).json()
  db = data.numbers
})
</script>
