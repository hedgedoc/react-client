import { Reducer } from 'redux'
import { EditorMode } from '../../components/editor/app-bar/editor-view-mode'
import {
  EditorConfig,
  EditorConfigActions,
  EditorConfigActionType,
  SetEditorConfigAction, SetEditorPreferencesAction,
  SetEditorSyncScrollAction
} from './types'

export const initialState: EditorConfig = {
  editorMode: EditorMode.BOTH,
  syncScroll: true,
  preferences: {
    theme: 'one-dark',
    keyMap: 'sublime',
    indentUnit: 4,
    indentWithTabs: false
  }
}

export const EditorConfigReducer: Reducer<EditorConfig, EditorConfigActions> = (state: EditorConfig = initialState, action: EditorConfigActions) => {
  switch (action.type) {
    case EditorConfigActionType.SET_EDITOR_VIEW_MODE:
      return {
        ...state,
        editorMode: (action as SetEditorConfigAction).mode
      }
    case EditorConfigActionType.SET_SYNC_SCROLL:
      return {
        ...state,
        syncScroll: (action as SetEditorSyncScrollAction).syncScroll
      }
    case EditorConfigActionType.SET_EDITOR_PREFERENCES:
      return {
        ...state,
        preferences: (action as SetEditorPreferencesAction).preferences
      }
    default:
      return state
  }
}
