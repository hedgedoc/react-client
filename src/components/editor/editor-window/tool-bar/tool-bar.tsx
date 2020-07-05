import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { Position } from '../editor-window'
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
  position: Position
}

export const ToolBar: React.FC<ToolBarProps> = ({ content, position, onContentChange }) => {
  const notImplemented = () => {
    alert('This feature is not yet implemented')
  }

  const makeSelectionBold = () => addMarkup(content, position.startPosition, position.endPosition, onContentChange, '**')
  const makeSelectionItalic = () => addMarkup(content, position.startPosition, position.endPosition, onContentChange, '*')
  const strikeThroughSelection = () => addMarkup(content, position.startPosition, position.endPosition, onContentChange, '~~')

  const addList = () => createList(content, position.startPosition, position.endPosition, onContentChange, () => '-')
  const addOrderedList = () => createList(content, position.startPosition, position.endPosition, onContentChange, j => `${j}.`)
  const addTaskList = () => createList(content, position.startPosition, position.endPosition, onContentChange, () => '- [ ]')

  const addLine = () => replaceSelection(content, position.startPosition, position.endPosition, onContentChange, '----')
  const addComment = () => replaceSelection(content, position.startPosition, position.endPosition, onContentChange, '> []')
  const addTable = () => replaceSelection(content, position.startPosition, position.endPosition, onContentChange, '| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |')

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
      <Button variant='light' onClick={() => addHeaderLevel(content, position.startPosition, onContentChange)}>
        <ForkAwesomeIcon icon="header"/>
      </Button>
      <Button variant='light' onClick={() => addCodeFences(content, position.startPosition, position.endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="code"/>
      </Button>
      <Button variant='light' onClick={() => addQuotes(content, position.startPosition, position.endPosition, onContentChange)}>
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
      <Button variant='light' onClick={() => addLink(content, position.startPosition, position.endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="link"/>
      </Button>
      <Button variant='light' onClick={() => addImage(content, position.startPosition, position.endPosition, onContentChange)}>
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
