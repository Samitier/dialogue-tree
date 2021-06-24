import { GetterTree } from 'vuex'
import { AudioOption } from '../models/audio-options'
import { CharacterLines, DialogueNode } from '../models/dialogue-tree'
import { State } from './state'

export type Getters = {
  currentDialogueNode: DialogueNode | undefined
  currentCharacterLines: CharacterLines | undefined
  currentCharacterAudioOptions: AudioOption | undefined
}

export const getters: GetterTree<State, State> = {
  currentDialogueNode(state) {
    return state.dialogueTree.find(
      (d) => d.id === state.currentDialogueNodeId
    )
  },
  currentCharacterLines(state, getters: Getters) {
    return getters.currentDialogueNode?.dialogue[
      state.currentCharacterLineIndex
    ]
  },
  currentCharacterAudioOptions(state, getters: Getters) {
    return state.audioOptions.find(
      (a) =>
        a.character.toLowerCase() ===
        getters.currentCharacterLines?.character.toLowerCase()
    )
  }
}
