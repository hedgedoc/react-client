import { parse } from "flowchart.js"
import React, { useEffect } from 'react'

export interface FlowChartProps {
  index: number,
  code: string
}

export const FlowChart: React.FC<FlowChartProps> = ({ index, code }) => {
  useEffect(() => {
    const parserOutput = parse(code)
    parserOutput.drawSVG(`flowchart-${index}`, {
      'line-width': 2,
      'fill': 'none',
      'font-size': '16px',
      'font-family': 'Source Code Pro twemoji, monospace'
    })
  }, [code, index])

  return <div id={`flowchart-${index}`} className={'text-center'} key={`flowchart-${index}`}/>
}
