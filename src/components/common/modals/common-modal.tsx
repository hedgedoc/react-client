import React, { Fragment } from 'react'
import { Modal } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { ForkAwesomeIcon, IconName } from '../fork-awesome/fork-awesome-icon'
import { ShowIf } from '../show-if/show-if'

export interface CommonModalProps {
  show: boolean
  onHide: () => void
  title: string
  closeButton?: boolean
  icon?: IconName
}

export const CommonModal: React.FC<CommonModalProps> = ({ show, onHide, title, closeButton, icon, children }) => {
  return (
    <Modal show={show} onHide={onHide} animation={true} className="text-dark">
      <Modal.Header closeButton={!!closeButton}>
        <Modal.Title>
          <ShowIf condition={!!icon}>
            <Fragment>
              <ForkAwesomeIcon icon={icon as IconName}/>&nbsp;<Trans i18nKey={title}/>
            </Fragment>
          </ShowIf>
          <ShowIf condition={!icon}>
            <Trans i18nKey={title}/>
          </ShowIf>
        </Modal.Title>
      </Modal.Header>
      { children }
    </Modal>
  )
}
