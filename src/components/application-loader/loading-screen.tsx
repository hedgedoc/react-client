import React from 'react'
import { Alert } from 'react-bootstrap'
import { HedgeDocLogo, HedgeDocLogoFillType, HedgeDocLogoSize } from '../common/hedge-doc-logo/hedge-doc-logo'
import { ShowIf } from '../common/show-if/show-if'

export interface LoadingScreenProps {
  failedTitle?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ failedTitle }) => {
  return (
    <div className="loader middle text-light overflow-hidden">
      <div className="mb-3 text-light">
        <span className={`d-block ${failedTitle ? 'animation-shake' : 'animation-roll'}`}>
          <HedgeDocLogo fillType={HedgeDocLogoFillType.COLOR} size={HedgeDocLogoSize.BIG}/>
        </span>
      </div>
      <ShowIf condition={ !!failedTitle}>
        <Alert variant={'danger'}>
          The task '{failedTitle}' failed.<br/>
          For further information look into the browser console.
        </Alert>
      </ShowIf>
    </div>
  )
}
