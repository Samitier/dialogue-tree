<template>
  <div class="container">
    <dialogue-box
      v-if="dialogueTree.length"
      :dialogue-tree="dialogueTree"
      :audio-options="[
        { character: 'VINCENT', frequency: 450, type: 'sine' },
        { character: 'JULES', frequency: 300, type: 'triangle' }
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { DialogueTree } from './lib/parse-dialogue-tree/dialogue-tree.model'
import { parseDialogueTree } from './lib/parse-dialogue-tree/parse-dialogue-tree'
import DialogueBox from './lib/ui/dialogue-box.vue'

export default defineComponent({
  components: { DialogueBox },
  setup() {
    const dialogueTree = ref<DialogueTree>([])
    onMounted(async () => {
      const text = await fetch('/assets/dialogue2.txt').then((response) =>
        response.text()
      )
      dialogueTree.value = parseDialogueTree(text)
      console.log(parseDialogueTree(text))
    })
    return { dialogueTree }
  }
})
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 1rem;
  position: relative;
  max-width: 45rem;
  max-height: 30rem;
  border: 1px solid gray;
  background-image: url('/pxArt.png');
  background-size: contain;
}
</style>
