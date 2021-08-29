/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { NoteDto } from '../../api/notes/types'
import { NoteFrontmatter } from '../../components/common/note-frontmatter/note-frontmatter'
import { initialState } from './reducers'
import {
  NoteDetailsActionType,
  SetFrontmatterRendererInfoAction,
  SetNoteDetailsFromServerAction,
  SetNoteDocumentContentAction,
  SetNoteFrontmatterAction,
  SetNoteMarkdownContentAction,
  SetRawNoteFrontmatterAction,
  UpdateNoteTitleByFirstHeadingAction
} from './types'
import { extractFrontmatter } from '../../components/common/note-frontmatter/extract-frontmatter'
import { RendererFrontmatterInfo } from '../../components/common/note-frontmatter/types'

const TASK_REGEX = /(\s*(?:[-*+]|\d+[.)]) )(\[[ xX]])( .*)/

/**
 * Sets the content of the current note, extracts and parses the frontmatter and extracts the markdown content part.
 * @param content The note content as it is written inside the editor pane.
 */
export const setNoteContent = (content: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_DOCUMENT_CONTENT,
    content: content
  } as SetNoteDocumentContentAction)
  const frontmatterExtraction = extractFrontmatter(content)

  if (frontmatterExtraction.frontmatterPresent) {
    const markdownContent = content.split('\n').slice(frontmatterExtraction.frontmatterLines).join('\n')
    setNoteMarkdownContent(markdownContent)

    const previousRawFrontmatter = store.getState().noteDetails.rawFrontmatter
    if (frontmatterExtraction.rawFrontmatterText === previousRawFrontmatter) {
      return
    }
    try {
      const frontmatter = NoteFrontmatter.parseFromString(frontmatterExtraction.rawFrontmatterText)
      setRawNoteFrontmatter(frontmatterExtraction.rawFrontmatterText)
      setNoteFrontmatter(frontmatter)
      setFrontmatterRendererInfo({
        offsetLines: frontmatterExtraction.frontmatterLines,
        deprecatedSyntax: frontmatter.deprecatedTagsSyntax,
        frontmatterInvalid: false
      })
    } catch (e) {
      setRawNoteFrontmatter(frontmatterExtraction.rawFrontmatterText)
      setNoteFrontmatter(initialState.frontmatter)
      setFrontmatterRendererInfo({
        offsetLines: frontmatterExtraction.frontmatterLines,
        deprecatedSyntax: false,
        frontmatterInvalid: true
      })
    }
    return
  }

  setNoteMarkdownContent(content)
  setFrontmatterRendererInfo(initialState.frontmatterRendererInfo)
  setRawNoteFrontmatter('')
  setNoteFrontmatter(initialState.frontmatter)
}

/**
 * Stores the given frontmatter object to redux.
 * @param frontmatter The frontmatter object to store.
 */
const setNoteFrontmatter = (frontmatter: NoteFrontmatter): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_NOTE_FRONTMATTER,
    frontmatter: frontmatter
  } as SetNoteFrontmatterAction)
}

/**
 * Stores the raw frontmatter content to redux for later checks for changes.
 * @param rawFrontmatter The raw frontmatter that is extracted.
 *                       Should be valid yaml syntax and not include the boundaries.
 */
const setRawNoteFrontmatter = (rawFrontmatter: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_RAW_NOTE_FRONTMATTER,
    rawFrontmatter: rawFrontmatter
  } as SetRawNoteFrontmatterAction)
}

/**
 * Stores the frontmatter renderer info content to redux.
 * @param frontmatterRendererInfo The {@link RendererFrontmatterInfo} object to store.
 */
const setFrontmatterRendererInfo = (frontmatterRendererInfo: RendererFrontmatterInfo): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_FRONTMATTER_RENDERER_INFO,
    frontmatterRendererInfo: frontmatterRendererInfo
  } as SetFrontmatterRendererInfoAction)
}

/**
 * Sets the markdown content of the note which is later parsed by markdown-it.
 * @param markdownContent The markdown content of the note without the frontmatter part.
 */
const setNoteMarkdownContent = (markdownContent: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_MARKDOWN_CONTENT,
    markdownContent: markdownContent
  } as SetNoteMarkdownContentAction)
}

/**
 * Sets the note metadata for the current note from an API response DTO to the redux.
 * @param apiResponse The NoteDTO received from the API to store into redux.
 */
export const setNoteDataFromServer = (apiResponse: NoteDto): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_NOTE_DATA_FROM_SERVER,
    note: apiResponse
  } as SetNoteDetailsFromServerAction)
  setNoteContent(apiResponse.content)
}

/**
 * Updates the note title in the redux by the first heading found in the markdown content.
 * @param firstHeading The content of the first heading found in the markdown content.
 */
export const updateNoteTitleByFirstHeading = (firstHeading?: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING,
    firstHeading: firstHeading
  } as UpdateNoteTitleByFirstHeadingAction)
}

/**
 * Changes a checkbox state in the note document content. Triggered when a checkbox in the rendering is clicked.
 * @param lineInDocumentContent The line in the document content to change.
 * @param checked true if the checkbox is checked, false otherwise.
 */
export const setCheckboxInMarkdownContent = (lineInDocumentContent: number, checked: boolean): void => {
  const content = store.getState().noteDetails.documentContent
  const lines = content.split('\n')
  const results = TASK_REGEX.exec(lines[lineInDocumentContent])
  if (results) {
    const before = results[1]
    const after = results[3]
    lines[lineInDocumentContent] = `${before}[${checked ? 'x' : ' '}]${after}`
    setNoteContent(lines.join('\n'))
    return
  }
  setNoteContent(content)
}
