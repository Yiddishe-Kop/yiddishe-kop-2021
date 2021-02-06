<template>
  <li class="flex">
    <div class="flex flex-col items-center">
      <div
        class="p-2 my-1 rounded-full"
        :class="iconColors || getIconColor(item)"
      >
        <slot name="icon">
          <icon :name="getIcon(item)" class="w-6" />
        </slot>
      </div>
      <i v-if="!last" class="flex-1 w-px bg-gray-400 dark:bg-gray-500"></i>
    </div>

    <div class="flex-1 mb-10 ml-6">
      <header class="text-sm leading-6">
        <slot name="header">
          <h4 class="font-bold">{{ getHeader(item) }}</h4>
          <p
            v-if="item.createdAt"
            class="text-xs text-gray-500"
            :title="new Date(item.createdAt).toUTCString()"
          >
            {{ item.createdAt | timeAgo }}
          </p>
        </slot>
      </header>
      <div class="relative mt-3">
        <slot>
          <feature-item v-if="item.type == 'feature'" :feature="item" />
          <open-source-item
            v-else-if="item.type == 'open-source'"
            :item="item"
          />
          <design-item v-else-if="item.path == '/designs'" :design="item" />
          <photography-item v-else-if="item.path == '/photography'" :item="item" />
          <project-item v-else-if="item.dir == '/projects'" :item="item" />
          <blog-item v-else :item="item" class="wow" />
        </slot>
      </div>
    </div>
  </li>
</template>

<script>
import { timeAgo } from "~/plugins/filters";

export default {
  name: "TimelineItem",
  props: {
    item: Object,
    iconColors: String,
    last: Boolean,
  },
  filters: { timeAgo },
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
          } else if (item.path == "/designs") {
            return "bulb";
          } else if (item.path == "/photography") {
            return "camera";
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
          } else if (item.path == "/designs") {
            return "text-amber-500 bg-amber-100 dark:text-amber-200 dark:bg-amber-700";
          } else if (item.path == "/photography") {
            return "text-pink-500 bg-pink-100 dark:text-pink-200 dark:bg-pink-700";
          }
          break;
      }
    },
    getHeader(item) {
      switch (item.type) {
        case "feature":
          return "Coded new feature";
          break;
        case "open-source":
          return "Open source work";
          break;

        default:
          if (item.dir == "/projects") {
            return "New project";
          } else if (item.dir == "/articles") {
            return "Published new post";
          } else if (item.path == "/designs") {
            return "Graphic Design";
          } else if (item.path == "/photography") {
            return "Photography";
          }
          break;
      }
    },
  },
};
</script>

<style>
</style>
