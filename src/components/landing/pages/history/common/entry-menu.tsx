import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import './entry-menu.scss'

export interface EntryMenuProps {
  id: string;
  isDark: boolean;
  onSync: () => void
  className?: string
}

const EntryMenu: React.FC<EntryMenuProps> = ({ id, isDark, onSync, className }) => {
  return (
    <Dropdown className={`${className || ''}`}>
      <Dropdown.Toggle size="sm" variant={isDark ? 'secondary' : 'light'} id={`dropdown-card-${id}`} className='history-menu d-flex align-items-center'>
        <ForkAwesomeIcon icon="ellipsis-h" className='history-menu'/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onSync}>
          <ForkAwesomeIcon icon="cloud-upload" fixedWidth={true} className="mx-2"/>
          <Trans i18nKey="landing.history.menu.uploadEntry"/>
        </Dropdown.Item>
        <Dropdown.Item>
          <ForkAwesomeIcon icon="archive" fixedWidth={true} className="mx-2"/>
          <Trans i18nKey="landing.history.menu.removeEntry"/>
        </Dropdown.Item>
        <Dropdown.Item>
          <ForkAwesomeIcon icon="trash" fixedWidth={true} className="mx-2"/>
          <Trans i18nKey="landing.history.menu.deleteNote"/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { EntryMenu }
