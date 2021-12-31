/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useBackendBaseUrl } from '../../../hooks/common/use-backend-base-url'
import { useMemo } from 'react'
import { isMockMode } from '../../../utils/test-modes'

const LOCAL_FALLBACK_URL = 'ws://localhost:3000/realtime'

export const useWebsocketUrl = (): string => {
  const backendBaseUrlString = useBackendBaseUrl()
  return useMemo(() => {
    if (isMockMode()) {
      return process.env.NEXT_PUBLIC_REALTIME_URL ?? LOCAL_FALLBACK_URL
    }
    try {
      const backendBaseUrlParsed = new URL(backendBaseUrlString)
      backendBaseUrlParsed.protocol = backendBaseUrlParsed.protocol === 'https:' ? 'wss:' : 'ws:'
      backendBaseUrlParsed.pathname += 'realtime'
      return backendBaseUrlParsed.toString()
    } catch (e) {
      console.error(e)
      return LOCAL_FALLBACK_URL
    }
  }, [backendBaseUrlString])
}
