<template>
  <li class="flex">
    <div class="flex flex-col items-center">
      <div class="p-2 my-1 rounded-full" :class="iconColors || iconColor">
        <slot name="icon">
          <icon :name="icon" class="w-6" />
        </slot>
      </div>
      <i v-if="!last" class="flex-1 w-px bg-gray-400 dark:bg-gray-500"></i>
    </div>

    <div class="flex-1 mb-10 ml-6">
      <header class="text-sm leading-6">
        <slot name="header">
          <h4 class="font-bold">{{ header }}</h4>
          <p v-if="item.createdAt" class="text-xs text-gray-500" :title="new Date(item.createdAt).toUTCString()">
            {{ timeAgo(item.createdAt) }}
          </p>
        </slot>
      </header>
      <div class="relative mt-3">
        <slot>
          <feature-item v-if="itemType == 'feature'" :feature="item" />
          <open-source-item v-else-if="itemType == 'open-source'" :item="item" />
          <design-item v-else-if="itemType == 'design'" :design="item" />
          <photography-item v-else-if="itemType == 'photography'" :item="item" :horizontal="item.horizontal" />
          <project-item v-else-if="itemType == 'project'" :item="item" />
          <blog-item v-else-if="itemType == 'article'" :item="item" class="wow" />
        </slot>
      </div>
    </div>
  </li>
</template>

<script>
import { timeAgo } from '~/lib/filters'

export default {
  name: 'TimelineItem',
  props: {
    item: Object,
    iconColors: String,
    last: Boolean,
  },
  computed: {
    itemType() {
      if (this.item.type) return this.item.type

      if (this.item._path.startsWith('/projects')) return 'project'
      if (this.item._path.startsWith('/articles')) return 'article'
      if (this.item._path.startsWith('/designs')) return 'design'
      if (this.item._path.startsWith('/photography')) return 'photography'
    },
    icon() {
      switch (this.itemType) {
        case 'project':
          return 'bookmark'
        case 'article':
          return 'news'
        case 'design':
          return 'bulb'
        case 'photography':
          return 'camera'
        case 'open-source':
          return 'terminal'
        case 'feature':
          return 'hot'
        default:
          return 'book'
      }
    },
    iconColor() {
      switch (this.itemType) {
        case 'project':
          return 'text-red-500 bg-red-100 dark:text-red-200 dark:bg-red-700'
        case 'article':
          return 'text-gray-500 bg-gray-200 dark:text-gray-200 dark:bg-gray-700'
        case 'design':
          return 'text-amber-500 bg-amber-100 dark:text-amber-200 dark:bg-amber-700'
        case 'photography':
          return 'text-pink-500 bg-pink-100 dark:text-pink-200 dark:bg-pink-700'
        case 'open-source':
          return 'text-green-500 bg-green-100 dark:text-green-200 dark:bg-green-700'
        case 'feature':
          return 'text-amber-500 bg-amber-100 dark:text-amber-200 dark:bg-amber-700'
        default:
          return 'book'
      }
    },
    header() {
      switch (this.itemType) {
        case 'project':
          return 'New project'
        case 'article':
          return 'Published new post'
        case 'design':
          return 'Graphic Design'
        case 'photography':
          return 'Photography'
        case 'open-source':
          return 'Open source work'
        case 'feature':
          return 'Coded new feature'
        default:
          return 'book'
      }
    },
  },
  methods: {
    timeAgo,
  },
}
</script>
