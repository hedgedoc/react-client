import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import embed from 'vega-embed'
import { ShowIf } from '../../../common/show-if/show-if'

export interface VegaChartProps {
  code: string
}

export const VegaChart: React.FC<VegaChartProps> = ({ code }) => {
  const diagramContainer = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string>()
  const { t } = useTranslation()

  const showError = useCallback((error: string) => {
    if (!diagramContainer.current) {
      return
    }
    console.error(error)
    setError(error)
  }, [])

  useEffect(() => {
    if (!diagramContainer.current) {
      return
    }
    console.log('vega-lite')
    embed(diagramContainer.current, code)
      .then(result => console.log(result))
      .catch(err => showError(err))
  }, [code, showError, t])

  return <Fragment>
    <ShowIf condition={!!error}>
      <Alert variant={'warning'}>{error}</Alert>
    </ShowIf>
    <div className={'text-center'} ref={diagramContainer}/>
  </Fragment>
}
