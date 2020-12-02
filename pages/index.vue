<template>
  <div>
    <cover-image fixed />

    <div class="relative mt-24 text-center">
      <h1 class="text-4xl font-extrabold">Hey, I'm Yehuda</h1>
      <h4 class="mt-4 text-xl">
        I'm a designer and software developer, currently living in Jerusalem.
      </h4>
      <div class="flex justify-center mt-6 space-x-4">
        <nuxt-link to="/about" class="btn btn-lg">
          <octicon name="smiley" />
          <span class="ml-2">More about me</span>
        </nuxt-link>
        <nuxt-link to="/articles" class="btn btn-lg btn-brand">
          <octicon name="book" />
          <span class="ml-2">Writing</span>
        </nuxt-link
        >
      </div>
    </div>

    <section class="relative mt-32">
      <transition name="slideIn" appear>
        <ul class="max-w-2xl mx-auto">
          <timeline-item v-for="item in items" :key="item.path" :item="item" />
          <timeline-item
            :item="{}"
            icon-colors="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-100"
            last
          >
            <template v-slot:icon>
              <octicon name="shield-lock" />
            </template>
            <template v-slot:header>
              <h4 class="font-bold">
                That's it for now
                <octicon
                  name="light-bulb"
                  class="ml-0.5 text-size text-brand"
                />
              </h4>
              <p class="text-xs text-gray-500">Work in progress...</p>
            </template>
            <i></i>
          </timeline-item>
        </ul>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  head: {
    title: "Home | Yiddishe Kop",
  },
  async asyncData({ $content }) {
    const items = await $content("/", {
      deep: true,
    })
      .sortBy("createdAt", "desc")
      .fetch();

    return {
      items,
    };
  },
};
</script>
