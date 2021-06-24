<template>
  <div class="container">
    <dialogue-box />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'
import DialogueBox from './dialogue-box.vue'
import { parseDialogueTree } from '../parse-dialogue-tree/parse-dialogue-tree'
import { AudioOption } from '../models/audio-options'
import { useStore } from 'vuex'
import { Mutations } from '../store/mutations'
import { Store } from '../store'

export default defineComponent({
  components: { DialogueBox },
  props: {
    scriptFile: {
      type: String,
      required: true
    },
    audioOptions: {
      type: Array as PropType<AudioOption[]>,
      default: () => []
    }
  },
  setup(props) {
    const store: Store = useStore()

    onMounted(async () => {
      const text = await fetch(`/assets/${props.scriptFile}`).then(
        (response) => response.text()
      )
      store.commit(Mutations.addAudioOptions, props.audioOptions)
      store.commit(Mutations.addDialogueTree, parseDialogueTree(text))
    })
  }
})
</script>

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
