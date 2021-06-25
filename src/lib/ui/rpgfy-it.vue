<template>
  <div class="container">
    <pixelized-background />
    <dialogue-box v-if="hasLines" :text-velocity="textVelocity" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from 'vue'
import DialogueBox from './dialogue-box.vue'
import PixelizedBackground from './pixelized-background.vue'
import { parseDialogueTree } from '../parse-dialogue-tree/parse-dialogue-tree'
import { CharacterParameters } from '../models/character-parameters'
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
    characterParameters: {
      type: Array as PropType<CharacterParameters[]>,
      default: () => []
    },
    textVelocity: {
      // Fixme this should be more usable
      type: Number,
      default: 25
    }
  },
  setup(props) {
    const store: Store = useStore()

    onMounted(async () => {
      const text = await fetch(props.scriptFile).then((response) =>
        response.text()
      )
      store.commit(
        Mutations.addCharacterParameters,
        props.characterParameters
      )
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
