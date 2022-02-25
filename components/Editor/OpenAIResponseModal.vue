<template>
    <div class="modal-backdrop">
    <div class="modal">
    
      <section class="modal-body bg-gray-200 dark:bg-gray-800">
        {{text}}

         <div class="flex justify-end gap-2 mt-3">
        <button
            @click="$emit('insertTextToEditor',text)"
            class="p-2 text-black bg-blue-500"
        >
         Insert To Editor
        </button>
         <button
            @click="$emit('refresh')"
            class="p-2 text-black bg-blue-500"
        >
         Regenrate
        </button>
        <button
          class="p-2 text-black bg-blue-500"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
       </section>

     
    </div>
  </div>

</template>

<script>
    export default {
        props:["close","text","insertTextToEditor","refresh"]
    }
</script>

<style lang="scss" scoped>

</style>