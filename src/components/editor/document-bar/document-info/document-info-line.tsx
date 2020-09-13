import React from 'react'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { IconName } from '../../../common/fork-awesome/types'

export interface DocumentInfoLineProps {
  icon: IconName
  isInline?: boolean
}

export const DocumentInfoLine: React.FC<DocumentInfoLineProps> = ({ icon, isInline, children }) => {
  return (
    <span className={'d-flex align-items-center'}>
      <ForkAwesomeIcon icon={icon} size={!isInline ? '2x' : undefined} fixedWidth={true} className={'mx-2'}/>
      <i className={'d-flex align-items-center'}>
        {children}
      </i>
    </span>
  )
}
