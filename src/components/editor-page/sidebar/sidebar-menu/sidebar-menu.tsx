/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import type { SidebarMenuProps } from '../types'
import styles from './sidebar-menu.module.scss'

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ children, expand }) => {
  return (
    <div className={`${styles['sidebar-menu']} ${expand ? styles['show'] : ''}`}>
      <div className={`d-flex flex-column`}>{children}</div>
    </div>
  )
}
