<template>
  <div class="relative">
    <div
      aria-hidden="true"
      class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100 dark:from-gray-900"
    ></div>
    <div class="lg:absolute lg:inset-0">
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <nuxt-img
          class="object-cover w-full h-56 lg:absolute lg:h-full"
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixqx=ydNePrXipm&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
          alt=""
        />
      </div>
    </div>
    <div class="relative px-4 pt-12 pb-16 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
      <div class="lg:pr-8">
        <div class="max-w-md mx-auto sm:max-w-lg lg:mx-0">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Let's work together</h2>
          <p class="mt-4 text-lg text-gray-500 dark:text-gray-400 sm:mt-3">
            We’d love to hear from you! Send us a message using the form below, and we'll get back to you.
          </p>
          <form @submit.prevent="submit" class="grid grid-cols-1 mt-9 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >First name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autocomplete="given-name"
                  v-model="form.first_name"
                  class="form-input"
                  :class="{ invalid: !!error && !form.first_name }"
                />
              </div>
            </div>
            <div>
              <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >Last name</label
              >
              <div class="mt-1">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autocomplete="family-name"
                  v-model="form.last_name"
                  class="form-input"
                  :class="{ invalid: !!error && !form.last_name }"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  v-model="form.email"
                  class="form-input"
                  :class="{ invalid: !!error && !form.email }"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Company</label>
                <span id="company_description" class="text-sm text-gray-500 dark:text-gray-400">Optional</span>
              </div>
              <div class="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autocomplete="organization"
                  aria-describedby="company_description"
                  v-model="form.company"
                  class="form-input"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
                <span id="phone_description" class="text-sm text-gray-500 dark:text-gray-400">Optional</span>
              </div>
              <div class="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  v-model="form.phone"
                  autocomplete="tel"
                  aria-describedby="phone_description"
                  class="form-input"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label for="how_can_we_help" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >How can we help you?</label
                >
                <span id="how_can_we_help_description" class="text-sm text-gray-500 dark:text-gray-400"
                  >Max. 500 characters</span
                >
              </div>
              <div class="mt-1">
                <textarea
                  id="how_can_we_help"
                  name="how_can_we_help"
                  aria-describedby="how_can_we_help_description"
                  :class="{ invalid: !!error && !form.message }"
                  rows="4"
                  v-model="form.message"
                  class="form-input"
                ></textarea>
              </div>
            </div>
            <!-- <fieldset class="sm:col-span-2">
              <legend class="block text-sm font-medium text-gray-700 dark:text-gray-200">Expected budget</legend>
              <div class="grid grid-cols-1 mt-4 gap-y-4">
                <div class="flex items-center">
                  <input
                    id="budget_under_25k"
                    name="budget"
                    value="under_25k"
                    type="radio"
                    v-model="form.budget"
                    :class="{ invalid: !!error && !form.budget }"
                    class="form-radio"
                  />
                  <label for="budget_under_25k" class="ml-3">
                    <span class="block text-sm text-gray-700 dark:text-gray-200">Less than $25K</span>
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="budget_25k-50k"
                    name="budget"
                    value="25k-50k"
                    type="radio"
                    v-model="form.budget"
                    class="form-radio"
                  />
                  <label for="budget_25k-50k" class="ml-3">
                    <span class="block text-sm text-gray-700 dark:text-gray-200">$25K – $50K</span>
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="budget_50k-100k"
                    name="budget"
                    value="50k-100k"
                    type="radio"
                    v-model="form.budget"
                    class="form-radio"
                  />
                  <label for="budget_50k-100k" class="ml-3">
                    <span class="block text-sm text-gray-700 dark:text-gray-200">$50K – $100K</span>
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="budget_over_100k"
                    name="budget"
                    v-model="form.budget"
                    value="over_100k"
                    type="radio"
                    class="form-radio"
                  />
                  <label for="budget_over_100k" class="ml-3">
                    <span class="block text-sm text-gray-700 dark:text-gray-200">$100K+</span>
                  </label>
                </div>
              </div>
            </fieldset> -->
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label
                  for="how_did_you_hear_about_us"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >How did you hear about us?</label
                >
                <span id="heard_description" class="text-sm text-gray-500 dark:text-gray-400">Optional</span>
              </div>
              <div class="mt-1">
                <input
                  type="text"
                  name="how_did_you_hear_about_us"
                  v-model="form.lead"
                  id="how_did_you_hear_about_us"
                  aria-describedby="heard_description"
                  class="form-input"
                />
              </div>
            </div>
            <quote v-if="error || success" :type="error ? 'danger' : 'info'" class="sm:col-span-2">
              {{ error || success }}
            </quote>
            <loader v-if="loading" class="sm:col-span-2" />
            <div v-else class="text-right sm:col-span-2">
              <button
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm dark:text-gray-900 bg-brand hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'Contact',
  components: { Loader },
  data() {
    return {
      form: {},
      error: '',
      success: '',
      loading: false,
    }
  },
  methods: {
    async submit() {
      if (!this.form.first_name || !this.form.last_name || !this.form.email || !this.form.message) {
        this.error = 'Please fill out the required fields'
        return
      }
      this.loading = true
      const URL = this.$config.contactFormSubmissionUrl
      const data = await $fetch(URL, {
        method: 'POST',
        body: this.form,
      })
      if (data == 'success') {
        this.loading = false
        this.error = ''
        this.form = {}
        this.success = 'Thanks for you submission. We hope to get in touch with you soon!'
      } else {
        this.loading = false
        this.error = 'Please fill out the required fields'
      }
    },
  },
}
</script>

<style lang="scss">
.form-input {
  @apply block w-full border-gray-300 border-2 focus:ring-2 bg-white dark:border-gray-500 dark:bg-gray-900 rounded-md shadow-sm sm:text-sm focus:ring-amber-500 focus:border-amber-500;
}
.form-radio {
  @apply w-4 h-4 border-gray-300 dark:border-gray-400 dark:ring-offset-gray-900 dark:bg-gray-900 text-amber-600 focus:ring-amber-500;
}
.invalid {
  @apply ring-2 ring-offset-1 dark:ring-offset-gray-500 ring-red-400;
}
</style>
