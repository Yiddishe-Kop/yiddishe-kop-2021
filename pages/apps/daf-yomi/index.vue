<template>
  <Head>
    <Title>Apps | Daf Yomi Tracker</Title>
  </Head>
  <div dir="rtl">
    <div class="relative my-16 text-center !block px-1">
      <p class="text-gray-500 font-siddur text-2xl leading-none">בעזהשי״ת גם אני עושה</p>
      <h1
        class="font-siddur text-8xl sm:text-9xl leading-[0.65em]"
        :style="{
          '--siddur-weight': 900,
          '--siddur-width': 400,
        }"
      >
        סיום הש״ס
      </h1>
    </div>
    <ul class="columns-2 md:columns-3 my-24">
      <li v-for="(dafim, masechet) in Shas.MASECHTOS" :key="masechet" class="break-inside-avoid-column">
        <MasechetGrid :masechet="masechet" :pages="dafim" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Shas } from '~~/lib/shas'
</script>
