/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Editor } from 'codemirror'
import { useMemo } from 'react'
import { Doc } from 'yjs'
import { useWebsocketProviderConnection } from './use-websocket-provider-connection'
import { useCodemirrorBinding } from './use-codemirror-binding'
import { useSyncAwarenessIntoRedux } from './use-sync-awareness-into-redux'

export const useYjs = (editor: Editor | undefined): void => {
  const yDoc = useMemo(() => new Doc(), [])
  const websocketProvider = useWebsocketProviderConnection(yDoc)
  useSyncAwarenessIntoRedux(websocketProvider)
  useCodemirrorBinding(editor, websocketProvider)
}
