/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { dataCy } from '../../../../utils/cypress-attribute'

export interface UnitalicBoldTextProps {
  text: string | number
  'data-cy'?: string
}

export const UnitalicBoldText: React.FC<UnitalicBoldTextProps> = ({ text, ...props }) => {
  return (
    <b className={'font-style-normal mr-1'} {...dataCy(props)}>
      {text}
    </b>
  )
}
