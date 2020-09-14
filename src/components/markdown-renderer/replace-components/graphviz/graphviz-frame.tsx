import { graphviz } from 'd3-graphviz'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import '@hpcc-js/wasm'
import { ShowIf } from '../../../common/show-if/show-if'

export interface GraphvizFrameProps {
  code: string
}

export const GraphvizFrame: React.FC<GraphvizFrameProps> = ({ code }) => {
  const container = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string>()

  useEffect(() => {
    setError(undefined)
  }, [])

  useEffect(() => {
    if (!container.current) {
      return
    }
    setError(undefined)
    try {
      graphviz(container.current, { useWorker: false, zoom: false })
        .onerror((message) => setError(message))
        .renderDot(code)
    } catch (error) {
      setError(error)
    }
  }, [code])

  return <Fragment>
    <ShowIf condition={!!error}>
      <Alert variant={'warning'}>{error}</Alert>
    </ShowIf>
    <div className={`text-center ${error ? 'd-none' : ''}`} ref={container} />
  </Fragment>
}
