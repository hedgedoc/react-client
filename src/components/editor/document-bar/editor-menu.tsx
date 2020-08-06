import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { DropdownItemWithDeletionModal } from '../../landing/pages/history/common/entry-menu/dropdown-item-with-deletion-modal'

export const EditorMenu: React.FC = () => {
  useTranslation()

  return (
    <Dropdown className={'small mx-1'} alignRight={true}>
      <Dropdown.Toggle variant='light' size='sm' id='editor-menu' className='text-secondary'>
        <Trans i18nKey={'editor.menu.menu'}/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <DropdownItemWithDeletionModal
          itemI18nKey={'landing.history.menu.deleteNote'}
          modalButtonI18nKey={'editor.modal.deleteNote.button'}
          modalIcon={'trash'}
          modalQuestionI18nKey={'editor.modal.deleteNote.question'}
          modalTitleI18nKey={'editor.modal.deleteNote.title'}
          modalWarningI18nKey={'editor.modal.deleteNote.warning'}
          noteTitle={''}
          className={'small'}
          onConfirm={() => console.log('deleted')}/>

        <Dropdown.Divider/>

        <Dropdown.Header className='small'>
          <Trans i18nKey={'editor.menu.modes'}/>
        </Dropdown.Header>
        <Dropdown.Item className='small'>
          <ForkAwesomeIcon icon={'share'} className={'mx-2'}/>
          <Trans i18nKey={'editor.menu.publish'}/>
        </Dropdown.Item>
        <Dropdown.Item className='small'>
          <ForkAwesomeIcon icon={'television'} className={'mx-2'}/>
          <Trans i18nKey={'editor.menu.slideMode'}/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
