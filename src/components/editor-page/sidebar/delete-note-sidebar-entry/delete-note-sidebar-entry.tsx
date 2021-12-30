/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SidebarButton } from '../sidebar-button/sidebar-button'
import type { SpecificSidebarEntryProps } from '../types'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { cypressId } from '../../../../utils/cypress-attribute'
import { showErrorNotification } from '../../../../redux/ui-notifications/methods'
import { deleteNote } from '../../../../api/notes'
import { DeleteNoteModal } from './delete-note-modal'
import { ShowIf } from '../../../common/show-if/show-if'

export const DeleteNoteSidebarEntry: React.FC<SpecificSidebarEntryProps> = ({ hide, className }) => {
  useTranslation()
  const [showDialog, setShowDialog] = useState(false)
  const noteId = useApplicationState((state) => state.noteDetails.id)
  const openDialog = useCallback(() => setShowDialog(true), [])
  const closeDialog = useCallback(() => setShowDialog(false), [])
  const deleteNoteAndCloseDialog = useCallback(() => {
    deleteNote(noteId)
      .catch(showErrorNotification('landing.history.error.deleteNote.text'))
      .finally(() => setShowDialog(false))
  }, [noteId])

  return (
    <Fragment>
      <SidebarButton
        {...cypressId('sidebar.deleteNote.button')}
        icon={'trash'}
        className={className}
        hide={hide}
        onClick={openDialog}>
        <Trans i18nKey={'landing.history.menu.deleteNote'} />
      </SidebarButton>
      <ShowIf condition={showDialog}>
        <DeleteNoteModal onHide={closeDialog} onConfirm={deleteNoteAndCloseDialog} show={showDialog} />
      </ShowIf>
    </Fragment>
  )
}
