/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import styles from './active-indicator.module.scss'
import type { ActiveIndicatorStatus } from '../../../../redux/realtime/types'

export interface ActiveIndicatorProps {
  status: ActiveIndicatorStatus
}

/**
 * Renders an indicator corresponding to the status.
 * This is used to indicate if a user is present or not.
 *
 * @param status The state of the indicator to render
 */
export const ActiveIndicator: React.FC<ActiveIndicatorProps> = ({ status }) => {
  return <span className={`${styles['activeIndicator']} ${status}`} />
}
