/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import { Action } from 'redux'
import { NoteFrontmatter } from '../../components/common/note-frontmatter/note-frontmatter'
import { NoteDto } from '../../api/notes/types'
import { RendererFrontmatterInfo } from '../../components/common/note-frontmatter/types'

export enum NoteDetailsActionType {
  SET_DOCUMENT_CONTENT = 'note-details/content/set',
  SET_MARKDOWN_CONTENT = 'note-details/content/markdown/set',
  SET_NOTE_DATA_FROM_SERVER = 'note-details/data/server/set',
  SET_NOTE_FRONTMATTER = 'note-details/frontmatter/set',
  SET_FRONTMATTER_RENDERER_INFO = 'note-details/frontmatter/renderer-info/set',
  SET_RAW_NOTE_FRONTMATTER = 'note-details/frontmatter/raw/set',
  UPDATE_NOTE_TITLE_BY_FIRST_HEADING = 'note-details/update-note-title-by-first-heading'
}

interface LastChange {
  userName: string
  timestamp: DateTime
}

export interface NoteDetails {
  documentContent: string
  markdownContent: string
  rawFrontmatter: string
  frontmatter: NoteFrontmatter
  frontmatterRendererInfo: RendererFrontmatterInfo
  id: string
  createTime: DateTime
  lastChange: LastChange
  viewCount: number
  alias: string
  authorship: string[]
  noteTitle: string
  firstHeading?: string
}

export type NoteDetailsActions =
  | SetNoteDocumentContentAction
  | SetNoteMarkdownContentAction
  | SetNoteDetailsFromServerAction
  | UpdateNoteTitleByFirstHeadingAction
  | SetNoteFrontmatterAction
  | SetRawNoteFrontmatterAction
  | SetFrontmatterRendererInfoAction

export interface SetNoteDocumentContentAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType.SET_DOCUMENT_CONTENT
  content: string
}

export interface SetNoteMarkdownContentAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType.SET_MARKDOWN_CONTENT
  markdownContent: string
}

export interface SetNoteDetailsFromServerAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType.SET_NOTE_DATA_FROM_SERVER
  note: NoteDto
}

export interface UpdateNoteTitleByFirstHeadingAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING
  firstHeading?: string
}

export interface SetNoteFrontmatterAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType.SET_NOTE_FRONTMATTER
  frontmatter: NoteFrontmatter
}

export interface SetRawNoteFrontmatterAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType.SET_RAW_NOTE_FRONTMATTER
  rawFrontmatter: string
}

export interface SetFrontmatterRendererInfoAction extends Action<NoteDetailsActionType> {
  type: NoteDetailsActionType.SET_FRONTMATTER_RENDERER_INFO
  frontmatterRendererInfo: RendererFrontmatterInfo
}
