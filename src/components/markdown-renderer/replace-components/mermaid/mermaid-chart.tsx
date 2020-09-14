import mermaid from 'mermaid'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ShowIf } from '../../../common/show-if/show-if'

export interface MermaidChartProps {
  code: string
}

interface MermaidParseError {
  str: string
}

let mermaidInitialized = false

export const MermaidChart: React.FC<MermaidChartProps> = ({ code }) => {
  const diagramContainer = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string>()
  const { t } = useTranslation()

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({ startOnLoad: false })
      mermaidInitialized = true
    }
  }, [])

  useEffect(() => {
    setError(undefined)
    try {
      if (!diagramContainer.current) {
        return
      }
      mermaid.parse(code)
      delete diagramContainer.current.dataset.processed
      diagramContainer.current.textContent = code
      mermaid.init(diagramContainer.current)
    } catch (error) {
      const message = (error as MermaidParseError).str
      if (message) {
        setError(message)
      } else {
        setError(t('renderer.mermaid.unknownError'))
        console.error(error)
      }
    }
  }, [code, t])

  return <Fragment>
    <ShowIf condition={!!error}>
      <Alert variant={'warning'}>{error}</Alert>
    </ShowIf>
    <div className={`text-center mermaid ${error ? 'd-none' : ''}`} ref={diagramContainer}/>
  </Fragment>
}
