/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './pin-button.scss'
import { cypressId } from '../../../utils/cypress-attribute'

export interface PinButtonProps {
  isPinned: boolean
  onPinClick: () => void
  isDark: boolean
  className?: string
}

export const PinButton: React.FC<PinButtonProps> = ({ isPinned, onPinClick, isDark, className }) => {
  return (
    <Button
      variant={isDark ? 'secondary' : 'light'}
      className={`history-pin ${className || ''} ${isPinned ? 'pinned' : ''}`}
      onClick={onPinClick}
      {...cypressId('history-entry-pin-button')}>
      <ForkAwesomeIcon icon='thumb-tack' />
    </Button>
  )
}
