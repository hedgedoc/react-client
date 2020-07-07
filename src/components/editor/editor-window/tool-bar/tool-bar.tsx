import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { Positions } from '../interfaces'
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
  positions: Positions
}

export const ToolBar: React.FC<ToolBarProps> = ({ content, positions, onContentChange }) => {
  const notImplemented = () => {
    alert('This feature is not yet implemented')
  }

  const makeSelectionBold = () => addMarkup(content, positions.startPosition, positions.endPosition, onContentChange, '**')
  const makeSelectionItalic = () => addMarkup(content, positions.startPosition, positions.endPosition, onContentChange, '*')
  const strikeThroughSelection = () => addMarkup(content, positions.startPosition, positions.endPosition, onContentChange, '~~')

  const addList = () => createList(content, positions.startPosition, positions.endPosition, onContentChange, () => '-')
  const addOrderedList = () => createList(content, positions.startPosition, positions.endPosition, onContentChange, j => `${j}.`)
  const addTaskList = () => createList(content, positions.startPosition, positions.endPosition, onContentChange, () => '- [ ]')

  const addLine = () => replaceSelection(content, positions.startPosition, positions.endPosition, onContentChange, '----')
  const addComment = () => replaceSelection(content, positions.startPosition, positions.endPosition, onContentChange, '> []')
  const addTable = () => replaceSelection(content, positions.startPosition, positions.endPosition, onContentChange, '| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |')

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
      <Button variant='light' onClick={() => addHeaderLevel(content, positions.startPosition, onContentChange)}>
        <ForkAwesomeIcon icon="header"/>
      </Button>
      <Button variant='light' onClick={() => addCodeFences(content, positions.startPosition, positions.endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="code"/>
      </Button>
      <Button variant='light' onClick={() => addQuotes(content, positions.startPosition, positions.endPosition, onContentChange)}>
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
      <Button variant='light' onClick={() => addLink(content, positions.startPosition, positions.endPosition, onContentChange)}>
        <ForkAwesomeIcon icon="link"/>
      </Button>
      <Button variant='light' onClick={() => addImage(content, positions.startPosition, positions.endPosition, onContentChange)}>
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
