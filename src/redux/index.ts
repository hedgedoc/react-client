/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { combineReducers, createStore, Reducer } from 'redux'
import { ConfigFromBackend } from '../api/config/types'
import { ApiUrlReducer } from './api-url/reducers'
import { ApiUrlObject } from './api-url/types'
import { MotdReducer } from './motd/reducers'
import { OptionalMotdState } from './motd/types'
import { ConfigReducer } from './config/reducers'
import { DarkModeConfigReducer } from './dark-mode/reducers'
import { DarkModeConfig } from './dark-mode/types'
import { EditorConfigReducer } from './editor/reducers'
import { EditorConfig } from './editor/types'
import { NoteDetailsReducer } from './note-details/reducer'
import { NoteDetails } from './note-details/types'
import { UserReducer } from './user/reducers'
import { OptionalUserState } from './user/types'
import { UiNotificationState } from './ui-notifications/types'
import { UiNotificationReducer } from './ui-notifications/reducers'
import { HistoryEntry } from './history/types'
import { HistoryReducer } from './history/reducers'
import { RendererStatusReducer } from './renderer-status/reducers'
import { RendererStatus } from './renderer-status/types'

export interface ApplicationState {
  user: OptionalUserState
  config: ConfigFromBackend
  motd: OptionalMotdState
  history: HistoryEntry[]
  apiUrl: ApiUrlObject
  editorConfig: EditorConfig
  darkMode: DarkModeConfig
  noteDetails: NoteDetails
  uiNotifications: UiNotificationState
  rendererStatus: RendererStatus
}

export const allReducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  user: UserReducer,
  config: ConfigReducer,
  motd: MotdReducer,
  apiUrl: ApiUrlReducer,
  history: HistoryReducer,
  editorConfig: EditorConfigReducer,
  darkMode: DarkModeConfigReducer,
  noteDetails: NoteDetailsReducer,
  uiNotifications: UiNotificationReducer,
  rendererStatus: RendererStatusReducer
})

export const store = createStore(allReducers)
