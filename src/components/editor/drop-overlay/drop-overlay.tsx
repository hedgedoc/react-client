import React from 'react'
import './drop-overlay.scss'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'

export const DropOverlay: React.FC = () => {
  return (
    <div className={'drop-overlay'}>
      <ForkAwesomeIcon icon={'download'} size={'4x'}/>
      <span className={'drop-overlay-text'}>Drop to insert</span>
    </div>
  )
}
