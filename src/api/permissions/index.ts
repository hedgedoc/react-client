/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { NotePermissions } from '../notes/types'
import type { OwnerChangeDto, PermissionSetDto } from './types'
import { ApiRequest } from '../common/api-request'

/**
 * Sets the owner of a note.
 * @param noteId The id of the note.
 * @param owner The username of the new owner.
 * @return The updated note permissions.
 */
export const setNoteOwner = async (noteId: string, owner: string): Promise<NotePermissions> => {
  const response = await new ApiRequest(`notes/${noteId}/metadata/permissions/owner`)
    .withJsonBody<OwnerChangeDto>({
      owner
    })
    .sendPutRequest()
  return response.getResponseJson<NotePermissions>()
}

/**
 * Sets a permission for one user of a note.
 * @param noteId The id of the note.
 * @param username The username of the user to set the permission for.
 * @param canEdit true if the user should be able to update the note, false otherwise.
 */
export const setUserPermission = async (
  noteId: string,
  username: string,
  canEdit: boolean
): Promise<NotePermissions> => {
  const response = await new ApiRequest(`notes/${noteId}/metadata/permissions/users/${username}`)
    .withJsonBody<PermissionSetDto>({
      canEdit
    })
    .sendPutRequest()
  return response.getResponseJson<NotePermissions>()
}

/**
 * Sets a permission for one group of a note.
 * @param noteId The id of the note.
 * @param groupName The name of the group to set the permission for.
 * @param canEdit true if the group should be able to update the note, false otherwise.
 */
export const setGroupPermission = async (
  noteId: string,
  groupName: string,
  canEdit: boolean
): Promise<NotePermissions> => {
  const response = await new ApiRequest(`notes/${noteId}/metadata/permissions/groups/${groupName}`)
    .withJsonBody<PermissionSetDto>({
      canEdit
    })
    .sendPutRequest()
  return response.getResponseJson<NotePermissions>()
}

/**
 * Removes the permissions of a note for a user.
 * @param noteId The id of the note.
 * @param username The name of the user to remove the permission of.
 */
export const removeUserPermission = async (noteId: string, username: string): Promise<NotePermissions> => {
  const response = await new ApiRequest(`notes/${noteId}/metadata/permissions/users/${username}`)
    .withExpectedStatusCode(200)
    .sendDeleteRequest()
  return response.getResponseJson<NotePermissions>()
}

/**
 * Removes the permissions of a note for a group.
 * @param noteId The id of the note.
 * @param groupName The name of the group to remove the permission of.
 */
export const removeGroupPermission = async (noteId: string, groupName: string): Promise<NotePermissions> => {
  const response = await new ApiRequest(`notes/${noteId}/metadata/permissions/groups/${groupName}`)
    .withExpectedStatusCode(200)
    .sendDeleteRequest()
  return response.getResponseJson<NotePermissions>()
}
