/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { Trans } from 'react-i18next'
import { SidebarButton } from '../sidebar-button'
import { useContextOrStandaloneIframeCommunicator } from '../../render-context/iframe-communicator-context-provider'

export const ExportRawHtmlSidebarEntry: React.FC = () => {
  const iframeCommunicator = useContextOrStandaloneIframeCommunicator()

  const onClicked = useCallback(() => {
    iframeCommunicator.sendHtmlExportClicked(true)
  }, [iframeCommunicator])

  return (
    <SidebarButton icon={ 'file-code-o' } onClick={ onClicked }>
      <Trans i18nKey="editor.export.rawHtml"/>
    </SidebarButton>
  )
}
