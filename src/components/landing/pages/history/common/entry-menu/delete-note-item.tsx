import React from 'react'
import { DeleteRemoveNoteItem } from './delete-remove-note-item'

export interface DeleteNoteItemProps {
  onConfirm: () => void
  noteTitle: string
}

export const DeleteNoteItem: React.FC<DeleteNoteItemProps> = ({ noteTitle, onConfirm }) => {
  return (
    <DeleteRemoveNoteItem
      onConfirm={onConfirm}
      itemI18nKey={'landing.history.menu.deleteNote'}
      modalButtonI18nKey={'editor.modal.deleteNote.button'}
      modalIcon={'trash'}
      modalTitleI18nKey={'editor.modal.deleteNote.title'}
      modalQuestionI18nKey={'editor.modal.deleteNote.question'}
      modalWarningI18nKey={'editor.modal.deleteNote.warning'}
      noteTitle={noteTitle} />
  )
}
