import React from 'react'
import { MermaidChartProps } from './types'

const MermaidChart = React.lazy(() => import('./mermaid-chart'))

export const LazyMermaid: React.FC<MermaidChartProps> = (props) => {
  return (
    <MermaidChart {...props}/>
  )
}
