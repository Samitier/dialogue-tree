import { CharacterParameters } from '../models/character-parameters'
import { defaultNodeId, DialogueTree } from '../models/dialogue-tree'

export const state = {
  characterParameters: [] as CharacterParameters[],
  dialogueTree: [] as DialogueTree,
  currentDialogueNodeId: defaultNodeId,
  currentCharacterLineIndex: 0
}

export type State = typeof state
