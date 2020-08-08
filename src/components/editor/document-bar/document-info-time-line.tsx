import { Moment } from 'moment'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IconName } from '../../common/fork-awesome/fork-awesome-icon'
import { DocumentInfoLine } from './document-info-line'
import './document-info-time-line.scss'

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

  const i18nKey = mode === DocumentInfoLineWithTimeMode.CREATED ? 'editor.menu.created' : 'editor.menu.edited'
  const icon: IconName = mode === DocumentInfoLineWithTimeMode.CREATED ? 'plus' : 'pencil'

  return (
    <DocumentInfoLine icon={icon}>
      <img alt={`avatar icon of ${userName}`} src={profileImageSrc} className='mr-2 rounded document-info-avatar'/>
      <b>{ userName }</b>
      &nbsp;
      <i>
        <Trans i18nKey={i18nKey}/>
        &nbsp;
        <span title={time.format('LLLL')}>{ time.fromNow() }</span>
      </i>
    </DocumentInfoLine>
  )
}
