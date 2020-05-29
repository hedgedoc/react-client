import React, { Fragment } from 'react'
import './user-avatar.scss'

export interface UserAvatarProps {
    name: string;
    photo: string;
    additionalClasses?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, photo, additionalClasses = '' }) => {
  return (
    <span className={'d-flex align-items-center ' + additionalClasses}>
      <img
        src={photo}
        className="user-avatar"
        alt={`Avatar of ${name}`}
      />
      <span className="ml-1 user-name">{name}</span>
    </span>
  )
}

export { UserAvatar }
