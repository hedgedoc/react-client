import { Moment } from 'moment'
import React from 'react'

export interface ItalicTime {
  time: Moment
}

export const ItalicTime: React.FC<ItalicTime> = ({ time }) => {
  return (
    <i>
      <time title={time.format('LLLL')} dateTime={time.format()}>{time.fromNow(true)}</time>
    </i>
  )
}
