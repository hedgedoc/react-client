import React, { Fragment } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './doc-timestamps.scss'

export const DocTimestamps: React.FC = () => {
  return (
    <div className={'navbar-nav'}>

      <InputGroup className={'h-100 flex-nowrap nav-item mr-2'} title={'Philip Molares created this note 11 minutes ago.'}>
        <div className="input-group-prepend">
          <span className="input-group-text">
            <ForkAwesomeIcon icon='plus-square-o' fixedWidth={true}/>
          </span>
        </div>
        <div className="input-group-append">
          <span className="input-group-text">
            <img
              src="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&amp;r=pg&amp;d=mp"
              className="user-avatar"
              alt="Avatar of Test"/>  11 minutes ago
          </span>
        </div>
      </InputGroup>

      <InputGroup className={'h-100 flex-nowrap nav-item mr-2'} title={'Philip Molares edited this note 3 minutes ago.'}>
        <div className="input-group-prepend">
          <span className="input-group-text">
            <ForkAwesomeIcon icon='pencil-square-o' fixedWidth={true}/>
          </span>
        </div>
        <div className="input-group-append">
          <span className="input-group-text">
            <img
              src="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&amp;r=pg&amp;d=mp"
              className="user-avatar"
              alt="Avatar of Test"/>  3 minutes ago
          </span>
        </div>
      </InputGroup>
    </div>
  )
}
