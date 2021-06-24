<template>
  <div class="container">
    <pixelized-background />
    <dialogue-box v-if="hasLines" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from 'vue'
import DialogueBox from './dialogue-box.vue'
import PixelizedBackground from './pixelized-background.vue'
import { parseDialogueTree } from '../parse-dialogue-tree/parse-dialogue-tree'
import { AudioOption } from '../models/audio-options'
import { useStore } from 'vuex'
import { Mutations } from '../store/mutations'
import { Store } from '../store'

export default defineComponent({
  components: { DialogueBox, PixelizedBackground },
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

    const hasLines = computed(() => !!store.getters.currentCharacterLines)
    return { hasLines }
  }
})
</script>

<style scoped>
.container {
  margin: 1rem;
  position: relative;
  width: 45rem;
  height: 30rem;
  border: 5px solid black;
  border-radius: 5px;
}

@media (max-width: 45rem) {
  .container {
    transform: scale(0.5);
  }
}
</style>
