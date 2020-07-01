import React from 'react'
import { DeleteRemoveNoteItem } from './delete-remove-note-item'

export interface RemoveNoteEntryItemProps {
  onConfirm: () => void
  noteTitle: string
}

export const RemoveNoteEntryItem: React.FC<RemoveNoteEntryItemProps> = ({ noteTitle, onConfirm }) => {
  return (
    <DeleteRemoveNoteItem
      onConfirm={onConfirm}
      itemI18nKey={'landing.history.menu.removeEntry'}
      modalButtonI18nKey={'landing.history.modal.removeNote.button'}
      modalIcon={'archive'}
      modalTitleI18nKey={'landing.history.modal.removeNote.title'}
      modalQuestionI18nKey={'landing.history.modal.removeNote.question'}
      modalWarningI18nKey={'landing.history.modal.removeNote.warning'}
      noteTitle={noteTitle} />
  )
}
