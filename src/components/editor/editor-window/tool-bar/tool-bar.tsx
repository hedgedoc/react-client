import CodeMirror from 'codemirror'
import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './tool-bar.scss'
import {
  addCodeFences,
  addHeaderLevel,
  addImage,
  addLink,
  addMarkup,
  addQuotes,
  createList,
  replaceSelection
} from './utils'

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

  const changeSelection = (selection: string) => replaceSelection(content, startPosition, endPosition, onContentChange, selection)

  const makeSelectionBold = () => addMarkup(content, startPosition, endPosition, onContentChange, '**')
  const makeSelectionItalic = () => addMarkup(content, startPosition, endPosition, onContentChange, '*')
  const strikeThroughSelection = () => addMarkup(content, startPosition, endPosition, onContentChange, '~~')

  const addList = () => createList(content, startPosition, endPosition, onContentChange, () => '-')
  const addOrderedList = () => createList(content, startPosition, endPosition, onContentChange, j => `${j}.`)
  const addTaskList = () => createList(content, startPosition, endPosition, onContentChange, () => '- [ ]')

  const addLine = () => changeSelection('----')
  const addComment = () => changeSelection('> []')
  const addTable = () => changeSelection('| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |')

  return (
    <ButtonToolbar className='flex-nowrap bg-light'>
      <Button variant='light' onClick={makeSelectionBold}>
        <ForkAwesomeIcon icon="bold"/>
      </Button>
      <Button variant='light' onClick={makeSelectionItalic}>
        <ForkAwesomeIcon icon="italic"/>
      </Button>
      <Button variant='light' onClick={strikeThroughSelection}>
        <ForkAwesomeIcon icon="strikethrough"/>
      </Button>
      <Button variant='light' onClick={() => addHeaderLevel(content, startPosition, onContentChange)}>
        <ForkAwesomeIcon icon="header"/>
      </Button>
      <Button variant='light' onClick={() => addCodeFences(content, startPosition, endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="code"/>
      </Button>
      <Button variant='light' onClick={() => addQuotes(content, startPosition, endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="quote-right"/>
      </Button>
      <Button variant='light' onClick={addList}>
        <ForkAwesomeIcon icon="list"/>
      </Button>
      <Button variant='light' onClick={addOrderedList}>
        <ForkAwesomeIcon icon="list-ol"/>
      </Button>
      <Button variant='light' onClick={addTaskList}>
        <ForkAwesomeIcon icon="check-square"/>
      </Button>
      <Button variant='light' onClick={() => addLink(content, startPosition, endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="link"/>
      </Button>
      <Button variant='light' onClick={() => addImage(content, startPosition, endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="picture-o"/>
      </Button>
      <Button variant='light' onClick={notImplemented}>
        <ForkAwesomeIcon icon="upload"/>
      </Button>
      <Button variant='light' onClick={addTable}>
        <ForkAwesomeIcon icon="table"/>
      </Button>
      <Button variant='light' onClick={addLine}>
        <ForkAwesomeIcon icon="minus"/>
      </Button>
      <Button variant='light' onClick={addComment}>
        <ForkAwesomeIcon icon="comment"/>
      </Button>
    </ButtonToolbar>
  )
}
