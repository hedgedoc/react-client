import React from 'react'
import { ReactComponent as LogoMono } from './logo_bw.svg'
import { ReactComponent as LogoColor } from './logo.svg'

export enum HedgeDocLogoSize {
  SMALL = 32,
  MEDIUM = 64,
  BIG= 256
}

export interface HedgeDocLogoProps {
  size?: HedgeDocLogoSize | number,
  fillType: HedgeDocLogoFillType
}

export enum HedgeDocLogoFillType {
  COLOR,
  MONO
}

export const HedgeDocLogo: React.FC<HedgeDocLogoProps> = ({ size = HedgeDocLogoSize.MEDIUM, fillType = HedgeDocLogoFillType.COLOR }) => {
  switch (fillType) {
    case HedgeDocLogoFillType.COLOR:
      return <LogoColor className={'w-auto'} title={'HedgeDoc logo with text'} style={{ height: size }}/>
    case HedgeDocLogoFillType.MONO:
      return <LogoMono className={'w-auto'} title={'HedgeDoc logo with text'} style={{ height: size }}/>
    default:
      return null
  }
}
