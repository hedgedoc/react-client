import { setEditorMode } from '../../../redux/editor/methods'
import { EditorMode } from '../app-bar/editor-view-mode'
import { isMac } from '../editor-pane/key-map'

export const shortcutHandler = (event: KeyboardEvent): void => {
  const modifierKey = isMac ? event.metaKey : event.ctrlKey

  if (modifierKey && event.altKey && event.key === 'b') {
    setEditorMode(EditorMode.BOTH)
  }

  if (modifierKey && event.altKey && event.key === 'v') {
    setEditorMode(EditorMode.PREVIEW)
  }

  if (modifierKey && event.altKey && event.key === 'e') {
    setEditorMode(EditorMode.EDITOR)
  }
}
