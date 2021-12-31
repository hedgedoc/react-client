/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { Fragment, useCallback, useState } from 'react'
import { Trans } from 'react-i18next'
import { PermissionOwnerChange } from './permission-owner-change'
import { PermissionOwnerInfo } from './permission-owner-info'
import { setNoteOwner } from '../../../../api/permissions'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { showErrorNotification } from '../../../../redux/ui-notifications/methods'
import { setNotePermissionsFromServer } from '../../../../redux/note-details/methods'

/**
 * Section in the permissions modal for managing the owner of a note.
 */
export const PermissionSectionOwner: React.FC = () => {
  const noteId = useApplicationState((state) => state.noteDetails.primaryAddress)
  const [changeOwner, setChangeOwner] = useState(false)

  const onSetChangeOwner = useCallback(() => {
    setChangeOwner(true)
  }, [])

  const onOwnerChange = useCallback(
    (newOwner: string) => {
      setNoteOwner(noteId, newOwner)
        .then((updatedPermissions) => {
          setNotePermissionsFromServer(updatedPermissions)
        })
        .catch(showErrorNotification('editor.modal.permissions.ownerChange.error'))
        .finally(() => {
          setChangeOwner(false)
        })
    },
    [noteId]
  )

  return (
    <Fragment>
      <h5 className={'mb-3'}>
        <Trans i18nKey={'editor.modal.permissions.owner'} />
      </h5>
      <ul className={'list-group'}>
        <li className={'list-group-item d-flex flex-row align-items-center justify-content-between'}>
          {changeOwner ? (
            <PermissionOwnerChange onConfirmOwnerChange={onOwnerChange} />
          ) : (
            <PermissionOwnerInfo onEditOwner={onSetChangeOwner} />
          )}
        </li>
      </ul>
    </Fragment>
  )
}
