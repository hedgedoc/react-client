import React from 'react'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './doc-timestamps.scss'

export const DocTimestamps: React.FC = () => {
  return (
    <div className={'navbar-nav'}>
      <span className='nav-item text-secondary pr-2' title='Philip Molares created this note 11 minutes ago'><ForkAwesomeIcon icon='plus-square-o' fixedWidth={true}/> Philip Molares — 11 minutes ago</span>
      <span className='nav-item text-secondary pl-2' title='Tilman Vatteroth edited this note 3 minutes ago'><ForkAwesomeIcon icon='pencil-square-o' fixedWidth={true}/> Tilman Vatteroth — 3 minutes ago</span>
    </div>
  )
}
