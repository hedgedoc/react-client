/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Reducer } from 'redux'
import { combineReducers } from 'redux'
import { UserReducer } from './user/reducers'
import { ConfigReducer } from './config/reducers'
import { MotdReducer } from './motd/reducers'
import { ApiUrlReducer } from './api-url/reducers'
import { HistoryReducer } from './history/reducers'
import { EditorConfigReducer } from './editor/reducers'
import { DarkModeConfigReducer } from './dark-mode/reducers'
import { NoteDetailsReducer } from './note-details/reducer'
import { UiNotificationReducer } from './ui-notifications/reducers'
import { RendererStatusReducer } from './renderer-status/reducers'
import type { ApplicationState } from './application-state'
import { AwarenessReducer } from './awareness/reducers'

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
  rendererStatus: RendererStatusReducer,
  awareness: AwarenessReducer
})
