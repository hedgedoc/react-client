/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useMemo } from 'react'
import { WebsocketProvider } from 'y-websocket'
import { useApplicationState } from '../../../../../hooks/common/use-application-state'
import { useWebsocketUrl } from '../../../hooks/useWebsocketUrl'
import type { Doc } from 'yjs'

export const useWebsocketProviderConnection = (yDoc: Doc): WebsocketProvider => {
  const noteId = useApplicationState((state) => state.noteDetails.id)
  const websocketUrl = useWebsocketUrl()
  const websocketProvider = useMemo(() => {
    return new WebsocketProvider(websocketUrl, '', yDoc, { params: { noteId } })
  }, [noteId, websocketUrl, yDoc])

  useEffect(() => {
    websocketProvider.connectBc()
    return () => {
      websocketProvider.disconnect()
      websocketProvider.disconnectBc()
    }
  }, [websocketProvider])

  return websocketProvider
}
