import CodeMirror, { EditorConfiguration } from 'codemirror'
import React, { useState, Fragment, useCallback } from 'react'
import { Button, ListGroup, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../../../common/modals/common-modal'
import { EditorPreferenceSelect } from './editor-preference-select'

export interface EditorSettingsButtonProps {
  editor: CodeMirror.Editor
  preferences: EditorConfiguration
  onPreferencesChange: (config: EditorConfiguration) => void
}

export const EditorPreferences: React.FC<EditorSettingsButtonProps> = ({ editor, onPreferencesChange, preferences }) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const sendPreferences = useCallback((newPreferences: EditorConfiguration) => {
    onPreferencesChange(newPreferences)
  }, [onPreferencesChange])

  return (
    <Fragment>
      <Button variant='light' onClick={() => setShowModal(true)} title={t('editor.editorToolbar.preferences')}>
        <ForkAwesomeIcon icon="wrench"/>
      </Button>
      <CommonModal
        show={showModal}
        onHide={() => setShowModal(false)}
        titleI18nKey={'editor.preferences.title'}
        closeButton={true}
        icon={'wrench'}>
        <Form>
          <ListGroup>
            <ListGroup.Item>
              <EditorPreferenceSelect onChange={sendPreferences} preferences={preferences} property={'theme'}>
                <option value='one-dark'>Dark</option>
                <option value='neat'>Light</option>
              </EditorPreferenceSelect>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferenceSelect onChange={sendPreferences} preferences={preferences} property={'keyMap'}>
                <option value='sublime'>Sublime</option>
                <option value='emacs'>Emacs</option>
                <option value='vim'>Vim</option>
              </EditorPreferenceSelect>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferenceSelect onChange={sendPreferences} preferences={preferences} property={'indentWithTabs'} asBoolean={true}>
                <option value='false'>Spaces</option>
                <option value='true'>Tab</option>
              </EditorPreferenceSelect>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferenceSelect onChange={sendPreferences} preferences={preferences} property={'indentUnit'} asInteger={true}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId='editorSpellChecker'>
                <Form.Label>
                  <Trans i18nKey='editor.preferences.spellChecker'/>
                </Form.Label>
                <Form.Control as='select' size='sm' onChange={() => alert('This feature is not yet implemented.')}>
                  <option value='off'>off</option>
                  <option value='en'>English</option>
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>
          </ListGroup>
        </Form>
      </CommonModal>
    </Fragment>
  )
}
