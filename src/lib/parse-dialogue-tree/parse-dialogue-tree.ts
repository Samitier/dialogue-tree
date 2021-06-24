import { DialogueTree, defaultNodeId } from '../models/dialogue-tree'

export function parseDialogueTree(rawText: string): DialogueTree {
  const splittedText = splitByEndline(rawText)
  const dialogueTree: DialogueTree = []

  for (const rawStatement of splittedText) {
    const statement = rawStatement.trim()
    if (!statement) continue

    if (isCommand(statement)) {
      dialogueTree.push({
        id: statement,
        dialogue: [],
        continuesAt: ''
      })
      continue
    }

    if (!dialogueTree.length) {
      if (isDialogue(statement, rawStatement)) {
        throw new Error(
          'The text should start with [INTRO] or with a character name.'
        )
      } else
        dialogueTree.push({
          id: defaultNodeId,
          dialogue: [
            {
              character: statement,
              lines: ''
            }
          ],
          continuesAt: ''
        })
      continue
    }

    const currentNode = dialogueTree[dialogueTree.length - 1]

    if (isDialogue(statement, rawStatement)) {
      const dialogue =
        currentNode.dialogue[currentNode.dialogue.length - 1]
      if (hasContinueCommand(statement)) {
        const { line, continuesAt } = getLineAndContinue(statement)
        dialogue.lines += `${line}\n`
        currentNode.continuesAt = continuesAt
      } else dialogue.lines += `${statement}\n`
    } else {
      currentNode.dialogue.push({
        character: statement,
        lines: ''
      })
    }
  }

  return dialogueTree
}

function splitByEndline(text: string) {
  return text.split('\n')
}

function isCommand(text: string) {
  return text.startsWith('[')
}

function isDialogue(text: string, rawText: string) {
  return text.length !== rawText.length
}

function hasContinueCommand(text: string) {
  return text.endsWith(']')
}

function getLineAndContinue(text: string) {
  const [continuesAt] = text.match(/\[(.*)\]/g) as [string]
  return {
    line: text.replace(continuesAt, '').trim(),
    continuesAt
  }
}
