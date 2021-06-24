import { MutationTree } from 'vuex'
import { State } from './state'
import { DialogueTree } from '../models/dialogue-tree'
import { CharacterParameters } from '../models/character-parameters'

export enum Mutations {
  addCharacterParameters = 'addCharacterParameters',
  addCharacterPortraits = 'addCharacterPortraits',
  addDialogueTree = 'addDialogueTree',
  setCurrentCharacterIndex = 'setCurrentCharacterIndex'
}

export const mutations: MutationTree<State> = {
  [Mutations.addCharacterParameters](
    state,
    characterParameters: CharacterParameters[] = []
  ) {
    state.characterParameters = characterParameters
  },
  [Mutations.addDialogueTree](state, dialogueTree: DialogueTree = []) {
    state.dialogueTree = dialogueTree
  },
  [Mutations.setCurrentCharacterIndex](
    state,
    currentCharacterIndex: number
  ) {
    state.currentCharacterLineIndex = currentCharacterIndex
  }
}
