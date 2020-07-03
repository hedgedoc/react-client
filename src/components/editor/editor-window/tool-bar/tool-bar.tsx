import CodeMirror from 'codemirror'
import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './tool-bar.scss'
import { addMarkup, extractSelection, updateSelection } from './utils'

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

  const changeSelection = (selection: string) => updateSelection(content, startPosition, endPosition, onContentChange, selection)
  const getSelection = () => extractSelection(content, startPosition, endPosition)

  const makeSelectionBold = () => addMarkup(content, startPosition, endPosition, onContentChange, '**')
  const makeSelectionItalic = () => addMarkup(content, startPosition, endPosition, onContentChange, '*')
  const strikeThroughSelection = () => addMarkup(content, startPosition, endPosition, onContentChange, '~~')

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
        <ForkAwesomeIcon icon="picture-o"/>
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
