<template>
  <div v-if="editor" class="editor-header">
    <button
      @click="editor.chain().focus().toggleBold().run()"
      class="hover-button"
      :class="{ 'active-menu': editor.isActive('bold') }"
    >
      <font-awesome-icon :icon="['fas', 'bold']" />
    </button>

    <button
      @click="editor.chain().focus().toggleItalic().run()"
      class="hover-button"
      :class="{ 'active-menu': editor.isActive('italic') }"
    >
      <font-awesome-icon :icon="['fas', 'italic']" />
    </button>

    <button
      @click="editor.chain().focus().toggleStrike().run()"
      class="hover-button"
      :class="{ 'active-menu': editor.isActive('strike') }"
    >
      <font-awesome-icon :icon="['fas', 'strikethrough']" />
    </button>

    <button
      @click="editor.chain().focus().toggleCode().run()"
      class="hover-button"
      :class="{ 'active-menu': editor.isActive('code') }"
    >
      <font-awesome-icon :icon="['fas', 'code']" />
    </button>

    <div class="flex items-center">
      <button @click="createCompletion" class="hover-button">
        <font-awesome-icon :icon="['fas', 'microchip']" />
      </button>
    </div>

    <OpenAIModal
      v-show="isOpenAIModalVisible"
      @close="closeModal"
      :text="responseFromOpenAI"
      @insertTextToEditor="insertToEditor"
      @refresh="createCompletion"
    />
  </div>
</template>

<script>
import HeaderButton from "./HeaderButton.vue";
import OpenAIModal from './OpenAIResponseModal'
import { mapState } from "vuex";

export default {
  data(){
    return {
      isOpenAIModalVisible:false,
      responseFromOpenAI:''
    }
  },
  props: ["editor"],
  computed: {
    ...mapState(["openAiConfig"]),
  },
  components: {
    HeaderButton,
    OpenAIModal
  },

  methods: {
    showModal() {
      this.isOpenAIModalVisible = true;
    },
    closeModal() {
      this.isOpenAIModalVisible = false;
    },
    async createCompletion() {
      const res = await fetch("/api/create-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: this.editor.getText(),
          ...this.openAiConfig,
        }),
      });

      const { result } = await res.json();
      this.responseFromOpenAI = result
      this.showModal()
    },

    insertToEditor(text){
      this.editor.chain().focus().insertContent(text).run()
      this.closeModal()
    },
    
  },
};
</script>

<style scoped>
.hover-button {
  @apply hover:text-blue-500 dark:hover:text-black;
}
.editor-header {
  @apply flex
      justify-start
      my-5
      bg-gray-300
      dark:bg-blue-500
      rounded-sm
      px-3
      py-2
      gap-6
      sticky
      top-0
      z-10;
}
.active-menu {
  @apply text-blue-500 dark:text-black;
}
</style>
