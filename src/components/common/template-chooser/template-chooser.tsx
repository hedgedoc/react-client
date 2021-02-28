/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../redux'
import { CommonModal, CommonModalProps } from '../modals/common-modal'
import { ShowIf } from '../show-if/show-if'

export const TemplateChooser: React.FC<Pick<CommonModalProps, 'show' | 'onHide'>> = ({ show, onHide }) => {
  const isFreeModeEnabled = useSelector((state: ApplicationState) => state.config.freeUrlMode)
  const [customAlias, setCustomAlias] = useState('')
  const [noteCreatable, setNoteCreatable] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const onChangeCustomAliasField = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCustomAlias(event.target.value)
  }, [])

  useEffect(() => {
    const invalid = selectedTemplate === '' || /^\W*$/.test(customAlias)
    setNoteCreatable(!invalid)
  }, [customAlias, selectedTemplate])

  return (
    <CommonModal
      show={ show }
      onHide={ onHide }
      closeButton={ true }
      size={ 'lg' }
      titleI18nKey={ 'common.modal.chooseTemplate.title' }>
      <Modal.Body>
        <span>
          Templates will be listed here
          <button onClick={ () => setSelectedTemplate('test') }>Debug set selected template</button>
        </span>
        <ShowIf condition={ isFreeModeEnabled }>
          <hr/>
          <Form>
            <Form.Row>
              <Form.Label column={ 'sm' } lg={ 2 }>
                <Trans i18nKey={ 'common.modal.chooseTemplate.customNoteAlias' }/>
              </Form.Label>
              <Col>
                <Form.Control type={ 'text' } size={ 'sm' } value={ customAlias }
                              onChange={ onChangeCustomAliasField }/>
              </Col>
            </Form.Row>
          </Form>
        </ShowIf>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={ 'primary' } disabled={ !noteCreatable }>
          <Trans i18nKey={ 'common.modal.chooseTemplate.createFromTemplate' }/>
        </Button>
      </Modal.Footer>
    </CommonModal>
  )
}
