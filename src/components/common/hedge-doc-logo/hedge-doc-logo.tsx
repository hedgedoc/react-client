/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import LogoColor from './logo_color.svg'

export enum HedgeDocLogoSize {
  SMALL = 32,
  MEDIUM = 64,
  BIG = 256
}

export interface HedgeDocLogoProps {
  size?: HedgeDocLogoSize | number
}

export const HedgeDocLogo: React.FC<HedgeDocLogoProps> = ({ size = HedgeDocLogoSize.MEDIUM }) => {
  return <LogoColor alt='logo' className={'w-auto'} title={'HedgeDoc logo with text'} style={{ height: size }} />
}
