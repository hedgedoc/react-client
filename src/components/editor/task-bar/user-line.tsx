import React from 'react'
import { UserAvatar } from '../../landing/layout/user-avatar/user-avatar'
import './user-line.scss'

export interface UserLineProps {
  name: string;
  photo: string;
  color: string;
}

export const UserLine: React.FC<UserLineProps> = ({ name, photo, color }) => {
  return (
    <div className='d-inline-flex align-items-center user-line-color-indicator' style={{ borderLeftColor: color }}>
      <UserAvatar photo={photo} name={name}/>
    </div>
  )
}
