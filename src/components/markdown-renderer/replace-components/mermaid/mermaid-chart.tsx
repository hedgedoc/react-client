import mermaidAPI from 'mermaid'
import React, { ReactElement, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { v4 as uuid } from 'uuid'
import './mermaid.scss'

export interface MermaidChartProps {
  code: string
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ code }) => {

  const [diagram, setDiagram] = useState<ReactElement[] | null>(null)

  useEffect(() => {
    mermaidAPI.initialize({})
  }, [])

  useEffect(() => {
    mermaidAPI.render(uuid(), code, svgCode => setDiagram(ReactHtmlParser(svgCode)))
  }, [code])

  return (
    <div className={'text-center mermaid'} style={{maxWidth: "700px", width: "100%"}}>
      {diagram}
    </div>
  )
}
