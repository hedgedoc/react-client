/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import { Action } from 'redux'
import { Note } from '../../api/notes'
import { YAMLMetaData } from '../../components/editor/yaml-metadata/yaml-metadata'

export enum NoteContentActionType {
  SET_DOCUMENT_CONTENT = 'note-content/set',
  SET_NOTE_DATA_FROM_SERVER = 'note-content/data/server/set',
  SET_NOTE_META_DATA = 'note-content/metaData/set',
  UPDATE_NOTE_TITLE_BY_FIRST_HEADING = 'update-note-title-by-first-heading',
  SET_CHECKBOX_IN_MARKDOWN_CONTENT = 'toggle-checkbox-in-markdown-content'
}

interface LastChange {
  userId: string
  timestamp: DateTime
}

export interface NoteContent {
  markdownContent: string
  id: string,
  createTime: DateTime,
  lastChange: LastChange
  preVersionTwoNote: boolean,
  viewCount: number
  alias: string,
  authorship: number[]
  noteTitle: string
  firstHeading: string
  metadata: YAMLMetaData
}

export interface NoteContentAction extends Action<NoteContentActionType> {
  type: NoteContentActionType
}

export interface SetNoteContentAction extends NoteContentAction {
  type: NoteContentActionType.SET_DOCUMENT_CONTENT
  content: string
}

export interface SetNoteDataFromServerAction extends NoteContentAction {
  type: NoteContentActionType.SET_NOTE_DATA_FROM_SERVER
  note: Note
}

export interface UpdateNoteTitleByFirstHeadingAction extends NoteContentAction {
  type: NoteContentActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING
  firstHeading: string
}

export interface SetNoteMetaDataFromRenderingAction extends NoteContentAction {
  type: NoteContentActionType.SET_NOTE_META_DATA
  metadata: YAMLMetaData
}

export interface SetCheckboxInMarkdownContentAction extends NoteContentAction {
  type: NoteContentActionType.SET_CHECKBOX_IN_MARKDOWN_CONTENT,
  lineInMarkdown: number,
  checked: boolean
}
