/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ShowIf } from '../show-if/show-if'
import styles from './user-avatar.module.scss'
import type { UserInfo } from '../../../api/users/types'
import { customizeAssetsUrl } from '../../../utils/customize-assets-url'
import { getUser } from '../../../api/users'
import { useAsync } from 'react-use'

interface UserAvatarPropsUser {
  user: UserInfo | null
  username?: undefined
}

interface UserAvatarPropsUsername {
  user?: undefined
  username: string | null
}

interface UserAvatarPropsCommon {
  size?: 'sm' | 'lg'
  additionalClasses?: string
  showName?: boolean
}

export type UserAvatarProps = UserAvatarPropsCommon & (UserAvatarPropsUser | UserAvatarPropsUsername)

interface NameAndPhoto {
  name: string
  photo: string
}

/**
 * Renders the avatar image of a user, optionally altogether with their name.
 * @param user The user object with the display name and photo.
 * @param username The username for which to fetch the display name and photo.
 * @param size The size in which the user image should be shown.
 * @param additionalClasses Additional CSS classes that will be added to the container.
 * @param showName true when the name should be displayed alongside the image, false otherwise. Defaults to true.
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  username,
  size,
  additionalClasses = '',
  showName = true
}) => {
  const { t } = useTranslation()

  const imageSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 16
      case 'lg':
        return 30
      default:
        return 20
    }
  }, [size])

  const { error, value, loading } = useAsync(async (): Promise<NameAndPhoto> => {
    if (username) {
      user = await getUser(username)
    }
    return {
      name: user?.displayName ?? t('common.guestUser'),
      photo: user?.photo ?? `${customizeAssetsUrl}img/avatar.png`
    }
  }, [user, username, t])

  return (
    <ShowIf condition={!error && !loading}>
      <span className={'d-inline-flex align-items-center ' + additionalClasses}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value?.photo}
          className={`rounded ${styles['user-image']}`}
          alt={t('common.avatarOf', { name: value?.name })}
          title={value?.name}
          height={imageSize}
          width={imageSize}
        />
        <ShowIf condition={showName}>
          <span className={`ml-2 mr-1 ${styles['user-line-name']}`}>{value?.name}</span>
        </ShowIf>
      </span>
    </ShowIf>
  )
}
