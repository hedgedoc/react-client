import React from 'react'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './tool-bar.scss'

export const ToolBar: React.FC = () => {
  return (
    <ButtonToolbar>
      <ButtonGroup>
        <Button>
          <ForkAwesomeIcon icon="bold"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="italic"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="strikethrough"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="header"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="quote-right"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="list"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="list-ol"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="check-square"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="link"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="file-image-o"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="upload"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="table"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="minus"/>
        </Button>
        <Button>
          <ForkAwesomeIcon icon="comment"/>
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  )
}
