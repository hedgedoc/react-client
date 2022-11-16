/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect } from 'react'
import { RenderIframe } from '../editor-page/renderer-pane/render-iframe'
import { RendererType } from '../render-page/window-post-message-communicator/rendering-message'
import { Logger } from '../../utils/logger'
import { useAsync } from 'react-use'
import { AsyncLoadingBoundary } from '../common/async-loading-boundary'
import { defaultConfig } from '../../api/common/default-config'

const logger = new Logger('Intro Content')

/**
 * Fetches the content for the customizable part of the intro page and renders it.
 */
export const IntroCustomContent: React.FC = () => {
  const { value, error, loading } = useAsync(async () => (await fetchFrontPageContent()).split('\n'), [])

  useEffect(() => {
    if (error) {
      logger.error('Error while loading custom intro content', error)
    }
  }, [error])

  return (
    <AsyncLoadingBoundary loading={loading} error={error} componentName={'custom intro content'}>
      <RenderIframe
        frameClasses={'w-100 overflow-y-hidden'}
        markdownContentLines={value as string[]}
        rendererType={RendererType.INTRO}
        adaptFrameHeightToContent={true}
      />
    </AsyncLoadingBoundary>
  )
}

/**
 * Get the intro.md contents from the public directory.
 *
 * @return The content of intro.md
 * @throws {Error} if the content can't be fetched
 */
const fetchFrontPageContent = async (): Promise<string> => {
  const response = await fetch('public/intro.md', {
    ...defaultConfig,
    method: 'GET'
  })
  if (response.status !== 200) {
    throw new Error('Error fetching intro content')
  }

  return await response.text()
}
