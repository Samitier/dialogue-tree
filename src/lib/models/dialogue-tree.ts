export type DialogueTree = DialogueNode[]

export type DialogueNode = {
  id: string
  dialogue: CharacterLines[]
  continuesAt: string
}

export type CharacterLines = {
  character: string
  lines: string
}

export const defaultNodeId = '[INTRO]'
