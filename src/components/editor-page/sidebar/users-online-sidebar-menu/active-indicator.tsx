/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import styles from './active-indicator.module.scss'

export enum ActiveIndicatorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface ActiveIndicatorProps {
  status: ActiveIndicatorStatus
}

export const ActiveIndicator: React.FC<ActiveIndicatorProps> = ({ status }) => {
  return <span className={`${styles['activeIndicator']} ${status}`} />
}
