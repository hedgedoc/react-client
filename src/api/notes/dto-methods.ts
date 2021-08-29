/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { NoteDto } from './types'
import { NoteDetails } from '../../redux/note-details/types'
import { DateTime } from 'luxon'
import { initialState } from '../../redux/note-details/reducers'

/**
 * Converts a note DTO from the API to a {@link NoteDetails} object.
 * Note that the documentContent will be set but the markdownContent and rawFrontmatterContent are empty.
 * Therefore, after getting a note from the API, you need to call the {@link setNoteContent} method.
 * @param note The NoteDTO as defined in the backend.
 * @return The NoteDetails object corresponding to the DTO.
 */
export const noteDtoToNoteDetails = (note: NoteDto): NoteDetails => {
  return {
    documentContent: note.content,
    markdownContent: '',
    rawFrontmatter: '',
    frontmatterRendererInfo: {
      frontmatterInvalid: false,
      deprecatedSyntax: false,
      offsetLines: 0
    },
    frontmatter: initialState.frontmatter,
    id: note.metadata.id,
    noteTitle: initialState.noteTitle,
    createTime: DateTime.fromISO(note.metadata.createTime),
    lastChange: {
      userName: note.metadata.updateUser.userName,
      timestamp: DateTime.fromISO(note.metadata.updateTime)
    },
    firstHeading: initialState.firstHeading,
    viewCount: note.metadata.viewCount,
    alias: note.metadata.alias,
    authorship: note.metadata.editedBy
  }
}
