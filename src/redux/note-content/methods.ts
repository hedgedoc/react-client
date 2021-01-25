/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { Note } from '../../api/notes'
import { YAMLMetaData } from '../../components/editor/yaml-metadata/yaml-metadata'
import { initialState } from './reducers'
import {
  NoteContentActionType,
  SetCheckboxInMarkdownContentAction,
  SetNoteContentAction,
  SetNoteDataFromServerAction,
  SetNoteMetaDataFromRenderingAction,
  UpdateNoteTitleByFirstHeadingAction
} from './types'

export const setNoteMarkdownContent = (content: string): void => {
  const action: SetNoteContentAction = {
    type: NoteContentActionType.SET_DOCUMENT_CONTENT,
    content
  }
  store.dispatch(action)
}

export const setNoteDataFromServer = (apiResponse: Note): void => {
  store.dispatch({
    type: NoteContentActionType.SET_NOTE_DATA_FROM_SERVER,
    note: apiResponse
  } as SetNoteDataFromServerAction)
}

export const updateNoteTitleByFirstHeading = (firstHeading?: string): void => {
  store.dispatch({
    type: NoteContentActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING,
    firstHeading: firstHeading
  } as UpdateNoteTitleByFirstHeadingAction)
}

export const setNoteMetadata = (metadata: YAMLMetaData | undefined): void => {
  if (!metadata) {
    metadata = initialState.metadata
  }
  store.dispatch({
    type: NoteContentActionType.SET_NOTE_META_DATA,
    metadata
  } as SetNoteMetaDataFromRenderingAction)
}

export const SetCheckboxInMarkdownContent = (lineInMarkdown: number, checked: boolean): void => {
  store.dispatch({
    type: NoteContentActionType.SET_CHECKBOX_IN_MARKDOWN_CONTENT,
    checked: checked,
    lineInMarkdown: lineInMarkdown
  } as SetCheckboxInMarkdownContentAction)
}
