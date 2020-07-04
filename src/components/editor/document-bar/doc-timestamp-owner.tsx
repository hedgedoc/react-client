import React from 'react'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './doc-timestamp-owner.scss'

export const DocTimestampOwner: React.FC = () => {
  return (
    <div className={'d-flex flex-column timestamps-owner'}>
      <span><ForkAwesomeIcon icon='clock-o' fixedWidth={true}/> created 11 minutes ago</span>
      <span>somebody owned this note</span>
    </div>
  )
}
