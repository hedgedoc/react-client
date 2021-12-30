/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react'
import LogoColor from './logo_color.svg'
import { useTranslation } from 'react-i18next'

export enum HedgeDocLogoSize {
  SMALL = 32,
  MEDIUM = 64,
  BIG = 256
}

export interface HedgeDocLogoProps {
  size?: HedgeDocLogoSize | number
}

export const HedgeDocLogo: React.FC<HedgeDocLogoProps> = ({ size = HedgeDocLogoSize.MEDIUM }) => {
  const { t } = useTranslation()
  const altText = useMemo(() => t('app.icon'), [t])
  const style = useMemo(() => ({ height: size }), [size])

  return <LogoColor alt='logo' className={'w-auto'} title={altText} style={style} />
}
