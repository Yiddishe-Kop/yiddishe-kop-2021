<template>
  <div class="flex flex-col min-h-screen pt-20 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
    <the-header />

    <div class="flex-1 w-full max-w-full px-3 pt-2 pb-6 mx-auto sm:max-w-screen-lg">
      <main>
        <!-- <nav class="relative z-50 hidden mr-14 sm:block">
          <ContentNavigation v-slot="{ navigation }" :query="articlesQuery">
            <div v-for="link of navigation" :key="link._path">
              <NuxtLink :to="link._path" class="block w-full p-1 font-medium">{{ link.title }}</NuxtLink>
              <ul v-if="link.children?.length" class="w-56">
                <li v-for="link in link.children" :key="link._path">
                  <NuxtLink
                    :to="link._path"
                    exact-active-class="bg-white border-l-4 border-brand"
                    class="block w-full px-2 py-1.5 text-xs truncate hover:bg-white/75 whitespace-nowrap"
                    >{{ link.title }}</NuxtLink
                  >
                </li>
              </ul>
            </div>
          </ContentNavigation>
        </nav> -->
        <slot />
      </main>
    </div>
    <the-footer />

    <lightbox />
  </div>
</template>

<script setup>
const articlesQuery = {
  where: [{ _path: /^\/articles/ }],
}
</script>
