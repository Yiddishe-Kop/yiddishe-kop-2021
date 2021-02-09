<template>
  <div class="pt-32 bg-white">
    <!-- Hero section -->
    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2"></div>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div class="absolute inset-0">
            <nuxt-picture
              src="/img/rainbow.jpg"
              placeholder
              class="w-full h-full"
            />
          </div>
          <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1
              class="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl"
            >
              <span
                class="block text-xl font-semibold tracking-widest text-center text-white uppercase"
                >We build</span
              >
              <span class="block text-brand">cutting edge</span>
              <span class="block text-white">software</span>
            </h1>
            <p
              class="max-w-lg mx-auto mt-6 text-xl text-center text-white sm:max-w-3xl"
            >
              We're not the typical site builder. We don't take shortcuts.<br />We
              build bespoke software from the ground up to exactly solve your
              challenges.<br />
              We code your ideas into sophisticated machinery.
            </p>
          </div>
        </div>
        <!-- <div class="relative flex justify-center -mt-52">
          <img
            class="object-contain w-3/4 h-full"
            src="/img/vscode.png"
            alt="Code open in a code editor"
          />
        </div> -->
      </div>
    </div>

    <!-- Logo Cloud -->
    <div class="bg-gray-100">
      <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p
          class="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase"
        >
          Trusted by great businesses
        </p>
        <div
          class="flex flex-wrap items-center justify-center mt-6 md:justify-between"
        >
          <img
            class="h-12 m-6 b-w"
            src="/logos/halpern.svg"
            alt="Halpern Insurance"
          />

          <img class="h-12 m-6 b-w" src="/logos/beitalef.svg" alt="Beit Alef" />

          <img class="h-12 m-6 b-w" src="/logos/jkaraoke.svg" alt="jKaraoke" />

          <img class="h-12 m-6 b-w" src="/logos/5dakkot.svg" alt="5Dakkot" />

          <img
            class="h-12 m-6 b-w"
            src="/logos/silverspoon.svg"
            alt="Silverspoon"
          />
        </div>
      </div>
    </div>

    <!-- Alternating Feature Sections -->
    <div class="relative pt-16 pb-32 lg:overflow-hidden">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
      ></div>
      <div class="relative">
        <div
          class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
        >
          <div
            class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0"
          >
            <div>
              <div>
                <span
                  class="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-amber-300 to-amber-500"
                >
                  <icon name="dashboard" class="text-white w-7" />
                </span>
              </div>
              <div class="mt-6">
                <h2
                  class="text-3xl font-extrabold tracking-tight text-gray-900"
                >
                  Buttery Smooth Applications
                </h2>
                <p class="mt-4 text-lg text-gray-500">
                  We create buttery smooth & fast applications, that is a joy to
                  use, and instead of slowing you down, keeps up with your fast
                  pace.
                </p>
                <div class="mt-6">
                  <a
                    href="#"
                    class="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600"
                  >
                    View more
                  </a>
                </div>
              </div>
            </div>
            <div class="pt-6 mt-8 border-t border-gray-200">
              <blockquote>
                <div>
                  <p class="text-base text-gray-500">
                    &ldquo;The graphs on the dashboard give me a quick overview
                    on how the business is doing with a single glance.
                    Genius!&rdquo;
                  </p>
                </div>
                <footer class="mt-3">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <img
                        class="rounded-full w-7 h-7"
                        src="/img/fishel.jpg"
                        alt="Fishel"
                      />
                    </div>
                    <div class="text-base font-medium text-gray-700">
                      Fishel, Digital Marketing Manager
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0">
            <div
              class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
            >
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
        <div
          class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
        >
          <div
            class="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2"
          >
            <div>
              <div>
                <span
                  class="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-amber-300 to-amber-500"
                >
                  <icon name="color-swatch" class="text-white w-7" />
                </span>
              </div>
              <div class="mt-6">
                <h2
                  class="text-3xl font-extrabold tracking-tight text-gray-900"
                >
                  Clean & Modern UI Design
                </h2>
                <p class="mt-4 text-lg text-gray-500">
                  Let us do the UI design or bring your own. One thing we'll
                  make sure - that your application gets a modern and clean
                  look, that stays delightful over passage of time & makes your
                  users come back.
                </p>
                <div class="mt-6">
                  <a
                    href="#"
                    class="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-700 hover:to-amber-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div
              class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
            >
              <img
                class="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/img/beit-alef-gallery.jpg"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  head: {
    title: "Home | Yiddishe Kop",
  },
  layout: "landing",
};
</script>

<style>
.b-w {
  filter: grayscale(1);
  transition: filter 0.3s ease-in;
}
.b-w:hover {
  filter: grayscale(0);
}
</style>
