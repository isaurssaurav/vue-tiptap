<template>
  <div class="h-full overflow-scroll">
    <EditorHeader :editor="editor" />
    
    <editor-content
      :editor="editor"
      class="
        p-3
        border-green-50 border-1
        rounded-sm
        bg-gray-300
        dark:bg-gray-700
        h-full
        border-neutral-300
      "
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import EditorHeader from "@/components/Editor/EditorHeader";
import Placeholder from "@tiptap/extension-placeholder";

export default {
  components: {
    EditorContent,
    EditorHeader,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value;

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "Start writing here...",
        }),
      ],
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML());
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
