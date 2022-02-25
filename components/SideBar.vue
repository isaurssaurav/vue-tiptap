<template>
  <Transition name="slide-fade">
    <div class="sidebar-container" v-if="show">
      <button @click="toggleSidebar" class="absolute right-3 top-2">
        <span><font-awesome-icon :icon="['fas', 'xmark']" /></span>
      </button>
      <p class="text-2xl text-center mb-10">Settings</p>
      <!-- <div class="text-xl mb-3">Dark Mode</div>
      <div class="theme-switch-wrapper mb-5">
        <div class="flex gap-10 items-center">
          <label class="theme-switch" for="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              v-model="isDark"
              @change="handleChangeDarkMode"
            />
            <div class="slider round"></div>
          </label>
        </div>
      </div> -->
      <p class="text-xl mb-3">OpenAi</p>

      <div class="flex flex-col gap-2 mb-2">
        <div>Engine</div>

        <select
          class="input-setting"
          aria-label="Default select example"
          name="engine"
          :value="openAiConfig.engine"
          @change="updateOpenAiConfig"
        >
          <option value="text-davinci-001">text-davinci-001</option>
          <option value="text-curie-001">text-curie-001</option>
          <option value="text-babbage-001">text-babbage-001</option>
        </select>
      </div>

      <div class="flex flex-col gap-2 mb-2">
        <div class="flex justify-between">
          Temperature <span>{{ openAiConfig.temperature }}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          :value="openAiConfig.temperature"
          step="0.1"
          @change="updateOpenAiConfig"
          name="temperature"
          class="input-range-setting"
        />
      </div>

      <div class="flex flex-col gap-2 mb-2">
        <div class="flex justify-between">
          Response Length <span>{{ openAiConfig.max_tokens }}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2048"
          :value="openAiConfig.max_tokens"
          @change="updateOpenAiConfig"
          name="max_tokens"
          step="5"
          class="input-range-setting"
        />
      </div>
    </div>
  </Transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["openAiConfig"]),
  },
  props: ["show", "toggleSidebar", "isDark"],
  methods: {
    handleChangeDarkMode(e) {
      const mode = e.target.checked ? "dark" : "light";
      this.$colorMode.preference = mode;
    },
    updateOpenAiConfig(e) {
      this.$store.dispatch("SAVE_OPENAI_CONFIG", {
        [e.target.name]: e.target.value,
      });
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
.input-setting {
  @apply appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none;
}
.input-range-setting {
  @apply w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none;
}
.sidebar-container {
  @apply absolute top-0 left-0 w-1/4 h-full dark:bg-gray-200 bg-gray-800 dark:text-gray-900 text-gray-200 z-20 p-10;
}
</style>