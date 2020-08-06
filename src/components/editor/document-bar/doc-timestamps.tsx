import React from 'react'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './doc-timestamps.scss'
import { UserAvatar } from '../../landing/layout/user-avatar/user-avatar'

export const DocTimestamps: React.FC = () => {
  return (
    <div className={'d-flex flex-column timestamps'}>
      <span><ForkAwesomeIcon icon='clock-o' fixedWidth={true}/> an anonymous user edited this note 3 minutes ago</span>
      <span className='d-inline-flex'><UserAvatar name={'Test'} photo={'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp'}/> created this note 11 minutes ago</span>
    </div>
  )
}
