import React, { Fragment } from 'react'
import './user-avatar.scss'

export interface UserAvatarProps {
    name: string;
    photo: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, photo }) => {
  return (
    <Fragment>
      <img
        src={photo}
        className="user-avatar"
        alt={`Avatar of ${name}`}
      /><span className="user-name">{name}</span>
    </Fragment>
  )
}

export { UserAvatar }
