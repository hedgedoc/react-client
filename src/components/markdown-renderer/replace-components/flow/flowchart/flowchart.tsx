import { parse } from "flowchart.js"
import React, { useMemo } from 'react'

export interface FlowChartProps {
  index: number,
  code: string
}

export const FlowChart: React.FC<FlowChartProps> = ({ index, code }) => {
  useMemo(() => {
    const parserOutput = parse(code)
    parserOutput.drawSVG(`flowchart-${index}`, {})
  }, [code, index])

  return <div id={`flowchart-${index}`} key={`flowchart-${index}`}/>
}
