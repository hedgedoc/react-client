import moment from 'moment/moment'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { UserAvatar } from '../../landing/layout/user-avatar/user-avatar'

export interface DocumentTimeProps {
  additionalClassNames: string,
  dateTime: Date,
  name: string,
  photo: string,
  createIcon: boolean,
}

export const DocumentTime: React.FC<DocumentTimeProps> = ({ name, photo, createIcon, dateTime, additionalClassNames }) => {
  const { t } = useTranslation()
  const time = useMemo(() => moment(dateTime).fromNow(), [dateTime])
  const title = createIcon ? t('editor.menu.created', { name, time }) : t('editor.menu.edited', { name, time })
  const icon = createIcon ? 'plus-square-o' : 'pencil-square-o'
  return (
    <span className={`nav-item text-secondary d-flex align-items-center ${additionalClassNames}`} title={title}>
      <ForkAwesomeIcon icon={icon} fixedWidth={true}/>&nbsp;<UserAvatar photo={photo} name={name} showName={false}/>&nbsp;—&nbsp;{time}
    </span>
  )
}
