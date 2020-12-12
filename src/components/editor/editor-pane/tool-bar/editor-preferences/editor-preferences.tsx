/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import React, { Fragment, useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../../../common/modals/common-modal'
import { EditorPreferenceInput, EditorPreferenceInputType } from './editor-preference-input'
import { EditorPreferenceLigaturesSelect } from './editor-preference-ligatures-select'
import { EditorPreferenceProperty, EditorPreferencePropertyInput } from './editor-preference-property-input'

export const EditorPreferences: React.FC = () => {
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
        titleI18nKey={'editor.modal.preferences.title'}
        closeButton={true}
        icon={'wrench'}>
        <Form>
          <ListGroup>
            <ListGroup.Item>
              <EditorPreferencePropertyInput property={EditorPreferenceProperty.THEME}>
                <option value='one-dark'>Dark</option>
                <option value='neat'>Light</option>
              </EditorPreferencePropertyInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferencePropertyInput property={EditorPreferenceProperty.KEYMAP}>
                <option value='sublime'>Sublime</option>
                <option value='emacs'>Emacs</option>
                <option value='vim'>Vim</option>
              </EditorPreferencePropertyInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferencePropertyInput property={EditorPreferenceProperty.INDENT_WITH_TABS}>
                <option value='false'>Spaces</option>
                <option value='true'>Tab</option>
              </EditorPreferencePropertyInput>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferenceLigaturesSelect/>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferencePropertyInput property={EditorPreferenceProperty.INDENT_UNIT}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <EditorPreferenceInput onChange={() => alert('This feature is not yet implemented.')} property={EditorPreferenceProperty.SPELL_CHECK} type={EditorPreferenceInputType.STRING}>
                <option value='off'>off</option>
                <option value='en'>English</option>
              </EditorPreferenceInput>
            </ListGroup.Item>
          </ListGroup>
        </Form>
      </CommonModal>
    </Fragment>
  )
}
