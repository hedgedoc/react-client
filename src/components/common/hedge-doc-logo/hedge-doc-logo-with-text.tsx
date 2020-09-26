import React from 'react'
import { ReactComponent as LogoMonoWithText } from './logo_text_bw.svg'
import { ReactComponent as LogoColorWithText } from './logo_text.svg'

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

export const HedgeDocLogoWithText: React.FC<HedgeDocLogoProps> = ({ size = HedgeDocLogoSize.MEDIUM, fillType = HedgeDocLogoFillType.COLOR }) => {
  switch (fillType) {
    case HedgeDocLogoFillType.COLOR:
      return <LogoColorWithText className={'w-auto'} title={'HedgeDoc logo with text'} style={{ height: size }}/>
    case HedgeDocLogoFillType.MONO:
      return <LogoMonoWithText className={'w-auto'} title={'HedgeDoc logo with text'} style={{ height: size }}/>
    default:
      return null
  }
}
