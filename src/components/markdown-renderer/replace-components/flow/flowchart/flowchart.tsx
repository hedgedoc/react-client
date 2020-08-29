import { parse } from "flowchart.js"
import React, { useEffect } from 'react'

export interface FlowChartProps {
  index: number,
  code: string
}

export const FlowChart: React.FC<FlowChartProps> = ({ index, code }) => {
  useEffect(() => {
    const parserOutput = parse(code)
    parserOutput.drawSVG(`flowchart-${index}`, {})
  }, [code, index])

  return <div id={`flowchart-${index}`} key={`flowchart-${index}`}/>
}
