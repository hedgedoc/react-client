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
  SetCheckboxInMarkdownContentAction,
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

const setNoteFrontmatter = (frontmatter: NoteFrontmatter): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_NOTE_FRONTMATTER,
    frontmatter: frontmatter
  } as SetNoteFrontmatterAction)
}

const setRawNoteFrontmatter = (rawFrontmatter: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_RAW_NOTE_FRONTMATTER,
    rawFrontmatter: rawFrontmatter
  } as SetRawNoteFrontmatterAction)
}

const setFrontmatterRendererInfo = (frontmatterRendererInfo: RendererFrontmatterInfo): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_FRONTMATTER_RENDERER_INFO,
    frontmatterRendererInfo: frontmatterRendererInfo
  } as SetFrontmatterRendererInfoAction)
}

const setNoteMarkdownContent = (markdownContent: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_MARKDOWN_CONTENT,
    markdownContent: markdownContent
  } as SetNoteMarkdownContentAction)
}

export const setNoteDataFromServer = (apiResponse: NoteDto): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_NOTE_DATA_FROM_SERVER,
    note: apiResponse
  } as SetNoteDetailsFromServerAction)
  setNoteContent(apiResponse.content)
}

export const updateNoteTitleByFirstHeading = (firstHeading?: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING,
    firstHeading: firstHeading
  } as UpdateNoteTitleByFirstHeadingAction)
}

export const setCheckboxInMarkdownContent = (lineInMarkdown: number, checked: boolean): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_CHECKBOX_IN_MARKDOWN_CONTENT,
    checked: checked,
    lineInMarkdown: lineInMarkdown
  } as SetCheckboxInMarkdownContentAction)
}
