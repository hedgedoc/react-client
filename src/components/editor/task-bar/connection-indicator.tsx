import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './connection-indicator.scss'
import { UserLine } from './user-line'

const ConnectionIndicator: React.FC = () => {
  const userOnline = 1
  return (
    <Dropdown className="small" alignRight>
      <Dropdown.Toggle id="connection-indicator" size="sm" variant="primary" className="all-caps">
        <FontAwesomeIcon icon="users"/> {userOnline} Online
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item className="d-flex align-items-center connection-dropdown-item">
          <UserLine name="Philip Molares" photo="https://robohash.org/dermolly.png" color="red"/> <FontAwesomeIcon icon="circle"/>
        </Dropdown.Item>
        <Dropdown.Item className="d-flex align-items-center connection-dropdown-item">
          <UserLine name="Philip Molares" photo="https://robohash.org/dermolly.png" color="blue"/> <FontAwesomeIcon icon="circle"/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { ConnectionIndicator }
