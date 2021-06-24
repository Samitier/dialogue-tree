import { AudioOption } from '../models/audio-options'
import { defaultNodeId, DialogueTree } from '../models/dialogue-tree'

export const state = {
  audioOptions: [] as AudioOption[],
  dialogueTree: [] as DialogueTree,
  currentDialogueNodeId: defaultNodeId,
  currentCharacterLineIndex: 0
}

export type State = typeof state
