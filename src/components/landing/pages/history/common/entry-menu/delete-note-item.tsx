import React, { Fragment, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../../common/fork-awesome/fork-awesome-icon'
import { DeletionModal } from '../../../../../common/modals/deletion-modal'

export interface DeleteNoteItemProps {
  onDelete: () => void
  noteTitle: string
}

export const DeleteNoteItem: React.FC<DeleteNoteItemProps> = ({ onDelete, noteTitle }) => {
  useTranslation()
  const [showDialog, setShowDialog] = useState(false)

  return (
    <Fragment>
      <Dropdown.Item onClick={() => setShowDialog(true)}>
        <ForkAwesomeIcon icon="trash" fixedWidth={true} className="mx-2"/>
        <Trans i18nKey="landing.history.menu.deleteNote"/>
      </Dropdown.Item>
      <DeletionModal
        onConfirm={() => {
          setShowDialog(false)
          onDelete()
        }}
        deletionButtonI18nKey={'editor.modal.deleteNote.button'}
        show={showDialog}
        onHide={() => setShowDialog(false)}
        titleI18nKey={'editor.modal.deleteNote.title'}>
        <h5><Trans i18nKey={'editor.modal.deleteNote.question'} values={{ noteTitle }} /></h5>
        <h6><Trans i18nKey={'editor.modal.deleteNote.warning'} /></h6>
      </DeletionModal>
    </Fragment>
  )
}
