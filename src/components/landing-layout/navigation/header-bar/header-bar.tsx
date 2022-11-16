/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment } from 'react'
import { Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { NewGuestNoteButton } from '../new-guest-note-button'
import { NewUserNoteButton } from '../new-user-note-button'
import { SignInButton } from '../sign-in-button'
import { UserDropdown } from '../user-dropdown'
import { SettingsButton } from '../../../layout/settings-dialog/settings-button'

/**
 * Renders a header bar for the intro and history page.
 */
const HeaderBar: React.FC = () => {
  useTranslation()
  const userExists = useApplicationState((state) => !!state.user)

  return (
    <Navbar className='justify-content-between'>
      <div className='d-inline-flex'>
        <SettingsButton className={'p-1 mx-2'} variant={'outline-light'} />
        {!userExists ? (
          <Fragment>
            <span className={'mx-1 d-flex'}>
              <NewGuestNoteButton />
            </span>
            <SignInButton size='sm' />
          </Fragment>
        ) : (
          <Fragment>
            <span className={'mx-1 d-flex'}>
              <NewUserNoteButton />
            </span>
            <UserDropdown />
          </Fragment>
        )}
      </div>
    </Navbar>
  )
}

export { HeaderBar }
