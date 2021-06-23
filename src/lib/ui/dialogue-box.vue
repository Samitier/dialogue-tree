<template>
  <div class="dialogue">
    <div v-if="currentCharacter" class="character-name">
      {{ currentCharacter }}
    </div>
    <div class="dialogue-box" @click="onNextLine">
      {{ currentLines }}
    </div>
    <img
      v-if="hasFinishedScrolling"
      src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUAQMAAACgZR+HAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAGElEQVR4nGNgIAX8YGCowUr8P8D/BycBADYgGAGi2z2EAAAAAElFTkSuQmCC"
      alt=""
      class="continue-icon"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive
} from 'vue'
import { DialogueTree } from '../parse-dialogue-tree/dialogue-tree.model'

const textVelocity = 15
const maxChars = 110

export default defineComponent({
  props: {
    dialogueTree: {
      type: Object as PropType<DialogueTree>,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      currentDialogueNodeId: '[INTRO]',
      currentCharacterLineIndex: 0,
      charCount: 0,
      lineCount: 0,
      interval: 0
    })

    const currentNode = computed(() =>
      props.dialogueTree.find((d) => d.id === state.currentDialogueNodeId)
    )

    const currentCharacterLine = computed(
      () => currentNode.value?.dialogue[state.currentCharacterLineIndex]
    )

    const currentCharacter = computed(() =>
      currentCharacterLine.value?.character.toLowerCase()
    )

    const splittedLines = computed(() => {
      if (!currentCharacterLine.value) return
      const lines = currentCharacterLine.value.lines
      const splittedLines = []
      let i = 0
      while (i < lines.length) {
        let splitIndex =
          lines.substring(i, i + maxChars).lastIndexOf(' ') + i
        if (i + maxChars > lines.length) splitIndex = lines.length
        splittedLines.push(lines.substring(i, splitIndex))
        i = splitIndex
      }
      return splittedLines
    })

    const currentLines = computed(() => {
      if (!splittedLines.value) return ''
      return splittedLines.value[state.lineCount].substring(
        0,
        state.charCount
      )
    })

    const hasFinishedScrolling = computed(() => {
      if (!splittedLines.value) return false
      return state.charCount >= splittedLines.value[state.lineCount].length
    })

    onMounted(() => {
      state.interval = setInterval(() => {
        if (!hasFinishedScrolling.value) state.charCount++
      }, textVelocity)
    })
    onUnmounted(() => clearInterval(state.interval))

    function onNextLine() {
      if (
        !currentNode.value ||
        !splittedLines.value ||
        !hasFinishedScrolling.value
      )
        return
      state.lineCount++
      state.charCount = 0
      if (state.lineCount === splittedLines.value.length) {
        state.lineCount = 0
        state.currentCharacterLineIndex++
        if (
          state.currentCharacterLineIndex ===
          currentNode.value.dialogue.length
        ) {
          state.currentDialogueNodeId = currentNode.value.continuesAt
          state.currentCharacterLineIndex = 0
        }
      }
    }

    return {
      currentLines,
      currentCharacter,
      onNextLine,
      hasFinishedScrolling
    }
  }
})
</script>

<style scoped>
@font-face {
  font-family: 'pixelmix';
  src: url('/fonts/pixelmix.ttf') format('truetype');
}

.dialogue {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
}

.dialogue-box {
  font-family: 'pixelmix';
  background-color: black;
  color: #f8f8f8;
  padding: 0.4rem 2rem;
  line-height: 1.5;
  height: 4rem;
}

.character-name {
  font-family: 'pixelmix';
  background: #808080;
  color: #f8f8f8;
  padding: 0 0.3rem;
  line-height: 1.4;
  text-transform: capitalize;
  border: 2px solid #a0a0a0;
  box-shadow: 0 0 0 3px black;
  margin: 3px;
  width: 8rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  position: relative;
}

.continue-icon {
  position: absolute;
  right: 1.5rem;
  bottom: 0.6rem;
  width: 0.8rem;
  height: 0.5rem;
  animation: oscilate 0.8s alternate infinite;
}

@keyframes oscilate {
  from {
    transform: translateY(-20%);
  }
  to {
    transform: translateY(20%);
  }
}
</style>
