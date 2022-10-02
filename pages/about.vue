<template>
  <div>
    <Head>
      <Title>About | Yiddishe Kop</Title>
    </Head>
    <div class="relative mt-24 text-center">
      <h1 class="text-4xl font-extrabold">Hey, I'm Yehuda</h1>
      <h4 class="mt-4 text-xl">I'm a designer and software developer, living in Beit Shemesh, Israel.</h4>
      <h5 class="inline-block px-6 py-3 my-12 text-xl bg-white dark:bg-gray-900 md:px-10 shadow-soft rounded-xl">
        I'm currently fullstack developer at
        <a href="https://hybiz.co.il/" target="_blank" class="text-blue-700"
          ><img class="inline-block h-12" src="/logos/hybiz.svg" alt="Hybiz"
        /></a>
      </h5>
      <div class="flex justify-center mt-6 space-x-4">
        <a
          href="https://github.com/Yiddishe-Kop"
          target="_blank"
          class="flex items-center space-x-2 shadow-soft btn btn-lg"
        >
          <octicon large />
          <span>GitHub Profile</span>
        </a>
      </div>
    </div>
    <section class="max-w-2xl mx-auto my-20">
      <h2 class="pb-2 font-bold text-center text-gray-600 dark:text-gray-400">Other stuff I made</h2>
      <div class="space-y-24">
        <div
          class="relative flex items-center p-12 mt-8 space-x-10 text-pink-50 rounded-3xl group"
          style="background: #580627"
        >
          <div
            class="px-4 py-3 text-4xl font-semibold tracking-wider text-center text-pink-400 border-4 border-pink-400 rounded-xl"
          >
            Id
          </div>
          <h3 class="text-2xl font-medium">High quality InDesign scripts to speed up your workflow</h3>
          <a
            href="https://indesign.yiddishe-kop.com/"
            target="_blank"
            class="absolute px-4 py-2 text-sm tracking-wider uppercase transition bg-pink-800 rounded-lg group-hover:bg-pink-700 -bottom-4 right-12"
          >
            <span>Browse library</span>
            <octicon name="arrow-right" class="w-5 transition transform group-hover:translate-x-1" />
          </a>
        </div>
        <div class="relative flex items-center p-12 bg-gray-900 text-gray-50 rounded-3xl group" dir="rtl">
          <div class="px-6 pt-2 pb-4 text-6xl font-black text-center border-4 border-gray-300 text-brand rounded-xl">
            <p class="font-siddur">א</p>
          </div>
          <div class="flex flex-col mr-8 space-y-1">
            <h3 class="text-5xl tracking-wide font-siddur">פנינים</h3>
            <p class="text-2xl font-normal text-gray-400 font-siddur">כתיבת חידושים על הש״ס</p>
          </div>
          <a
            href="https://pninim.yiddishe-kop.com/"
            target="_blank"
            class="absolute px-4 py-2 text-sm tracking-wider text-gray-900 uppercase transition rounded-lg bg-brand group-hover:text-brand group-hover:bg-gray-700 -bottom-4 left-12"
          >
            <span class="text-2xl font-siddur">עיון וכתיבה</span>
            <octicon name="arrow-left" class="w-5 transition transform group-hover:-translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
