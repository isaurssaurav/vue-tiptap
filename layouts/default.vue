
<template>
  <div class="h-full">
    <main class="main-container">
      <SideBar
        :show="showSidebar"
        :toggleSidebar="toggleSidebar"
        :isDark="isDark"
      />

      <button @click="toggleSidebar" class="text-lg">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>

      <Nuxt />
    </main>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      isDark: true,
      showSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>

<style scoped>
.main-container {
  @apply px-20 py-5 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 h-full;
}
</style>

