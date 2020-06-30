import React, { Fragment, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon, IconName } from '../../../../../common/fork-awesome/fork-awesome-icon'
import { DeletionModal } from '../../../../../common/modals/deletion-modal'
import { ShowIf } from '../../../../../common/show-if/show-if'

export interface DeleteRemoveNoteItemProps {
  onConfirm: () => void
  noteTitle: string
  variant: 'removeHistoryItem' | 'deleteNote'
}

export const DeleteRemoveNoteItem: React.FC<DeleteRemoveNoteItemProps> = ({ variant, onConfirm, noteTitle }) => {
  useTranslation()
  const [showDialog, setShowDialog] = useState(false)
  const isDeletion = variant === 'deleteNote'

  const i18nKeyItem = isDeletion ? 'landing.history.menu.deleteNote' : 'landing.history.menu.removeEntry'
  const i18nKeyModalButton = isDeletion ? 'editor.modal.deleteNote.button' : 'landing.history.modal.removeNote.button'
  const i18nKeyModalTitle = isDeletion ? 'editor.modal.deleteNote.title' : 'landing.history.modal.removeNote.title'
  const modalIcon = isDeletion ? 'trash' : 'archive'

  return (
    <Fragment>
      <Dropdown.Item onClick={() => setShowDialog(true)}>
        <ForkAwesomeIcon icon={modalIcon as IconName} fixedWidth={true} className="mx-2"/>
        <Trans i18nKey={i18nKeyItem}/>
      </Dropdown.Item>
      <DeletionModal
        onConfirm={() => {
          setShowDialog(false)
          onConfirm()
        }}
        deletionButtonI18nKey={i18nKeyModalButton}
        show={showDialog}
        onHide={() => setShowDialog(false)}
        titleI18nKey={i18nKeyModalTitle}>
        <ShowIf condition={isDeletion}>
          <h5><Trans i18nKey={'editor.modal.deleteNote.question'} values={{ noteTitle }} /></h5>
          <h6><Trans i18nKey={'editor.modal.deleteNote.warning'} /></h6>
        </ShowIf>
        <ShowIf condition={!isDeletion}>
          <h5><Trans i18nKey={'landing.history.modal.removeNote.question'} values={{ noteTitle }} /></h5>
          <h6><Trans i18nKey={'landing.history.modal.removeNote.warning'} /></h6>
        </ShowIf>
      </DeletionModal>
    </Fragment>
  )
}
