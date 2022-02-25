<template>
  <button
    @click="onClick"
    :class="{ 'text-blue-500 dark:text-black': isActive }"
  >
    <font-awesome-icon :icon="['fas', icon]" />
  </button>
</template>

<script>
export default {
  props: ["onClick", "isActive", "icon"],
};
</script>

<style lang="scss" scoped>
</style>