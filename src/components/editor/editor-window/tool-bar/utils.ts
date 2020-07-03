import CodeMirror from 'codemirror'

export const updateSelection = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void, selection: string): void => {
  const lines = content.split('\n')
  const newLines = selection.split('\n')
  const extraLines = newLines.length - 1
  const selectionIncludeNewline = selection.includes('\n')
  if (startPosition.line === endPosition.line) {
    if (!selectionIncludeNewline) {
      lines[startPosition.line] = lines[startPosition.line].slice(0, startPosition.ch) + selection + lines[startPosition.line].slice(endPosition.ch)
    } else {
      for (let i = lines.length - 1; i > startPosition.line; i--) {
        lines[i + extraLines] = lines[i]
      }
      const lastPart = lines[startPosition.line].slice(endPosition.ch)
      lines[startPosition.line] = lines[startPosition.line].slice(0, startPosition.ch) + newLines[0]
      let j = 1
      for (let i = 0; i < extraLines; i++) {
        lines[i + startPosition.line + 1] = newLines[j]
        j++
      }
      lines[extraLines + startPosition.line] += lastPart
    }
  }
  if (startPosition.line !== endPosition.line && startPosition.ch !== endPosition.ch) {
    for (let i = lines.length - 1; i > endPosition.line; i--) {
      lines[i + extraLines] = lines[i]
    }
    let j = 0
    for (let i = 0; i <= extraLines; i++) {
      lines[i + startPosition.line] = newLines[j]
      j++
    }
  }
  onContentChange(lines.join('\n'))
}

export const extractSelection = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position): string => {
  if (startPosition.line === endPosition.line && startPosition.ch === endPosition.ch) {
    return ''
  }

  const lines = content.split('\n')

  if (startPosition.line === endPosition.line) {
    return lines[startPosition.line].slice(startPosition.ch, endPosition.ch)
  }

  let newSelection = lines[startPosition.line].slice(startPosition.ch) + '\n'
  for (let i = startPosition.line; i <= endPosition.line; i++) {
    if (i === endPosition.line) {
      newSelection += lines[i].slice(0, endPosition.ch) + '\n'
    } else {
      newSelection += lines[i] + '\n'
    }
  }
  return newSelection
}

export const addMarkup = (content: string, startPosition: CodeMirror.Position, endPosition: CodeMirror.Position, onContentChange: (content: string) => void, markUp: string): void => {
  const selection = extractSelection(content, startPosition, endPosition)
  if (selection === '') {
    return
  }
  updateSelection(content, startPosition, endPosition, onContentChange, `${markUp}${selection}${markUp}`)
}
