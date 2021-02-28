/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { LinkContainer } from 'react-router-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'

export interface NewNoteButtonProps {
  i18nKey: string
  className?: string
}

export const NewNoteButton: React.FC<NewNoteButtonProps> = ({ i18nKey, className }) => {
  const { t } = useTranslation()
  return (
    <Dropdown
      as={ButtonGroup}
      className={className ?? ''}
      size={'sm'}
      variant={'primary'}
    >
      <LinkContainer to={'/new'} title={t(i18nKey)}>
        <Button
          className={`d-inline-flex align-items-center`}>
          <ForkAwesomeIcon icon={'plus'} className={'mx-1'} />
          <span>
          <Trans i18nKey={i18nKey} />
        </span>
        </Button>
      </LinkContainer>

      <Dropdown.Toggle split={true} />

      <Dropdown.Menu>
        <Dropdown.Item>
          <Trans i18nKey={'landing.navigation.newFromTemplate'} />
        </Dropdown.Item>

        <Dropdown.Divider />
      </Dropdown.Menu>
    </Dropdown>
  )
}
