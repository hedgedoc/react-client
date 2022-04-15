/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Col, ListGroup, Modal, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { getAllRevisions } from '../../../../api/revisions'
import type { ModalVisibilityProps } from '../../../common/modals/common-modal'
import { CommonModal } from '../../../common/modals/common-modal'
import { ShowIf } from '../../../common/show-if/show-if'
import { RevisionListEntry } from './revision-list-entry'
import styles from './revision-modal.module.scss'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { useAsync } from 'react-use'
import { RevisionModalFooter } from './revision-modal-footer'
import { WaitSpinner } from '../../../common/wait-spinner/wait-spinner'
import { RevisionViewer } from './revision-viewer'

/**
 * Modal that shows the available revisions and allows for comparison between them.
 * @param show true to show the modal, false otherwise.
 * @param onHide Callback that is fired when the modal is requested to close.
 */
export const RevisionModal: React.FC<ModalVisibilityProps> = ({ show, onHide }) => {
  useTranslation()
  const noteIdentifier = useApplicationState((state) => state.noteDetails.primaryAddress)
  const [selectedRevisionId, setSelectedRevisionId] = useState<number>()

  const { value, error, loading } = useAsync(() => {
    return getAllRevisions(noteIdentifier)
  }, [noteIdentifier])

  const selectRevision = useCallback((revisionId: number) => {
    setSelectedRevisionId(revisionId)
  }, [])

  const revisionList = useMemo(() => {
    if (loading || !value) {
      return null
    }
    return value.map((revisionListEntry) => (
      <RevisionListEntry
        active={selectedRevisionId === revisionListEntry.id}
        onSelect={selectRevision}
        revision={revisionListEntry}
        key={revisionListEntry.id}
      />
    ))
  }, [loading, value, selectedRevisionId, selectRevision])

  return (
    <CommonModal
      show={show}
      onHide={onHide}
      title={'editor.modal.revision.title'}
      titleIcon={'history'}
      showCloseButton={true}
      modalSize={'xl'}
      additionalClasses={styles['revision-modal']}>
      <Modal.Body>
        <Row>
          <Col lg={4} className={styles['scroll-col']}>
            <ListGroup as='ul'>{revisionList}</ListGroup>
          </Col>
          <Col lg={8} className={styles['scroll-col']}>
            <ShowIf condition={loading}>
              <WaitSpinner />
            </ShowIf>
            <ShowIf condition={!!error}>
              <Alert variant='danger'>
                <Trans i18nKey='editor.modal.revision.error' />
              </Alert>
            </ShowIf>
            <ShowIf condition={!loading && !error}>
              <RevisionViewer selectedRevisionId={selectedRevisionId} allRevisions={value} />
            </ShowIf>
          </Col>
        </Row>
      </Modal.Body>
      <RevisionModalFooter selectedRevisionId={selectedRevisionId} onHide={onHide} />
    </CommonModal>
  )
}
