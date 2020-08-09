import React, { ChangeEvent, useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { EditorPreferenceProps } from './editor-preference-props'

export const EditorPreferenceKeymap: React.FC<EditorPreferenceProps> = ({ onChange, preferences }) => {
  useTranslation()
  const [keymap, setKeymap] = useState(preferences.keyMap)

  const selectKeymap = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value
    setKeymap(selected)
    onChange({
      ...preferences,
      keyMap: keymap
    })
  }, [preferences, keymap, setKeymap, onChange])

  return (
    <Form.Group controlId='editorKeymap'>
      <Form.Label>
        <Trans i18nKey='editor.preferences.keymap'/>
      </Form.Label>
      <Form.Control as='select' size='sm' value={keymap} onChange={selectKeymap}>
        <option value='sublime'>Sublime</option>
        <option value='emacs'>Emacs</option>
        <option value='vim'>Vim</option>
      </Form.Control>
    </Form.Group>
  )
}
