import { EditorConfiguration } from 'codemirror'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

export interface EditorPreferenceSelectProps {
  onChange: (config: EditorConfiguration) => void
  preferences: EditorConfiguration
  property: 'keyMap' | 'theme' | 'indentWithTabs' | 'indentUnit'
  asBoolean?: boolean
  asInteger?: boolean
}

export const EditorPreferenceSelect: React.FC<EditorPreferenceSelectProps> = ({ property, onChange, preferences, children, asBoolean, asInteger }) => {
  useTranslation()
  const [selected, setSelected] = useState(preferences[property])

  const selectItem = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    let selectedItem: string | boolean | number = event.target.value
    if (asInteger) {
      selectedItem = parseInt(selectedItem)
    }
    setSelected(selectedItem)
    if (asBoolean) {
      selectedItem = selectedItem === 'true'
    }
    onChange({
      ...preferences,
      [property]: selectedItem
    })
  }, [preferences, property, setSelected, onChange])

  return (
    <Form.Group controlId='editorKeymap'>
      <Form.Label>
        <Trans i18nKey={`editor.preferences.${property}`}/>
      </Form.Label>
      <Form.Control as={asInteger ? 'input' : 'select'} size='sm' value={selected as string | number} onChange={selectItem} type={asInteger ? 'number' : ''}>
        { children }
      </Form.Control>
    </Form.Group>
  )
}
