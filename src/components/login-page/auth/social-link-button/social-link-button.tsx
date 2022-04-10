/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { PropsWithChildren } from 'react'
import React from 'react'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import type { IconName } from '../../../common/fork-awesome/types'
import styles from './social-link-button.module.scss'

export interface SocialButtonProps {
  backgroundClass: string
  href: string
  icon: IconName
  title?: string
}

export const SocialLinkButton: React.FC<PropsWithChildren<SocialButtonProps>> = ({
  title,
  backgroundClass,
  href,
  icon,
  children
}) => {
  return (
    <a
      href={href}
      title={title}
      className={`btn ${styles['social-link-button']} p-0 d-inline-flex align-items-stretch ${backgroundClass}`}>
      <span className={`${styles['icon-part']} d-flex align-items-center`}>
        <ForkAwesomeIcon icon={icon} className={'social-icon'} fixedWidth={true} />
      </span>
      <span className={`${styles['text-part']} d-flex align-items-center mx-auto`}>{children}</span>
    </a>
  )
}
