import React from 'react'
import { ShowIf } from '../../../common/show-if/show-if'
import './user-avatar.scss'

export interface UserAvatarProps {
    name: string;
    photo: string;
    additionalClasses?: string;
    showName?: boolean
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, photo, additionalClasses = '', showName = true }) => {
  // ToDo: add Translation Key for Avatar of ${name}
  return (
    <span className={'d-inline-flex align-items-center ' + additionalClasses}>
      <img
        src={photo}
        className="user-avatar"
        alt={`Avatar of ${name}`}
      />
      <ShowIf condition={showName}>
        <span className="mx-1 user-name">{name}</span>
      </ShowIf>
    </span>
  )
}

export { UserAvatar }
