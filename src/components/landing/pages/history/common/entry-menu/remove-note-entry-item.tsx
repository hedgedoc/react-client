import React, { Fragment, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../../common/fork-awesome/fork-awesome-icon'
import { DeletionModal } from '../../../../../common/modals/deletion-modal'

export interface RemoveNoteEntryItemProps {
  onRemove: () => void
}

export const RemoveNoteEntryItem: React.FC<RemoveNoteEntryItemProps> = ({ onRemove }) => {
  useTranslation()
  const [showDialog, setShowDialog] = useState(false)

  return (
    <Fragment>
      <Dropdown.Item onClick={() => setShowDialog(true)}>
        <ForkAwesomeIcon icon="trash" fixedWidth={true} className="mx-2"/>
        <Trans i18nKey="landing.history.menu.removeEntry"/>
      </Dropdown.Item>
      <DeletionModal
        onConfirm={() => {
          setShowDialog(false)
          onRemove()
        }}
        deletionButtonI18nKey={'landing.history.modal.removeNote.button'}
        show={showDialog}
        onHide={() => setShowDialog(false)}
        titleI18nKey={'landing.history.modal.removeNote.title'}>
        <h5><Trans i18nKey={'landing.history.modal.removeNote.question'} /></h5>
        <h6><Trans i18nKey={'landing.history.modal.removeNote.warning'} /></h6>
      </DeletionModal>
    </Fragment>
  )
}
