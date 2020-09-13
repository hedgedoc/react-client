import { graphviz } from 'd3-graphviz'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

export interface GraphvizFrameProps {
  code: string
}

let graphVizInitialized = false

export const GraphvizFrame: React.FC<GraphvizFrameProps> = ({ code }) => {
  const [diagramId] = useState(() => 'graphviz_' + uuid().replaceAll('-', '_'))
  // const container = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!graphVizInitialized) {
      graphviz(`#${diagramId}`)
        .options({ useWorker: false, zoom: false })
        .onerror((message) => setError(message))
      graphVizInitialized = true
    }
  }, [diagramId])

  useEffect(() => {
    try {
      if (!graphVizInitialized) {
        return
      }
      graphviz(`#${diagramId}`)
        .renderDot(code)
    } catch (error) {
      setError(error)
    }
  }, [code, diagramId])

  return error
    ? <Alert variant={'warning'}>{error}</Alert>
    : <div className={'text-center'} id={diagramId}/>
}
