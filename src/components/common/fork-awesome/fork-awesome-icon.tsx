/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import type { IconName, IconSize } from './types'

export interface ForkAwesomeIconProps {
  icon: IconName
  className?: string
  fixedWidth?: boolean
  size?: IconSize
  stacked?: boolean
}

/**
 * Renders a fork awesome icon.
 *
 * @param icon The icon that should be rendered.
 * @param fixedWidth Should the icon be rendered with a fixed width?
 * @param size Which size class should the icon be rendered in?
 * @param className Additional classes the icon should get.
 * @param stacked If the icon is part of a {@link ForkAwesomeStack stack}.
 * @see https://forkaweso.me
 */
export const ForkAwesomeIcon: React.FC<ForkAwesomeIconProps> = ({
  icon,
  fixedWidth = false,
  size,
  className,
  stacked = false
}) => {
  const fixedWithClass = fixedWidth ? 'fa-fw' : ''
  const sizeClass = size ? `-${size}` : stacked ? '-1x' : ''
  const stackClass = stacked ? '-stack' : ''
  const extraClasses = `${className ?? ''} ${sizeClass || stackClass ? `fa${stackClass}${sizeClass}` : ''}`
  return <i className={`fa ${fixedWithClass} fa-${icon} ${extraClasses}`} />
}
