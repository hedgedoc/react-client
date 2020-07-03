import CodeMirror from 'codemirror'
import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './tool-bar.scss'

export interface ToolBarProps {
  content: string
  onContentChange: (content: string) => void
  startPosition: CodeMirror.Position
  endPosition: CodeMirror.Position
}

export const ToolBar: React.FC<ToolBarProps> = ({ content, startPosition, endPosition, onContentChange }) => {
  const notImplemented = () => {
    alert('This feature is not yet implemented')
  }

  const changeSelection = (selection: string) => {
    const lines = content.split('\n')
    const newLines = selection.split('\n')
    const extraLines = newLines.length - 1
    const selectionIncludeNewline = selection.includes('\n')
    if (startPosition.line === endPosition.line && startPosition.ch === endPosition.ch) {
      if (!selectionIncludeNewline) {
        console.debug(lines[startPosition.line].slice(0, startPosition.ch) + selection + lines[startPosition.line].slice(startPosition.ch))
        lines[startPosition.line] = lines[startPosition.line].slice(0, startPosition.ch) + selection + lines[startPosition.line].slice(startPosition.ch)
      } else {
        for (let i = lines.length - 1; i > startPosition.line; i--) {
          lines[i + extraLines] = lines[i]
        }
        const lastPart = lines[startPosition.line].slice(startPosition.ch)
        lines[startPosition.line] = lines[startPosition.line].slice(0, startPosition.ch) + newLines[0]
        let j = 1
        for (let i = 0; i < extraLines; i++) {
          lines[i + startPosition.line + 1] = newLines[j]
          j++
        }
        lines[extraLines + startPosition.line] += lastPart
      }
    }
    if (startPosition.line === endPosition.line && startPosition.ch !== endPosition.ch) {
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
      console.debug('not the same')
      console.debug('before', lines)
      for (let i = lines.length - 1; i > endPosition.line; i--) {
        lines[i + extraLines] = lines[i]
      }
      let j = 0
      for (let i = 0; i <= extraLines; i++) {
        lines[i + startPosition.line] = newLines[j]
        j++
      }
      console.debug('after', lines)
    }
    onContentChange(lines.join('\n'))
  }

  const getSelection = (): string => {
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

  const makeSelectionBold = () => {
    const selection = getSelection()
    if (selection === '') {
      return
    }
    changeSelection(`**${selection}**`)
  }

  const makeSelectionItalic = () => {
    const selection = getSelection()
    if (selection === '') {
      return
    }
    changeSelection(`*${selection}*`)
  }

  const strikeThroughSelection = () => {
    const selection = getSelection()
    if (selection === '') {
      return
    }
    changeSelection(`~~${selection}~~`)
  }

  const addHeaderLevel = () => {
    const lines = content.split('\n')
    const startLine = lines[startPosition.line]
    const isHeadingAlready = startLine.startsWith('#')
    lines[startPosition.line] = `#${!isHeadingAlready ? ' ' : ''}${startLine}`
    onContentChange(lines.join('\n'))
  }

  const addCodeFences = () => {
    const selection = getSelection()
    if (selection === '') {
      console.debug('no selection')
      changeSelection('```\n\n```')
    } else {
      console.debug('selection')
      changeSelection(`\`\`\`\n${selection}\n\`\`\``)
    }
  }

  const addQuotes = () => {
    const selection = getSelection()
    if (selection === '') {
      console.debug('no selection')
      changeSelection('> ')
    } else {
      console.debug('selection')
      const newLines = selection.split('\n')
      for (let i = 0; i < newLines.length - 1; i++) {
        newLines[i] = `> ${newLines[i]}`
      }
      changeSelection(newLines.join('\n'))
    }
  }

  const addList = () => {
    const lines = content.split('\n')
    for (let i = startPosition.line; i <= endPosition.line; i++) {
      lines[i] = `- ${lines[i]}`
    }
    onContentChange(lines.join('\n'))
  }

  const addOrderedList = () => {
    const lines = content.split('\n')
    let j = 1
    for (let i = startPosition.line; i <= endPosition.line; i++) {
      lines[i] = `${j}. ${lines[i]}`
      j++
    }
    onContentChange(lines.join('\n'))
  }

  const addTaskList = () => {
    const lines = content.split('\n')
    for (let i = startPosition.line; i <= endPosition.line; i++) {
      lines[i] = `- [ ] ${lines[i]}`
    }
    onContentChange(lines.join('\n'))
  }

  return (
    <ButtonToolbar>
      <Button onClick={makeSelectionBold}>
        <ForkAwesomeIcon icon="bold"/>
      </Button>
      <Button onClick={makeSelectionItalic}>
        <ForkAwesomeIcon icon="italic"/>
      </Button>
      <Button onClick={strikeThroughSelection}>
        <ForkAwesomeIcon icon="strikethrough"/>
      </Button>
      <Button onClick={addHeaderLevel}>
        <ForkAwesomeIcon icon="header"/>
      </Button>
      <Button onClick={addCodeFences}>
        <ForkAwesomeIcon icon="code"/>
      </Button>
      <Button onClick={addQuotes}>
        <ForkAwesomeIcon icon="quote-right"/>
      </Button>
      <Button onClick={addList}>
        <ForkAwesomeIcon icon="list"/>
      </Button>
      <Button onClick={addOrderedList}>
        <ForkAwesomeIcon icon="list-ol"/>
      </Button>
      <Button onClick={addTaskList}>
        <ForkAwesomeIcon icon="check-square"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="link"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="file-image-o"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="upload"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="table"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="minus"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="comment"/>
      </Button>
    </ButtonToolbar>
  )
}
