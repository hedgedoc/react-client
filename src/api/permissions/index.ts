/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { sendApiDataAndGetResponse } from '../utils'
import type { NotePermissions } from '../notes/types'
import type { OwnerChangeDto, PermissionSetDto } from './types'

/**
 * Sets the owner of a note.
 * @param noteId The id of the note.
 * @param owner The username of the new owner.
 * @return The updated note permissions.
 */
export const setNoteOwner = (noteId: string, owner: string): Promise<NotePermissions> => {
  return sendApiDataAndGetResponse<OwnerChangeDto, NotePermissions>(
    `notes/${noteId}/metadata/permissions/owner`,
    'PUT',
    {
      owner
    }
  )
}

/**
 * Sets a permission for one user of a note.
 * @param noteId The id of the note.
 * @param username The username of the user to set the permission for.
 * @param canEdit true if the user should be able to update the note, false otherwise.
 */
export const setUserPermission = (noteId: string, username: string, canEdit: boolean): Promise<NotePermissions> => {
  return sendApiDataAndGetResponse<PermissionSetDto, NotePermissions>(
    `notes/${noteId}/metadata/permissions/users/${username}`,
    'PUT',
    {
      canEdit
    }
  )
}

/**
 * Sets a permission for one group of a note.
 * @param noteId The id of the note.
 * @param groupName The name of the group to set the permission for.
 * @param canEdit true if the group should be able to update the note, false otherwise.
 */
export const setGroupPermission = (noteId: string, groupName: string, canEdit: boolean): Promise<NotePermissions> => {
  return sendApiDataAndGetResponse<PermissionSetDto, NotePermissions>(
    `notes/${noteId}/metadata/permissions/groups/${groupName}`,
    'PUT',
    {
      canEdit
    }
  )
}

/**
 * Removes the permissions of a note for a user.
 * @param noteId The id of the note.
 * @param username The name of the user to remove the permission of.
 */
export const removeUserPermission = (noteId: string, username: string): Promise<NotePermissions> => {
  return sendApiDataAndGetResponse<undefined, NotePermissions>(
    `notes/${noteId}/metadata/permissions/users/${username}`,
    'DELETE',
    undefined
  )
}

/**
 * Removes the permissions of a note for a group.
 * @param noteId The id of the note.
 * @param groupName The name of the group to remove the permission of.
 */
export const removeGroupPermission = (noteId: string, groupName: string): Promise<NotePermissions> => {
  return sendApiDataAndGetResponse<undefined, NotePermissions>(
    `notes/${noteId}/metadata/permissions/groups/${groupName}`,
    'DELETE',
    undefined
  )
}
