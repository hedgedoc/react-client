import CodeMirror from 'codemirror'
import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './tool-bar.scss'
import { addMarkup, createList, extractSelection, updateSelection } from './utils'

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

  const addList = () => createList(content, startPosition, endPosition, onContentChange, () => '-')
  const addOrderedList = () => createList(content, startPosition, endPosition, onContentChange, j => `${j}.`)
  const addTaskList = () => createList(content, startPosition, endPosition, onContentChange, () => '- [ ]')

  const addHeaderLevel = () => {
    const lines = content.split('\n')
    const startLine = lines[startPosition.line]
    const isHeadingAlready = startLine.startsWith('#')
    lines[startPosition.line] = `#${!isHeadingAlready ? ' ' : ''}${startLine}`
    onContentChange(lines.join('\n'))
  }

  const addCodeFences = () => {
    const selection = getSelection()
    changeSelection(`\`\`\`\n${selection}\n\`\`\``)
  }

  const addQuotes = () => {
    const selection = getSelection()
    if (selection === '') {
      changeSelection('> ')
    } else {
      const selectedLines = selection.split('\n')
      for (let i = 0; i < selectedLines.length - 1; i++) {
        selectedLines[i] = `> ${selectedLines[i]}`
      }
      changeSelection(selectedLines.join('\n'))
    }
  }

  const addLink = () => {
    const selection = getSelection()
    // the link detection should be improved
    if (selection.startsWith('http')) {
      changeSelection(`[](${selection})`)
    } else {
      changeSelection(`[${selection}]()`)
    }
  }

  const addImage = () => {
    const selection = getSelection()
    changeSelection(`![${selection}](https://)`)
  }

  const addLine = () => changeSelection('----')
  const addComment = () => changeSelection('> []')
  const addTable = () => changeSelection('| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |')

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
      <Button onClick={addLink}>
        <ForkAwesomeIcon icon="link"/>
      </Button>
      <Button onClick={addImage}>
        <ForkAwesomeIcon icon="picture-o"/>
      </Button>
      <Button onClick={notImplemented}>
        <ForkAwesomeIcon icon="upload"/>
      </Button>
      <Button onClick={addTable}>
        <ForkAwesomeIcon icon="table"/>
      </Button>
      <Button onClick={addLine}>
        <ForkAwesomeIcon icon="minus"/>
      </Button>
      <Button onClick={addComment}>
        <ForkAwesomeIcon icon="comment"/>
      </Button>
    </ButtonToolbar>
  )
}
