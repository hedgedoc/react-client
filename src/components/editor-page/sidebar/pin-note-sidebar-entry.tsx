/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SidebarButton } from './sidebar-button'
import { SpecificSidebarEntryProps } from './types'
import { useParams } from 'react-router-dom'
import { EditorPagePathParams } from '../editor-page'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../redux'
import { toggleHistoryEntryPinning } from '../../../redux/history/methods'

export const PinNoteSidebarEntry: React.FC<SpecificSidebarEntryProps> = ({ className, hide }) => {
  useTranslation()
  const { id } = useParams<EditorPagePathParams>()
  const history = useSelector((state: ApplicationState) => state.history)

  const isPinned = useMemo(() => {
    const entry = history.find(entry => entry.identifier === id)
    if (!entry) {
      return false
    }
    return entry.pinStatus
  }, [id, history])

  const onPinClicked = useCallback(() => {
    toggleHistoryEntryPinning(id)
  }, [id])

  return (
    <SidebarButton icon={ 'thumb-tack' } hide={ hide } onClick={ onPinClicked }
                   className={ `${ className ?? '' } ${ isPinned ? 'icon-highlighted' : '' }` }>
      <Trans i18nKey={ isPinned ? 'editor.documentBar.pinnedToHistory' : 'editor.documentBar.pinNoteToHistory' }/>
    </SidebarButton>
  )
}
