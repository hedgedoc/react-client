/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../fork-awesome/fork-awesome-icon'
import type { IconName } from '../fork-awesome/types'
import { ShowIf } from '../show-if/show-if'
import './icon-button.scss'

export interface IconButtonProps extends ButtonProps {
  icon: IconName
  onClick?: () => void
  border?: boolean
  iconFixedWidth?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  iconFixedWidth = false,
  border = false,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={`btn-icon p-0 d-inline-flex align-items-stretch ${border ? 'with-border' : ''} ${className ?? ''}`}>
      <span className='icon-part d-flex align-items-center'>
        <ForkAwesomeIcon icon={icon} fixedWidth={iconFixedWidth} className={'icon'} />
      </span>
      <ShowIf condition={!!children}>
        <span className='text-part d-flex align-items-center'>{children}</span>
      </ShowIf>
    </Button>
  )
}
