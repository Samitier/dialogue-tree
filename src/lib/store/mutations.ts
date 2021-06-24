import { MutationTree } from 'vuex'
import { State } from './state'
import { AudioOption } from '../models/audio-options'
import { DialogueTree } from '../models/dialogue-tree'

export enum Mutations {
  addAudioOptions = 'addAudioOptions',
  addDialogueTree = 'addDialogueTree',
  setCurrentCharacterIndex = 'setCurrentCharacterIndex'
}

export const mutations: MutationTree<State> = {
  [Mutations.addAudioOptions](state, audioOptions: AudioOption[] = []) {
    state.audioOptions = audioOptions
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
