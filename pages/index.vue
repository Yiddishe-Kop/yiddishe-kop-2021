<template>
  <div class="pt-32 bg-white dark:bg-gray-700">
    <Head>
      <Title>Home | Yiddishe Kop</Title>
    </Head>
    <!-- Hero section -->
    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 bg-gray-100 dark:bg-gray-900 h-1/2"></div>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div class="absolute inset-0">
            <nuxt-picture src="/img/rainbow.jpg" placeholder class="w-full h-full" />
          </div>
          <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 class="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
              <span
                class="block text-xl font-semibold tracking-widest text-center text-white uppercase dark:text-gray-900"
                >you need</span
              >
              <span class="block text-brand">cutting edge</span>
              <span class="block text-white dark:text-gray-900">software</span>
            </h1>
            <p class="max-w-lg mx-auto mt-6 text-xl text-center text-white dark:text-gray-900 sm:max-w-3xl">
              We build bespoke software from the ground up to exactly solve your challenges.<br />
              We code your ideas into sophisticated machinery.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Logo Cloud -->
    <div class="bg-gray-100 dark:bg-gray-900">
      <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p class="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase dark:text-gray-400">
          Trusted by great businesses
        </p>
        <div class="flex flex-wrap items-center justify-center mt-6 md:justify-between">
          <a href="https://5dakot.com/" target="_blank" class="p-6 b-w">
            <img class="h-12" src="/logos/5dakkot.svg" alt="5Dakkot" />
          </a>

          <a href="https://beitalef.com/" target="_blank" class="p-6 b-w">
            <img class="h-12" src="/logos/beitalef.svg" alt="Beit Alef" />
          </a>

          <a href="https://getnecto.com/" target="_blank" class="p-6 b-w">
            <img class="h-8" src="/logos/necto.svg" alt="Hybiz" />
          </a>

          <a href="https://breslevsheli.co.il/" target="_blank" class="p-6 b-w">
            <img class="relative h-12 bottom-3" src="/logos/breslevsheli.svg" alt="Breslev Sheli" />
          </a>

          <a href="https://jkaraoke.com/" target="_blank" class="p-6 b-w">
            <img class="h-12" src="/logos/jkaraoke.svg" alt="jKaraoke" />
          </a>
        </div>
      </div>
    </div>

    <!-- Alternating Feature Sections -->
    <div class="relative pt-16 pb-32 lg:overflow-hidden">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100 dark:from-gray-900"
      ></div>
      <div class="mt-24">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <div>
              <div>
                <span
                  class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-900 ring-brand ring-2"
                >
                  <icon name="terminal" class="text-amber-600 dark:text-amber-400 w-7" />
                </span>
              </div>
              <div class="mt-6">
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Daringly Ambitious
                </h2>
                <p class="mt-4 text-lg text-gray-500 dark:text-gray-300">
                  We develop custom software from idea to production. We'll study your workflow, come up with a software
                  solution tailored to speed up your processes, and build technology to make business operations the
                  most efficient possible.
                </p>
                <div class="mt-6">
                  <NuxtLink
                    to="/timeline"
                    class="inline-flex px-6 py-1 text-base font-medium text-white transition-transform rounded-full shadow-sm dark:text-gray-900 bg-gradient-to-r from-amber-300 to-amber-500 hover:scale-105"
                  >
                    Read more
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                class="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/img/jkaraoke-lyrics-editor.jpg"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div>
                <span
                  class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-900 ring-brand ring-2"
                >
                  <icon name="dashboard" class="text-amber-600 dark:text-amber-400 w-7" />
                </span>
              </div>
              <div class="mt-6">
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Buttery Smooth Applications
                </h2>
                <p class="mt-4 text-lg text-gray-500 dark:text-gray-300">
                  We create buttery smooth & fast applications, that is a joy to use, and instead of slowing you down,
                  keeps up with your fast pace.
                </p>
                <div class="mt-6">
                  <NuxtLink
                    to="/projects"
                    class="inline-flex px-6 py-1 text-base font-medium text-white transition-transform rounded-full shadow-sm dark:text-gray-900 bg-gradient-to-r from-amber-300 to-amber-500 hover:scale-105"
                  >
                    View more
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="pt-6 mt-8 border-t border-gray-200">
              <blockquote>
                <div>
                  <p class="text-base text-gray-500 dark:text-gray-300">
                    &ldquo;The graphs on the dashboard give me a quick overview on how the business is doing with a
                    single glance. Genius!&rdquo;
                  </p>
                </div>
                <footer class="mt-3">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <img class="rounded-full w-7 h-7" src="/img/fishel.jpg" alt="Fishel" />
                    </div>
                    <div class="text-base font-medium text-gray-700 dark:text-gray-400">
                      Fishel, Digital Marketing Manager
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0">
            <div class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <nuxt-img
                src="/img/5dakkot-admin.jpg"
                placeholder
                class="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <div>
              <div>
                <span
                  class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-900 ring-brand ring-2"
                >
                  <icon name="color-swatch" class="text-amber-600 dark:text-amber-400 w-7" />
                </span>
              </div>
              <div class="mt-6">
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Clean & Modern UI Design
                </h2>
                <p class="mt-4 text-lg text-gray-500 dark:text-gray-300">
                  Let us do the UI design or bring your own. One thing we'll make sure - that your application gets a
                  modern and clean look, that stays delightful over passage of time & makes your users come back.
                </p>
                <div class="mt-6">
                  <NuxtLink
                    to="/timeline"
                    class="inline-flex px-6 py-1 text-base font-medium text-white transition-transform rounded-full shadow-sm dark:text-gray-900 bg-gradient-to-r from-amber-300 to-amber-500 hover:scale-105"
                  >
                    Read more
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                class="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/img/beit-alef-gallery.jpg"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div class="py-12">
              <div>
                <span
                  class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-900 ring-brand ring-2"
                >
                  <icon name="terminal" class="text-amber-600 dark:text-amber-400 w-7" />
                </span>
              </div>
              <div class="mt-6">
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                  Cutting Edge Technologies
                </h2>
                <p class="mt-4 text-lg text-gray-500 dark:text-gray-300">
                  We write software with the latest programming languages & frameworks. Our source code is versioned,
                  tested, built & securely deployed to the cloud by the worlds leading systems. For mission critical
                  applications, we can setup a separate staging environment for testing before deployment to production.
                </p>
                <div class="mt-6">
                  <NuxtLink
                    to="/articles"
                    class="inline-flex px-6 py-1 text-base font-medium text-white transition-transform rounded-full shadow-sm dark:text-gray-900 bg-gradient-to-r from-amber-300 to-amber-500 hover:scale-105"
                  >
                    Read more
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0">
            <div class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <nuxt-img
                src="/img/code.jpg"
                placeholder
                class="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technologies -->
    <div class="relative">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100 dark:from-gray-900"
      ></div>
      <div class="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p class="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase dark:text-gray-300">
          prefered technologies
        </p>
        <div class="flex flex-wrap items-center justify-center mt-6 md:space-x-12">
          <a href="https://laravel.com/" target="_blank" class="p-6 b-w">
            <img class="h-12" src="/logos/laravel.svg" alt="Laravel" />
          </a>
          <a href="https://tailwindcss.com/" target="_blank" class="p-6 b-w">
            <img class="h-7" src="/logos/tailwind.svg" alt="TailwindCSS" />
          </a>
          <a href="https://vuejs.org/" target="_blank" class="p-6 b-w">
            <img class="h-12" src="/logos/vue.svg" alt="Vue.js" />
          </a>
          <a href="https://inertiajs.com/" target="_blank" class="p-6 b-w">
            <img class="h-7" src="/logos/inertia.svg" alt="Inertia.js" />
          </a>
        </div>
      </div>
    </div>

    <!-- Blog Posts -->
    <div class="relative px-4 pt-16 pb-32 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Recent Articles
        </h2>
        <p class="max-w-2xl mx-auto mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
          Learnings and technical deep dives into programming
        </p>
      </div>

      <ul class="grid gap-8 mt-10 sm:grid-cols-3">
        <blog-card
          v-for="article in articles"
          :key="article._path"
          :article="article"
          class="relative flex flex-col overflow-hidden transition-shadow bg-white rounded-lg shadow dark:bg-gray-900 dark:bg-opacity-60 hover:shadow-xl bg-opacity-60 group"
        />
      </ul>
    </div>

    <contact />
  </div>
</template>

<script>
import Contact from '~/components/Contact.vue'
import BlogCard from '~/components/BlogCard.vue'

definePageMeta({ layout: 'landing' })

export default {
  name: 'Home',
  components: { Contact, BlogCard },
  async setup() {
    const articles = await queryContent('articles')
      .sort({ createdAt: -1 })
      .where({
        title: { $in: ['My PR was denied by Iranian Law', 'Teach Yourself Programming', 'The Luhn Algorithm'] },
      })
      .limit(3)
      .find()

    return { articles }
  },
}
</script>

<style lang="scss">
.b-w {
  opacity: 0.6;
  filter: grayscale(1);
  transition: filter 0.3s ease-in;
  transition: opacity 0.3s ease-in;
  &:hover {
    opacity: 1;
    filter: grayscale(0);
  }
}
.dark .b-w {
  filter: brightness(3) grayscale(1);
  &:hover {
    filter: brightness(1.3) grayscale(0);
  }
}
</style>
