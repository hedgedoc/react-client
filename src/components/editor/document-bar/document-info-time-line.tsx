import { Moment } from 'moment'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IconName } from '../../common/fork-awesome/fork-awesome-icon'
import { DocumentInfoLine } from './document-info-line'

export interface DocumentInfoLineWithTimeProps {
  time: Moment,
  mode: DocumentInfoLineWithTimeMode
  userName: string
}

export enum DocumentInfoLineWithTimeMode {
  CREATED,
  EDITED
}

export const DocumentInfoTimeLine: React.FC<DocumentInfoLineWithTimeProps> = ({ time, mode, userName }) => {
  const { t } = useTranslation()

  const i18nKey = mode === DocumentInfoLineWithTimeMode.CREATED ? 'editor.menu.created' : 'editor.menu.edited'
  const icon: IconName = mode === DocumentInfoLineWithTimeMode.CREATED ? 'plus' : 'pencil'

  const editedTimestamp = useMemo(() => {
    return time.fromNow(false)
  }, [time])

  return (
    <DocumentInfoLine icon={icon}>
      {t(i18nKey, { name: userName, time: editedTimestamp })}
    </DocumentInfoLine>
  )
}
