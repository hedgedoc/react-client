import React, { ChangeEvent, useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { EditorPreferenceProps } from './editor-preference-props'

export const EditorPreferenceTabsize: React.FC<EditorPreferenceProps> = ({ onChange, preferences }) => {
  useTranslation()
  const [tabSize, setTabSize] = useState(preferences.indentUnit)

  const selectTabsize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selected = parseInt(event.target.value)
    setTabSize(selected)
    onChange({
      ...preferences,
      indentUnit: tabSize
    })
  }, [onChange, tabSize, setTabSize, preferences])

  return (
    <Form.Group controlId='editorTabSize'>
      <Form.Label>
        <Trans i18nKey='editor.preferences.tabSize'/>
      </Form.Label>
      <Form.Control type='number' as='input' size='sm' value={tabSize} onChange={selectTabsize} min={0}/>
    </Form.Group>
  )
}
