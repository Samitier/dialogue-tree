import { GetterTree } from 'vuex'
import { CharacterParameters } from '../models/character-parameters'
import { CharacterLines, DialogueNode } from '../models/dialogue-tree'
import { State } from './state'

export type Getters = {
  currentDialogueNode: DialogueNode | undefined
  currentCharacterLines: CharacterLines | undefined
  currentCharacterParameters: CharacterParameters | undefined
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
  currentCharacterParameters(state, getters: Getters) {
    return state.characterParameters.find(
      (a) =>
        a.character.toLowerCase() ===
        getters.currentCharacterLines?.character.toLowerCase()
    )
  }
}
