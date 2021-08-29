/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import { Reducer } from 'redux'
import {
  NoteTextDirection,
  NoteType,
  PresentFrontmatterExtractionResult
} from '../../components/common/note-frontmatter/types'
import { NoteFrontmatter } from '../../components/common/note-frontmatter/note-frontmatter'
import { NoteDetails, NoteDetailsActions, NoteDetailsActionType } from './types'
import { noteDtoToNoteDetails } from '../../api/notes/dto-methods'
import { extractFrontmatter } from '../../components/common/note-frontmatter/extract-frontmatter'

export const initialState: NoteDetails = {
  documentContent: '',
  markdownContent: '',
  rawFrontmatter: '',
  frontmatterRendererInfo: {
    frontmatterInvalid: false,
    deprecatedSyntax: false,
    offsetLines: 0
  },
  id: '',
  createTime: DateTime.fromSeconds(0),
  lastChange: {
    timestamp: DateTime.fromSeconds(0),
    userName: ''
  },
  alias: '',
  viewCount: 0,
  authorship: [],
  noteTitle: '',
  firstHeading: '',
  frontmatter: {
    title: '',
    description: '',
    tags: [],
    deprecatedTagsSyntax: false,
    robots: '',
    lang: 'en',
    dir: NoteTextDirection.LTR,
    breaks: true,
    GA: '',
    disqus: '',
    type: NoteType.DOCUMENT,
    opengraph: new Map<string, string>()
  }
}

export const NoteDetailsReducer: Reducer<NoteDetails, NoteDetailsActions> = (
  state: NoteDetails = initialState,
  action: NoteDetailsActions
) => {
  switch (action.type) {
    case NoteDetailsActionType.SET_DOCUMENT_CONTENT:
      return createReduxStateFromDocumentContent(state, action.content)
    case NoteDetailsActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING:
      return createReduxStateFromTitleChangeAndFirstHeading(state, action.firstHeading)
    case NoteDetailsActionType.SET_NOTE_DATA_FROM_SERVER:
      return noteDtoToNoteDetails(action.note)
    case NoteDetailsActionType.UPDATE_TASK_LIST_CHECKBOX:
      return createReduxStateFromTaskListChange(state, action.changedLine, action.checkboxChecked)
    default:
      return state
  }
}

const TASK_REGEX = /(\s*(?:[-*+]|\d+[.)]) )(\[[ xX]])( .*)/

const createReduxStateFromTaskListChange = (
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
    return createReduxStateFromDocumentContent(state, lines.join('\n'))
  }
  return state
}

const createReduxStateFromDocumentContent = (state: NoteDetails, documentContent: string): NoteDetails => {
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
  return createReduxStateFromFrontmatterAndContent(
    {
      ...state,
      documentContent: documentContent,
      markdownContent: documentContent.split('\n').slice(frontmatterExtraction.frontmatterLines).join('\n')
    },
    documentContent,
    frontmatterExtraction
  )
}

const createReduxStateFromFrontmatterAndContent = (
  state: NoteDetails,
  documentContent: string,
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

const createReduxStateFromTitleChangeAndFirstHeading = (state: NoteDetails, firstHeading?: string): NoteDetails => {
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
