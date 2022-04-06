/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import type { RevisionListEntry } from '../../../../api/revisions/types'
import type { UserResponse } from '../../../../api/users/types'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { UserAvatar } from '../../../common/user-avatar/user-avatar'
import styles from './revision-modal-list-entry.module.scss'

export interface RevisionModalListEntryProps {
  active: boolean
  onClick: () => void
  revision: RevisionListEntry
  revisionAuthorListMap: Map<number, UserResponse[]>
}

export const RevisionModalListEntry: React.FC<RevisionModalListEntryProps> = ({
  active,
  onClick,
  revision,
  revisionAuthorListMap
}) => (
  <ListGroup.Item
    as='li'
    active={active}
    onClick={onClick}
    className={`user-select-none ${styles['revision-item']} d-flex flex-column`}>
    <span>
      <ForkAwesomeIcon icon={'clock-o'} className='mx-2' />
      {DateTime.fromMillis(revision.timestamp * 1000).toFormat('DDDD T')}
    </span>
    <span>
      <ForkAwesomeIcon icon={'file-text-o'} className='mx-2' />
      <Trans i18nKey={'editor.modal.revision.length'} />: {revision.length}
    </span>
    <span className={'d-flex flex-row my-1 align-items-center'}>
      <ForkAwesomeIcon icon={'user-o'} className={'mx-2'} />
      {revisionAuthorListMap.get(revision.timestamp)?.map((user, index) => {
        return (
          <UserAvatar name={user.name} photo={user.photo} showName={false} additionalClasses={'mx-1'} key={index} />
        )
      })}
    </span>
  </ListGroup.Item>
)
