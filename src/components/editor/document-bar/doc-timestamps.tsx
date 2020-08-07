import React from 'react'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './doc-timestamps.scss'

export const DocTimestamps: React.FC = () => {
  return (
    <div className={'d-flex flex-row align-items-center timestamps'}>
      <span title='Philip Molares created this note 11 minutes ago'><ForkAwesomeIcon icon='plus-square-o' fixedWidth={true}/> Philip Molares — 11 minutes ago</span>
      &nbsp;
      <span title='Tilman Vatteroth edited this note 3 minutes ago'><ForkAwesomeIcon icon='pencil-square-o' fixedWidth={true}/> Tilman Vatteroth — 3 minutes ago</span>
    </div>
  )
}
