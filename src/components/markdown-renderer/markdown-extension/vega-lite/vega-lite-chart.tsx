/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useRef } from 'react'
import { Alert } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import type { VisualizationSpec } from 'vega-embed'
import { ShowIf } from '../../../common/show-if/show-if'
import { Logger } from '../../../../utils/logger'
import type { CodeProps } from '../../replace-components/code-block-component-replacer'
import { useAsync } from 'react-use'
import { AsyncLoadingBoundary } from '../../../common/async-loading-boundary'

const log = new Logger('VegaChart')

export const VegaLiteChart: React.FC<CodeProps> = ({ code }) => {
  const diagramContainer = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const {
    value: vegaEmbed,
    error: libLoadingError,
    loading: libLoading
  } = useAsync(async () => (await import(/* webpackChunkName: "vega" */ 'vega-embed')).default, [])

  const { error: renderingError } = useAsync(async () => {
    const container = diagramContainer.current
    if (!container || !vegaEmbed) {
      return
    }
    const spec = JSON.parse(code) as VisualizationSpec
    await vegaEmbed(container, spec, {
      actions: {
        export: true,
        source: false,
        compiled: false,
        editor: false
      },
      i18n: {
        PNG_ACTION: t('renderer.vega-lite.png'),
        SVG_ACTION: t('renderer.vega-lite.svg')
      }
    })
  }, [code, vegaEmbed])

  useEffect(() => {
    if (renderingError) {
      log.error('Error while rendering vega lite diagram', renderingError)
    }
  }, [renderingError])

  return (
    <AsyncLoadingBoundary loading={libLoading} error={libLoadingError} componentName={'Vega Lite'}>
      <ShowIf condition={!!renderingError}>
        <Alert variant={'danger'}>
          <Trans i18nKey={'renderer.vega-lite.errorJson'} />
        </Alert>
      </ShowIf>
      <div className={'text-center'}>
        <div ref={diagramContainer} />
      </div>
    </AsyncLoadingBoundary>
  )
}
