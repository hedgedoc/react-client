import { EditorConfiguration } from 'codemirror'

export interface EditorPreferenceProps {
  onChange: (config: EditorConfiguration) => void
  preferences: EditorConfiguration
}
