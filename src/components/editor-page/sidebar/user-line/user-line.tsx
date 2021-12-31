/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { UserAvatar } from '../../../common/user-avatar/user-avatar'
import type { ActiveIndicatorStatus } from '../users-online-sidebar-menu/active-indicator'
import { ActiveIndicator } from '../users-online-sidebar-menu/active-indicator'
import styles from './user-line.module.scss'
import type { UserInfo } from '../../../../api/users/types'

export interface UserLineProps {
  user?: UserInfo
  color: string
  status: ActiveIndicatorStatus
}

/**
 * Represents a user in the realtime activity status.
 * @param user The user to show. May be undefined, in that case a fallback image and name will be shown.
 * @param color The color of the user's edits.
 * @param status The user's current online status.
 */
export const UserLine: React.FC<UserLineProps> = ({ user, color, status }) => {
  return (
    <div className={'d-flex align-items-center h-100 w-100'}>
      <div
        className={`d-inline-flex align-items-bottom ${styles['user-line-color-indicator']}`}
        style={{ borderLeftColor: color }}
      />
      <UserAvatar user={user ?? null} additionalClasses={'flex-fill overflow-hidden px-2 text-nowrap w-100'} />
      <div className={styles['active-indicator-container']}>
        <ActiveIndicator status={status} />
      </div>
    </div>
  )
}
