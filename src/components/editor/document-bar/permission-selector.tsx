import React from 'react'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { Dropdown } from 'react-bootstrap'

export const PermissionSelector: React.FC = () => {
  return (
    <Dropdown className="small" alignRight={true}>
      <Dropdown.Toggle variant="light" size="sm" id="editor-menu">
        <ForkAwesomeIcon icon="lock"/> Locked
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item className="small">
          <ForkAwesomeIcon icon={'leaf'} fixedWidth={true}/> Freely - Anyone can edit
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <ForkAwesomeIcon icon={'pencil'} fixedWidth={true}/> Editable - Signed-in people can edit
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <ForkAwesomeIcon icon={'id-card'} fixedWidth={true}/> Limited - Signed-in people can edit (forbid guests)
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <ForkAwesomeIcon icon={'lock'} fixedWidth={true}/> Locked - Only owner can edit
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <ForkAwesomeIcon icon={'shield'} fixedWidth={true}/> Protected - Only owner can edit (forbid guests)
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <ForkAwesomeIcon icon={'eye-slash'} fixedWidth={true}/> Private - Only owner can view & edit
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
