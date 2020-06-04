import React from 'react'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../../../fork-awesome/fork-awesome-icon'
import { Location } from '../history'

export interface SyncStatusProps {
  location: Location
  onSync: () => void
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ location, onSync }) => {
  const color = location === Location.REMOTE ? 'text-success' : 'text-light'
  return (
    <Button onClick={onSync}>
      <ForkAwesomeIcon icon='refresh' className={color}/>
    </Button>
  )
}
