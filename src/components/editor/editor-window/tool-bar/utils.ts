import CodeMirror from 'codemirror'

export const replaceSelection = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void, replaceText: string): void => {
  const contentLines = content.split('\n')
  const replaceTextLines = replaceText.split('\n')
  const numberOfExtraLines = replaceTextLines.length - 1
  const selectionIncludeNewline = replaceText.includes('\n')
  if (startPosition.line === endPosition.line) {
    if (!selectionIncludeNewline) {
      contentLines[startPosition.line] = contentLines[startPosition.line].slice(0, startPosition.ch) + replaceText + contentLines[startPosition.line].slice(endPosition.ch)
    } else {
      for (let i = contentLines.length - 1; i > startPosition.line; i--) {
        contentLines[i + numberOfExtraLines] = contentLines[i]
      }
      const lastPart = contentLines[startPosition.line].slice(endPosition.ch)
      contentLines[startPosition.line] = contentLines[startPosition.line].slice(0, startPosition.ch) + replaceTextLines[0]
      for (let i = 0; i < numberOfExtraLines; i++) {
        contentLines[i + startPosition.line + 1] = replaceTextLines[i + 1]
      }
      contentLines[numberOfExtraLines + startPosition.line] += lastPart
    }
  }
  if (startPosition.line !== endPosition.line && startPosition.ch !== endPosition.ch) {
    for (let i = contentLines.length - 1; i > endPosition.line; i--) {
      contentLines[i + numberOfExtraLines] = contentLines[i]
    }
    for (let i = 0; i <= numberOfExtraLines; i++) {
      contentLines[i + startPosition.line] = replaceTextLines[i]
    }
  }
  onContentChange(contentLines.join('\n'))
}

export const extractSelection = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position): string => {
  if (startPosition.line === endPosition.line && startPosition.ch === endPosition.ch) {
    return ''
  }

  const lines = content.split('\n')

  if (startPosition.line === endPosition.line) {
    const selection = lines[startPosition.line].slice(startPosition.ch, endPosition.ch)
    return removeLastNewLine(selection)
  }

  let newSelection = lines[startPosition.line].slice(startPosition.ch) + '\n'
  for (let i = startPosition.line + 1; i <= endPosition.line; i++) {
    if (i === endPosition.line) {
      newSelection += lines[i].slice(0, endPosition.ch) + '\n'
    } else {
      newSelection += lines[i] + '\n'
    }
  }
  return removeLastNewLine(newSelection)
}

export const removeLastNewLine = (selection: string): string => {
  if (selection.endsWith('\n')) {
    selection = selection.slice(0, selection.length - 1)
  }
  return selection
}

export const addMarkup = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void, markUp: string): void => {
  const selection = extractSelection(content, startPosition, endPosition)
  if (selection === '') {
    return
  }
  replaceSelection(content, startPosition, endPosition, onContentChange, `${markUp}${selection}${markUp}`)
}

export const createList = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void, listMark: (j: number) => string): void => {
  const lines = content.split('\n')
  let j = 1
  for (let i = startPosition.line; i <= endPosition.line; i++) {
    lines[i] = `${listMark(j)} ${lines[i]}`
    j++
  }
  onContentChange(lines.join('\n'))
}

export const addHeaderLevel = (content: string, startPosition: CodeMirror.Position, onContentChange: (content: string) => void): void => {
  const lines = content.split('\n')
  const startLine = lines[startPosition.line]
  const isHeadingAlready = startLine.startsWith('#')
  lines[startPosition.line] = `#${!isHeadingAlready ? ' ' : ''}${startLine}`
  onContentChange(lines.join('\n'))
}

export const addLink = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void): void => {
  const selection = extractSelection(content, startPosition, endPosition)
  // the link detection should be improved
  if (selection.startsWith('http')) {
    replaceSelection(content, startPosition, endPosition, onContentChange, `[](${selection})`)
  } else {
    replaceSelection(content, startPosition, endPosition, onContentChange, `[${selection}]()`)
  }
}

export const addQuotes = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void): void => {
  const selection = extractSelection(content, startPosition, endPosition)
  if (selection === '') {
    replaceSelection(content, startPosition, endPosition, onContentChange, '> ')
  } else if (!selection.includes('\n')) {
    const lines = content.split('\n')
    replaceSelection(content, startPosition, endPosition, onContentChange, '> ' + lines[startPosition.line])
  } else {
    const selectedLines = selection.split('\n')
    for (let i = 0; i < selectedLines.length; i++) {
      selectedLines[i] = `> ${selectedLines[i]}`
    }
    replaceSelection(content, startPosition, endPosition, onContentChange, selectedLines.join('\n'))
  }
}

export const addCodeFences = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void): void => {
  const selection = extractSelection(content, startPosition, endPosition)
  replaceSelection(content, startPosition, endPosition, onContentChange, `\`\`\`\n${selection}\n\`\`\``)
}

export const addImage = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void): void => {
  const selection = extractSelection(content, startPosition, endPosition)
  replaceSelection(content, startPosition, endPosition, onContentChange, `![${selection}](https://)`)
}
