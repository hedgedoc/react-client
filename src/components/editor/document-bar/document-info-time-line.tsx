import { Moment } from 'moment'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IconName } from '../../common/fork-awesome/fork-awesome-icon'
import { DocumentInfoLine } from './document-info-line'
import './document-info-time-line.scss'
import { UnitalicBoldText } from './document-info-time-line-helper/unitalic-bold-text'
import { ItalicTime } from './document-info-time-line-helper/italic-time'
import { UserAvatar } from '../../landing/layout/user-avatar/user-avatar'

export interface DocumentInfoLineWithTimeProps {
  time: Moment,
  mode: DocumentInfoLineWithTimeMode
  userName: string
  profileImageSrc: string
}

export enum DocumentInfoLineWithTimeMode {
  CREATED,
  EDITED
}

export const DocumentInfoTimeLine: React.FC<DocumentInfoLineWithTimeProps> = ({ time, mode, userName, profileImageSrc }) => {
  useTranslation()

  const i18nKey = mode === DocumentInfoLineWithTimeMode.CREATED ? 'editor.modal.documentInfo.created' : 'editor.modal.documentInfo.edited'
  const icon: IconName = mode === DocumentInfoLineWithTimeMode.CREATED ? 'plus' : 'pencil'

  return (
    <DocumentInfoLine icon={icon}>
      <UserAvatar photo={profileImageSrc} additionalClasses={'mr-1 document-info-avatar'}/>
      <Trans i18nKey={i18nKey} >
        <UnitalicBoldText text={userName}/>
        <ItalicTime time={time}/>
      </Trans>
    </DocumentInfoLine>
  )
}
