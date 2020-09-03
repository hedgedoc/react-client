import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/modals/common-modal'
import { UserAvatar } from '../../../common/user-avatar/user-avatar'
import { PermissionList } from './permission-list'

export interface PermissionsModalProps {
  show: boolean,
  onChangeShow: (newShow: boolean) => void
}

export interface Principal {
  id: string
  name: string
  photo: string
  canEdit: boolean
}

export const PermissionModal: React.FC<PermissionsModalProps> = ({ show, onChangeShow }) => {
  useTranslation()
  const [userList, setUserList] = useState<Principal[]>([{
    id: 'dermolly',
    photo: '/avatar.png',
    name: 'Philip',
    canEdit: true
  }, {
    id: 'emcrx',
    photo: '/avatar.png',
    name: 'Erik',
    canEdit: false
  }, {
    id: 'mrdrogdrog',
    photo: '/avatar.png',
    name: 'Tilman',
    canEdit: false
  }])
  const [groupList, setGroupList] = useState<Principal[]>([{
    id: 'developer',
    photo: '',
    name: 'Developer',
    canEdit: true
  }, {
    id: 'frontend',
    photo: '',
    name: 'Frontend',
    canEdit: true
  }])

  const changeUserMode = (userId: Principal["id"], canEdit: Principal["canEdit"]) => {
    setUserList(list =>
      list
      .map(user => {
        if (user.id !== userId) {
          return user
        }
        user.canEdit = canEdit
        return user
      }))
  }

  const removeUser = (userId: Principal["id"]) => {
    setUserList(list => list.filter(user => user.id !== userId))
  }

  const addUser = (name: Principal["name"]) => {
    setUserList(list => list.concat({
      id: name,
      photo: '/avatar.png',
      name: name,
      canEdit: false
    }))
  }

  const changeGroupMode = (groupId: Principal["id"], canEdit: Principal["canEdit"]) => {
    setGroupList(list =>
      list
      .map(group => {
        if (group.id !== groupId) {
          return group
        }
        group.canEdit = canEdit
        return group
      }))
  }

  const removeGroup = (groupId: Principal["id"]) => {
    setGroupList(list => list.filter(group => group.id !== groupId))
  }

  const addGroup = (name: Principal["name"]) => {
    setGroupList(list => list.concat({
      id: name,
      photo: '/avatar.png',
      name: name,
      canEdit: false
    }))
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
        <PermissionList
          list={userList}
          identifier={entry => (<UserAvatar name={entry.name} photo={entry.photo}/>)}
          changeEditMode={changeUserMode}
          removeEntry={removeUser}
          createEntry={addUser}
        />
        <h5 className={'my-3'}><Trans i18nKey={'editor.modal.permissions.sharedWithGroups'}/></h5>
        <PermissionList
          list={groupList}
          identifier={entry => (<span>{entry.name}</span>)}
          changeEditMode={changeGroupMode}
          removeEntry={removeGroup}
          createEntry={addGroup}
        />
      </Modal.Body>
    </CommonModal>
  )
}
