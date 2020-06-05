import React from 'react'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../../../fork-awesome/fork-awesome-icon'
import { Location } from '../history'
import './sync-status.scss'

export interface SyncStatusProps {
  isDark: boolean
  location: Location
  onSync: () => void
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ isDark, location, onSync }) => {
  const status = location === Location.REMOTE ? 'synced' : ''
  return (
    <Button variant={isDark ? 'secondary' : 'light'} onClick={onSync}>
      <ForkAwesomeIcon icon='refresh' className={`sync-icon ${status}`}/>
    </Button>
  )
}
