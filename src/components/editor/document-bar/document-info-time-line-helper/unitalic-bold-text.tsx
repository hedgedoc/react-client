import React, { Fragment } from 'react'
import './unitalic-bold-text.scss'

export interface BoldTextProps {
  text: string ;
}

export const UnitalicBoldText: React.FC<BoldTextProps> = ({ text }) => {
  return <Fragment><b className={'font-style-normal'}>{text}</b></Fragment>
}
