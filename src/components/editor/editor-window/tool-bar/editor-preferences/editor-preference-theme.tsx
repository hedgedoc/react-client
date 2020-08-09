import React, { ChangeEvent, useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { EditorPreferenceProps } from './editor-preference-props'

export const EditorPreferenceTheme: React.FC<EditorPreferenceProps> = ({ onChange, preferences }) => {
  useTranslation()
  const [theme, setTheme] = useState(preferences.theme)

  const selectTheme = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value
    setTheme(selected)
    onChange({
      ...preferences,
      theme: theme
    })
  }, [onChange, theme, setTheme, preferences])

  return (
    <Form.Group controlId='editorTheme'>
      <Form.Label>
        <Trans i18nKey='editor.preferences.theme'/>
      </Form.Label>
      <Form.Control as='select' size='sm' onChange={selectTheme} value={theme}>
        <option value='one-dark'>Dark</option>
        <option value='neat'>Light</option>
      </Form.Control>
    </Form.Group>
  )
}
