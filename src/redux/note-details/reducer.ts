/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Reducer } from 'redux'
import { PresentFrontmatterExtractionResult } from '../../components/common/note-frontmatter/types'
import { NoteFrontmatter } from '../../components/common/note-frontmatter/note-frontmatter'
import { NoteDetails, NoteDetailsActions, NoteDetailsActionType } from './types'
import { noteDtoToNoteDetails } from '../../api/notes/dto-methods'
import { extractFrontmatter } from '../../components/common/note-frontmatter/extract-frontmatter'
import { NoteDto } from '../../api/notes/types'
import { initialState } from './initial-state'

export const NoteDetailsReducer: Reducer<NoteDetails, NoteDetailsActions> = (
  state: NoteDetails = initialState,
  action: NoteDetailsActions
) => {
  switch (action.type) {
    case NoteDetailsActionType.SET_DOCUMENT_CONTENT:
      return buildStateFromDocumentContentUpdate(state, action.content)
    case NoteDetailsActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING:
      return buildStateFromFirstHeadingUpdate(state, action.firstHeading)
    case NoteDetailsActionType.SET_NOTE_DATA_FROM_SERVER:
      return buildStateFromServerDto(state, action.dto)
    case NoteDetailsActionType.UPDATE_TASK_LIST_CHECKBOX:
      return buildStateFromTaskListUpdate(state, action.changedLine, action.checkboxChecked)
    default:
      return state
  }
}

const TASK_REGEX = /(\s*(?:[-*+]|\d+[.)]) )(\[[ xX]])( .*)/

/**
 * Builds a {@link NoteDetails} redux state from a DTO received as an API response.
 * @param state The previous redux state.
 * @param dto The first DTO received from the API containing the relevant information about the note.
 * @return An updated {@link NoteDetails} redux state.
 */
const buildStateFromServerDto = (state: NoteDetails, dto: NoteDto): NoteDetails => {
  const newState = {
    ...state,
    ...noteDtoToNoteDetails(dto)
  }
  return buildStateFromDocumentContentUpdate(newState, newState.documentContent)
}

/**
 * Builds a {@link NoteDetails} redux state where a checkbox in the markdown content either gets checked or unchecked.
 * @param state The previous redux state.
 * @param changedLine The number of the line in which the checkbox should be updated.
 * @param checkboxChecked true if the checkbox should be checked, false otherwise.
 * @return An updated {@link NoteDetails} redux state.
 */
const buildStateFromTaskListUpdate = (
  state: NoteDetails,
  changedLine: number,
  checkboxChecked: boolean
): NoteDetails => {
  const lines = state.documentContent.split('\n')
  const results = TASK_REGEX.exec(lines[changedLine])
  if (results) {
    const before = results[1]
    const after = results[3]
    lines[changedLine] = `${before}[${checkboxChecked ? 'x' : ' '}]${after}`
    return buildStateFromDocumentContentUpdate(state, lines.join('\n'))
  }
  return state
}

/**
 * Builds a {@link NoteDetails} redux state from a fresh document content.
 * @param state The previous redux state.
 * @param documentContent The fresh document content consisting of the frontmatter and markdown part.
 * @return An updated {@link NoteDetails} redux state.
 */
const buildStateFromDocumentContentUpdate = (state: NoteDetails, documentContent: string): NoteDetails => {
  const frontmatterExtraction = extractFrontmatter(documentContent)
  if (!frontmatterExtraction.frontmatterPresent) {
    return {
      ...state,
      documentContent: documentContent,
      markdownContent: documentContent,
      rawFrontmatter: '',
      frontmatter: initialState.frontmatter,
      frontmatterRendererInfo: initialState.frontmatterRendererInfo
    }
  }
  return buildStateFromFrontmatterUpdate(
    {
      ...state,
      documentContent: documentContent,
      markdownContent: documentContent.split('\n').slice(frontmatterExtraction.frontmatterLines).join('\n')
    },
    frontmatterExtraction
  )
}

/**
 * Builds a {@link NoteDetails} redux state from extracted frontmatter data.
 * @param state The previous redux state.
 * @param frontmatterExtraction The result of the frontmatter extraction containing the raw data and the line offset.
 * @return An updated {@link NoteDetails} redux state.
 */
const buildStateFromFrontmatterUpdate = (
  state: NoteDetails,
  frontmatterExtraction: PresentFrontmatterExtractionResult
): NoteDetails => {
  if (frontmatterExtraction.rawFrontmatterText === state.rawFrontmatter) {
    return state
  }
  try {
    const frontmatter = NoteFrontmatter.parseFromString(frontmatterExtraction.rawFrontmatterText)
    return {
      ...state,
      rawFrontmatter: frontmatterExtraction.rawFrontmatterText,
      frontmatter: frontmatter,
      noteTitle: generateNoteTitle(frontmatter),
      frontmatterRendererInfo: {
        offsetLines: frontmatterExtraction.frontmatterLines,
        deprecatedSyntax: frontmatter.deprecatedTagsSyntax,
        frontmatterInvalid: false
      }
    }
  } catch (e) {
    return {
      ...state,
      rawFrontmatter: frontmatterExtraction.rawFrontmatterText,
      frontmatter: initialState.frontmatter,
      frontmatterRendererInfo: {
        offsetLines: frontmatterExtraction.frontmatterLines,
        deprecatedSyntax: false,
        frontmatterInvalid: true
      }
    }
  }
}

/**
 * Builds a {@link NoteDetails} redux state with an updated note title from frontmatter data and the first heading.
 * @param state The previous redux state.
 * @param firstHeading The first heading of the document. Should be {@code undefined} if there is no such heading.
 * @return An updated {@link NoteDetails} redux state.
 */
const buildStateFromFirstHeadingUpdate = (state: NoteDetails, firstHeading?: string): NoteDetails => {
  return {
    ...state,
    firstHeading: firstHeading,
    noteTitle: generateNoteTitle(state.frontmatter, firstHeading)
  }
}

const generateNoteTitle = (frontmatter: NoteFrontmatter, firstHeading?: string) => {
  if (frontmatter?.title && frontmatter?.title !== '') {
    return frontmatter.title.trim()
  } else if (
    frontmatter?.opengraph &&
    frontmatter?.opengraph.get('title') &&
    frontmatter?.opengraph.get('title') !== ''
  ) {
    return (frontmatter?.opengraph.get('title') ?? firstHeading ?? '').trim()
  } else {
    return (firstHeading ?? firstHeading ?? '').trim()
  }
}
