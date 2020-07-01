import React from 'react'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './tool-bar.scss'

export const ToolBar: React.FC = () => {
  const notImplemented = () => {
    alert('This feature is not yet implemented')
  }

  return (
    <ButtonToolbar>
      <ButtonGroup>
        <Button onClick={notImplemented}>
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
      </ButtonGroup>
    </ButtonToolbar>
  )
}
