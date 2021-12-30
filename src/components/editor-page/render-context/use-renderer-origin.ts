/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useApplicationState } from '../../../hooks/common/use-application-state'
import { useMemo } from 'react'

/**
 * Returns the url origin of the renderer
 */
export const useRendererOrigin = (): string => {
  const editorOrigin = useApplicationState((state) => state.config.iframeCommunication.rendererOrigin)

  return useMemo(() => {
    return process.env.NEXT_PUBLIC_IGNORE_IFRAME_ORIGIN_CONFIG !== undefined
      ? window.location.origin + '/'
      : editorOrigin
  }, [editorOrigin])
}
