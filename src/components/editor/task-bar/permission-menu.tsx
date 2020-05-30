import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export const PermissionMenu: React.FC = () => {
  useTranslation()
  return (
    <Dropdown className="small" alignRight={true}>
      <Dropdown.Toggle variant="light" size="sm" id="editor-menu" className="text-secondary">
        <FontAwesomeIcon icon="lock"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item className="small">
          <FontAwesomeIcon icon={'leaf'} fixedWidth={true}/> Freely - Anyone can edit
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <FontAwesomeIcon icon={'edit'} fixedWidth={true}/> Editable - Signed-in people can edit
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <FontAwesomeIcon icon={'id-card'} fixedWidth={true}/> Limited - Signed-in people can edit (forbid guests)
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <FontAwesomeIcon icon={'lock'} fixedWidth={true}/> Locked - Only owner can edit
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <FontAwesomeIcon icon={'shield-alt'} fixedWidth={true}/> Protected - Only owner can edit (forbid guests)
        </Dropdown.Item>
        <Dropdown.Item className="small">
          <FontAwesomeIcon icon={'eye-slash'} fixedWidth={true}/> Private - Only owner can view & edit
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
