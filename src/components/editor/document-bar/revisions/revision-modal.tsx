import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Col, ListGroup, Modal, Row, Button } from 'react-bootstrap'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { Trans, useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { getAllRevisions, getRevision, Revision, RevisionListEntry } from '../../../../api/revisions'
import { UserResponse } from '../../../../api/users/types'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal, CommonModalProps } from '../../../common/modals/common-modal'
import { ShowIf } from '../../../common/show-if/show-if'
import { RevisionButtonProps } from './revision-button'
import './revision-modal.scss'
import { downloadRevision, getUserDataForRevision } from './utils'

export const RevisionModal: React.FC<CommonModalProps & RevisionButtonProps> = ({ show, onHide, icon, titleI18nKey, noteContent }) => {
  const { t } = useTranslation()
  const [revisions, setRevisions] = useState<RevisionListEntry[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedRevision, setSelectedRevision] = useState<Revision | null>(null)
  const [error, setError] = useState(false)
  const revisionAuthorListMap = useRef(new Map<number, UserResponse[]>())
  const revisionCacheMap = useRef(new Map<number, Revision>())
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    getAllRevisions(id).then(fetchedRevisions => {
      fetchedRevisions.forEach(revision => {
        const authorData = getUserDataForRevision(revision.authors)
        revisionAuthorListMap.current.set(revision.timestamp, authorData)
      })
      setRevisions(fetchedRevisions)
      if (fetchedRevisions.length >= 1) {
        setSelected(fetchedRevisions[0].timestamp)
      }
    }).catch(() => setError(true))
  }, [setRevisions, setError, id])

  useEffect(() => {
    if (selected === null) {
      return
    }
    const cacheEntry = revisionCacheMap.current.get(selected)
    if (cacheEntry) {
      setSelectedRevision(cacheEntry)
      return
    }
    getRevision(id, selected).then(fetchedRevision => {
      setSelectedRevision(fetchedRevision)
      revisionCacheMap.current.set(selected, fetchedRevision)
    }).catch(() => setError(true))
  }, [selected, id])

  return (
    <CommonModal show={show} onHide={onHide} titleI18nKey={titleI18nKey} icon={icon} closeButton={true} size={'xl'} additionalClasses='revision-modal'>
      <Modal.Body>
        <Row>
          <Col lg={4} className={'scroll-col'}>
            <ListGroup as='ul'>
              {
                revisions.map((revision, revIndex) => {
                  return (
                    <ListGroup.Item as='li' active={selected === revision.timestamp} onClick={() => setSelected(revision.timestamp)} className='user-select-none revision-item' key={revIndex}>
                      <ForkAwesomeIcon icon={'clock-o'} className='mx-2'/>
                      <span>{ moment(revision.timestamp * 1000).format('LLLL') }</span>
                      <br/>
                      <ForkAwesomeIcon icon={'file-text-o'} className='mx-2'/>
                      <span><Trans i18nKey={'editor.modal.revision.length'}/>: { revision.length }</span>
                      <br/>
                      <ForkAwesomeIcon icon={'user-o'} className={'mx-2'}/>
                      <span>
                        {
                          revisionAuthorListMap.current.get(revision.timestamp)?.map((user, index) => {
                            return (
                              <img src={user.photo} alt={t('common.avatarOf', { name: user.name })} title={user.name} key={index} className={'mx-1 rounded'}/>
                            )
                          })
                        }
                      </span>
                    </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          </Col>
          <Col lg={8} className={'scroll-col'}>
            <ShowIf condition={error}>
              <Alert variant='danger'>
                <Trans i18nKey='editor.modal.revision.error'/>
              </Alert>
            </ShowIf>
            <ShowIf condition={!error && !!selectedRevision}>
              <ReactDiffViewer
                oldValue={selectedRevision?.content}
                newValue={noteContent}
                splitView={false}
                compareMethod={DiffMethod.WORDS}
                useDarkTheme={false}
              />
            </ShowIf>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}><Trans i18nKey={'common.close'}/></Button>
        <Button variant='danger' disabled={!selected} onClick={() => window.alert('Not yet implemented. Requires websocket.')}><Trans i18nKey={'editor.modal.revision.revertButton'}/></Button>
        <Button variant='primary' disabled={!selected} onClick={() => downloadRevision(id, selectedRevision)}><Trans i18nKey={'editor.modal.revision.download'}/></Button>
      </Modal.Footer>
    </CommonModal>
  )
}
