/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './drop-overlay.scss'

export const DropOverlay: React.FC = () => {
  return (
    <div className={'drop-overlay'}>
      <ForkAwesomeIcon icon={'download'} size={'4x'}/>
      <span className={'drop-overlay-text'}>Drop to insert</span>
    </div>
  )
}
