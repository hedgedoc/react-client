/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from 'react'
import type { YDocMessageTransporter } from '@hedgedoc/realtime'
import { Optional } from '@mrdrogdrog/optional'

/**
 * Checks if the given message transporter has received at least one full synchronisation.
 *
 * @param connection The connection whose sync status should be checked
 * @return If at least one full synchronisation is occurred.
 */
export const useIsConnectionSynced = (connection: YDocMessageTransporter | null): boolean => {
  const [editorEnabled, setEditorEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (connection === null) {
      return
    }
    const enableEditor = () => setEditorEnabled(true)
    const disableEditor = () => setEditorEnabled(false)
    connection.on('synced', enableEditor).on('disconnected', disableEditor)
    return () => {
      connection.off('synced', enableEditor).off('disconnected', disableEditor)
    }
  }, [connection])

  return editorEnabled
}
