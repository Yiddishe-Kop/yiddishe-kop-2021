<template>
  <div class="">
    <label :for="id" class="text-xs font-bold">{{ label }}</label>
    <component
      :is="type == 'textarea' ? 'textarea' : 'input'"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      :type="type || 'text'"
      :id="id"
      class="my-input"
    />
    <p v-if="help" class="text-xs text-gray-500">{{ help }}</p>
    <p v-if="errors.length" class="text-xs text-red-600">{{ errors[0] }}</p>
  </div>
</template>

<script>
export default {
  name: "Field",
  inheritAttrs: false,
  props: {
    type: String,
    value: String | Number | Boolean,
    label: String,
    help: String,
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this.label + (Math.random() * 100).toFixed(4);
  },
};
</script>

<style>
.my-input {
  @apply bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm border border-gray-300 dark:border-gray-600;
  appearance: none;
  border-radius: 0.3em;
  box-sizing: border-box;
  padding: 0.4em 0.6em;
  display: block;
  width: 100%;
  font-weight: 400;
  line-height: 1em;
  margin: 0;
}

.my-input::placeholder {
  @apply text-gray-300;
  line-height: normal;
}

.my-input:focus {
  box-shadow: 0 0 0 3px #ffb30036;
  @apply outline-none border-brand;
}
</style>
