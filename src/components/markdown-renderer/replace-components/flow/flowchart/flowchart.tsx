import { parse } from "flowchart.js"
import React, { useEffect, useRef } from 'react'

export interface FlowChartProps {
  code: string
}

export const FlowChart: React.FC<FlowChartProps> = ({ code }) => {
  const diagramRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if(diagramRef.current === null) {
      return
    }
    const parserOutput = parse(code)
    parserOutput.drawSVG(diagramRef.current, {
      'line-width': 2,
      'fill': 'none',
      'font-size': '16px',
      'font-family': 'Source Code Pro twemoji, monospace'
    })
  }, [code])

  return <div ref={diagramRef} className={'text-center'}/>
}
