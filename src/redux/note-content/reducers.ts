/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import { Reducer } from 'redux'
import { Note } from '../../api/notes'
import { YAMLMetaData } from '../../components/editor/yaml-metadata/yaml-metadata'
import {
  NoteContent,
  NoteContentAction,
  NoteContentActionType,
  SetCheckboxInMarkdownContentAction,
  SetNoteContentAction,
  SetNoteDataFromServerAction,
  SetNoteMetaDataFromRenderingAction,
  UpdateNoteTitleByFirstHeadingAction
} from './types'

export const initialState: NoteContent = {
  markdownContent: '',
  id: '',
  createTime: DateTime.fromSeconds(0),
  lastChange: {
    timestamp: DateTime.fromSeconds(0),
    userId: ''
  },
  alias: '',
  preVersionTwoNote: false,
  viewCount: 0,
  authorship: [],
  noteTitle: '',
  metadata: {
    title: '',
    description: '',
    tags: [],
    deprecatedTagsSyntax: false,
    robots: '',
    lang: 'en',
    dir: 'ltr',
    breaks: true,
    GA: '',
    disqus: '',
    type: '',
    opengraph: new Map<string, string>()
  }
}

export const NoteContentReducer: Reducer<NoteContent, NoteContentAction> = (state: NoteContent = initialState, action: NoteContentAction) => {
  switch (action.type) {
    case NoteContentActionType.SET_DOCUMENT_CONTENT:
      return {
        ...state,
        markdownContent: (action as SetNoteContentAction).content
      }
    case NoteContentActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING:
      return {
        ...state,
        noteTitle: generateNoteTitle(state.metadata, (action as UpdateNoteTitleByFirstHeadingAction).firstHeading)
      }
    case NoteContentActionType.SET_NOTE_DATA_FROM_SERVER:
      return convertNoteToNoteContent((action as SetNoteDataFromServerAction).note)
    case NoteContentActionType.SET_NOTE_META_DATA:
      return {
        ...state,
        metadata: (action as SetNoteMetaDataFromRenderingAction).metadata
      }
    case NoteContentActionType.SET_CHECKBOX_IN_MARKDOWN_CONTENT:
      return {
        ...state,
        markdownContent: setCheckboxInMarkdownContent(
          state.markdownContent,
          (action as SetCheckboxInMarkdownContentAction).lineInMarkdown,
          (action as SetCheckboxInMarkdownContentAction).checked
        )
      }
    default:
      return state
  }
}

const TASK_REGEX = /(\s*[-*] )(\[[ xX]])( .*)/
const setCheckboxInMarkdownContent = (markdownContent: string, lineInMarkdown: number, checked: boolean): string => {
  const lines = markdownContent.split('\n')
  const results = TASK_REGEX.exec(lines[lineInMarkdown])
  if (results) {
    const before = results[1]
    const after = results[3]
    lines[lineInMarkdown] = `${before}[${checked ? 'x' : ' '}]${after}`
    return lines.join('\n')
  }
  return markdownContent
}

const generateNoteTitle = (metaData: YAMLMetaData, firstHeading?: string) => {
  if (metaData?.title && metaData?.title !== '') {
    return metaData.title
  } else if (metaData?.opengraph && metaData?.opengraph.get('title') && metaData?.opengraph.get('title') !== '') {
    return (metaData?.opengraph.get('title') ?? firstHeading ?? '')
  } else {
    return (firstHeading ?? firstHeading ?? '').trim()
  }
}

const convertNoteToNoteContent = (note: Note): NoteContent => {
  return {
    markdownContent: note.content,
    metadata: initialState.metadata,
    id: note.id,
    noteTitle: '',
    createTime: DateTime.fromSeconds(note.createtime),
    lastChange: {
      userId: note.lastChange.userId,
      timestamp: DateTime.fromSeconds(note.lastChange.timestamp)
    },
    preVersionTwoNote: note.preVersionTwoNote,
    viewCount: note.viewcount,
    alias: note.alias,
    authorship: note.authorship
  }
}
