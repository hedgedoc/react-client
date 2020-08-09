import CodeMirror from 'codemirror'
import React, { useState, Fragment } from 'react'
import { Button, ListGroup, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../../../common/modals/common-modal'

export interface EditorSettingsButtonProps {
  editor: CodeMirror.Editor
}

export const EditorPreferences: React.FC<EditorSettingsButtonProps> = ({ editor }) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

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
              <Form.Group controlId='editorTheme'>
                <Form.Label>
                  <Trans i18nKey='editor.preferences.theme'/>
                </Form.Label>
                <Form.Control as='select' size='sm'>
                  <option>Dark</option>
                  <option>Light</option>
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId='editorKeymap'>
                <Form.Label>
                  <Trans i18nKey='editor.preferences.keymap'/>
                </Form.Label>
                <Form.Control as='select' size='sm'>
                  <option>Sublime</option>
                  <option>Emacs</option>
                  <option>Vim</option>
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId='editorTabCharacter'>
                <Form.Label>
                  <Trans i18nKey='editor.preferences.tabCharacter'/>
                </Form.Label>
                <Form.Control as='select' size='sm'>
                  <option>Spaces</option>
                  <option>Tab</option>
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId='editorTabSize'>
                <Form.Label>
                  <Trans i18nKey='editor.preferences.tabSize'/>
                </Form.Label>
                <Form.Control type='number' as='input' size='sm' value={4}/>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId='editorSpellChecker'>
                <Form.Label>
                  <Trans i18nKey='editor.preferences.spellChecker'/>
                </Form.Label>
                <Form.Control as='select' size='sm'>
                  <option>off</option>
                  <option>English</option>
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>
          </ListGroup>
        </Form>
      </CommonModal>
    </Fragment>
  )
}
