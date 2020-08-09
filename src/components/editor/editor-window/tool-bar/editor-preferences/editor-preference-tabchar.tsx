import React, { ChangeEvent, useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { EditorPreferenceProps } from './editor-preference-props'

export const EditorPreferenceTabchar: React.FC<EditorPreferenceProps> = ({ onChange, preferences }) => {
  useTranslation()
  const [useTabs, setUseTabs] = useState(preferences.indentWithTabs)

  const selectKeymap = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value === 'tab'
    setUseTabs(selected)
    onChange({
      ...preferences,
      indentWithTabs: useTabs
    })
  }, [preferences, useTabs, setUseTabs, onChange])

  return (
    <Form.Group controlId='editorTabChar'>
      <Form.Label>
        <Trans i18nKey='editor.preferences.tabCharacter'/>
      </Form.Label>
      <Form.Control as='select' size='sm' value={useTabs ? 'tab' : 'spaces'} onChange={selectKeymap}>
        <option value='spaces'>Spaces</option>
        <option value='tab'>Tab</option>
      </Form.Control>
    </Form.Group>
  )
}
