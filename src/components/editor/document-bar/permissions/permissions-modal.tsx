import React, { useState } from 'react'
import { Button, FormControl, InputGroup, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { LoginProvider, UserState } from '../../../../redux/user/types'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../../common/modals/common-modal'
import { UserAvatar } from '../../../common/user-avatar/user-avatar'

export interface PermissionsModalProps {
  show: boolean,
  onChangeShow: (newShow: boolean) => void
}

interface SharedUser {
  user: UserState,
  canEdit: boolean
}

interface SharedGroup {
  group: string,
  canEdit: boolean
}

enum EditMode {
   VIEW,
   EDIT
}

export const PermissionModal: React.FC<PermissionsModalProps> = ({ show, onChangeShow }) => {
  const { t } = useTranslation()
  const [userList, setUserList] = useState<SharedUser[]>([{
    user: {
      id: 'dermolly',
      photo: '/avatar.png',
      name: 'Philip',
      provider: LoginProvider.INTERNAL
    },
    canEdit: true
  }, {
    user: {
      id: 'emcrx',
      photo: '/avatar.png',
      name: 'Erik',
      provider: LoginProvider.INTERNAL
    },
    canEdit: false
  }, {
    user: {
      id: 'mrdrogdrog',
      photo: '/avatar.png',
      name: 'Tilman',
      provider: LoginProvider.INTERNAL
    },
    canEdit: false
  }])
  const [newUser, setNewUser] = useState("")
  const [groupList, setGroupList] = useState<SharedGroup[]>([])

  const changeUserMode = (userId: string, canEdit: boolean) => {
    setUserList(list =>
      list
      .map(user => {
        if (user.user.id !== userId) {
          return user
        }
        user.canEdit = canEdit
        return user
      }))
  }

  const removeUser = (userId: string) => {
    setUserList(list => list.filter(user => user.user.id !== userId))
  }

  const addUser = () => {
    setUserList(list => list.concat({
      user: {
        id: newUser,
        photo: '/avatar.png',
        name: newUser,
        provider: LoginProvider.INTERNAL
      },
      canEdit: false
    }))
    setNewUser("")
  }

  return (
    <CommonModal
      show={show}
      onHide={() => onChangeShow(false)}
      closeButton={true}
      titleI18nKey={'editor.modal.permissions.title'}>
      <Modal.Body>
        <h5 className={'mb-3'}><Trans i18nKey={'editor.modal.permissions.owner'}/></h5>
        <ul className={'list-group'}>
          <li className={'list-group-item d-flex flex-row align-items-center'}>
            <UserAvatar name={'test'} photo={'/avatar.png'}/>
          </li>
        </ul>
        <h5 className={'my-3'}><Trans i18nKey={'editor.modal.permissions.sharedWithUsers'}/></h5>
        <ul className={'list-group'}>
        {userList.map(shareUser => (
          <li key={shareUser.user.name} className={'list-group-item d-flex flex-row justify-content-between align-items-center'}>
            <UserAvatar name={shareUser.user.name} photo={shareUser.user.photo}/>
            <div>
              <ToggleButtonGroup
                type='radio'
                name='edit-mode'
                value={shareUser.canEdit ? EditMode.EDIT : EditMode.VIEW}
                onChange={(value: EditMode) => changeUserMode(shareUser.user.id, value === EditMode.EDIT)}
              >
                <ToggleButton
                  title={t('editor.modal.permissions.edit', {name: shareUser.user.name})}
                  variant={'light'}
                  className={'text-secondary'}
                  value={EditMode.EDIT}
                >
                  <ForkAwesomeIcon icon="pencil"/>
                </ToggleButton>
                <ToggleButton
                  title={ t('editor.modal.permissions.viewOnly', {name: shareUser.user.name})}
                  variant={'light'}
                  className={'text-secondary'}
                  value={EditMode.VIEW}
                >
                  <ForkAwesomeIcon icon="eye"/>
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                variant='light'
                className={'text-danger ml-2'}
                title={t('editor.modal.permissions.removeUser', {name: shareUser.user.name})}
                onClick={() => removeUser(shareUser.user.id)}
              >
                <ForkAwesomeIcon icon={'times'}/>
              </Button>
            </div>
          </li>
        ))}
        <li className={'list-group-item'}>
          <form onSubmit={event => {
            event.preventDefault()
            addUser()
          }}>
            <InputGroup className={'mr-1 mb-1'}>
              <FormControl
                value={newUser}
                placeholder={t('editor.modal.permissions.addUser')}
                aria-label={t('editor.modal.permissions.addUser')}
                onChange={event => setNewUser(event.currentTarget.value)}
              />
              <Button
                variant='light'
                className={'text-secondary ml-2'}
                title={t('editor.modal.permissions.addUser')}
                onClick={() => addUser()}
              >
                <ForkAwesomeIcon icon={'plus'}/>
              </Button>
            </InputGroup>
          </form>
        </li>
        </ul>
        <h5 className={'my-3'}><Trans i18nKey={'editor.modal.permissions.sharedWithGroups'}/></h5>
        TBD
      </Modal.Body>
    </CommonModal>
  )
}
