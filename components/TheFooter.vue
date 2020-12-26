<template>
  <footer class="w-full max-w-full px-3 py-8 mx-auto mt-8 sm:max-w-2xl">
    <div class="w-32 h-0.5 rounded-full bg-brand" />
    <ul class="flex items-center mt-4 space-x-4">
      <li>
        <a href="https://github.com/yiddishe-kop" target="_blank" class="block rounded-full">
          <octicon name="mark-github" class="w-6" title="GitHub" />
        </a>
      </li>
      <li>
        <a href="mailto:yehuda@yiddishe-kop.com" target="_blank" class="block">
          <octicon name="mail" class="w-6" title="Email" />
        </a>
      </li>
    </ul>
    <p class="flex items-center mt-4 space-x-2 text-gray-500">
      <icon name="copyright" class="w-6" />
      <span>2020 Yehuda Neufeld</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      links: [{}],
    };
  },
};
</script>
