<template>
  <div>
    <cover-image fixed />

    <div class="relative mt-24 text-center">
      <h1 class="text-4xl font-extrabold">Hey, I'm Yehuda</h1>
      <h4 class="mt-4 text-xl">
        I'm a designer and software developer, currently living in Jerusalem.
      </h4>
      <div class="flex justify-center mt-6 space-x-4">
        <nuxt-link to="/about" class="btn btn-lg">More about me</nuxt-link>
        <nuxt-link to="/articles" class="btn btn-lg btn-brand"
          >Writing</nuxt-link
        >
      </div>
    </div>

    <section class="relative mt-32">
      <ul class="">
        <li v-for="item in items" :key="item.path" class="flex">
          <div class="flex flex-col items-center">
            <div class="p-2 my-1 rounded-full" :class="getIconColor(item)">
              <icon :name="getIcon(item)" class="w-6" />
            </div>
            <i class="flex-1 w-px bg-gray-300 dark:bg-gray-600"></i>
          </div>

          <div class="flex-1 mb-10 ml-6">
            <header class="text-sm">
              <h4 class="font-bold">{{ getHeader(item) }}</h4>
              <p class="text-gray-500">{{ item.createdAt | date }}</p>
            </header>
            <div class="relative mt-3">
              <feature-item v-if="item.type == 'feature'" :feature="item" />
              <open-source-item
                v-else-if="item.type == 'open-source'"
                :item="item"
              />
              <blog-item v-else :item="item" />
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { date } from "~/plugins/filters";

export default {
  name: "Home",
  head: {
    title: "Home | Yiddishe Kop",
  },
  filters: { date },
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
  methods: {
    getIcon(item) {
      switch (item.type) {
        case "feature":
          return "hot";
          break;
        case "open-source":
          return "terminal";
          break;

        default:
          if (item.dir == "/projects") {
            return "bookmark";
          } else if (item.dir == "/articles") {
            return "news";
          }
          break;
      }
    },
    getIconColor(item) {
      switch (item.type) {
        case "feature":
          return "text-amber-500 bg-amber-100 dark:text-amber-200 dark:bg-amber-700";
          break;
        case "open-source":
          return "text-green-500 bg-green-100 dark:text-green-200 dark:bg-green-700";
          break;

        default:
          if (item.dir == "/projects") {
            return "text-red-500 bg-red-100 dark:text-red-200 dark:bg-red-700";
          } else if (item.dir == "/articles") {
            return "text-gray-500 bg-gray-200 dark:text-gray-200 dark:bg-gray-700";
          }
          break;
      }
    },
    getHeader(item) {
      switch (item.type) {
        case "feature":
          return "Coded a new feature";
          break;
        case "open-source":
          return "Open source work";
          break;

        default:
          if (item.dir == "/projects") {
            return "New project";
          } else if (item.dir == "/articles") {
            return "Published new post";
          }
          break;
      }
    },
  },
};
</script>
