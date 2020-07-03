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
    } else {
      for (let i = lines.length - 1; i > endPosition.line; i--) {
        lines[i + extraLines] = lines[i]
      }
      let j = 0
      for (let i = 0; i <= extraLines; i++) {
        lines[i + startPosition.line] = newLines[j]
        j++
      }
      console.debug('not the same')
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
    if (startPosition.line === endPosition.line) {
      console.debug('single line')
      changeSelection(`**${selection}**`)
    } else {
      console.debug('multi-line', selection)
      changeSelection(`**\n${selection}**\n`)
    }
  }

  /*
  const makeSelectionItalic = () => {
    if (content !== '') {
      onChange(`*${content}*`)
    }
  }

  const strikeThroughSelection = () => {
    if (content !== '') {
      onChange(`~~${content}~~`)
    }
  }
  */

  return (
    <ButtonToolbar>
      <Button onClick={makeSelectionBold}>
        <ForkAwesomeIcon icon="bold"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="italic"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="strikethrough"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="header"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="quote-right"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="list"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="list-ol"/>
      </Button>
      <Button onClick={notImplemented}>
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
