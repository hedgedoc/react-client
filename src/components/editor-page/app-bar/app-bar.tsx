/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import equal from 'fast-deep-equal'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../../../redux'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../common/show-if/show-if'
import { SignInButton } from '../../landing-layout/navigation/sign-in-button'
import { UserDropdown } from '../../landing-layout/navigation/user-dropdown'
import { EditorPagePathParams } from '../editor-page'
import { DarkModeButton } from './dark-mode-button'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button/help-button'
import { NavbarBranding } from './navbar-branding'
import { SyncScrollButtons } from './sync-scroll-buttons/sync-scroll-buttons'
import { NoteType } from '../note-frontmatter/note-frontmatter'

export enum AppBarMode {
  BASIC,
  EDITOR
}

export interface AppBarProps {
  mode: AppBarMode
}

export const AppBar: React.FC<AppBarProps> = ({ mode }) => {
  const { t } = useTranslation()
  const { id } = useParams<EditorPagePathParams>()
  const userExists = useSelector((state: ApplicationState) => !!state.user)
  const noteFrontmatter = useSelector((state: ApplicationState) => state.noteDetails.frontmatter, equal)

  return (
    <Navbar bg={ 'light' }>
      <Nav className="mr-auto d-flex align-items-center">
        <NavbarBranding/>
        <ShowIf condition={ mode === AppBarMode.EDITOR }>
          <EditorViewMode/>
          <SyncScrollButtons/>
        </ShowIf>
        <DarkModeButton/>
        <ShowIf condition={noteFrontmatter.type === NoteType.SLIDE}>
          <Link to={ `/p/${ id }` } target='_blank'>
            <Button title={ t('editor.documentBar.slideMode') } className="ml-2 text-secondary" size="sm"
                    variant="outline-light">
              <ForkAwesomeIcon icon="television"/>
            </Button>
          </Link>
        </ShowIf>
        <ShowIf condition={noteFrontmatter.type !== NoteType.SLIDE}>
          <Link to={ `/s/${ id }` } target='_blank'>
            <Button title={ t('editor.documentBar.readOnlyMode') } className="ml-2 text-secondary" size="sm"
                    variant="outline-light">
              <ForkAwesomeIcon icon="file-text-o"/>
            </Button>
          </Link>
        </ShowIf>
        <ShowIf condition={ mode === AppBarMode.EDITOR }>
          <HelpButton/>
        </ShowIf>
      </Nav>
      <Nav className="d-flex align-items-center text-secondary">
        <Button className="mx-2" size="sm" variant="primary">
          <ForkAwesomeIcon icon="plus"/> <Trans i18nKey="editor.appBar.new"/>
        </Button>
        <ShowIf condition={ !userExists }>
          <SignInButton size={ 'sm' }/>
        </ShowIf>
        <ShowIf condition={ userExists }>
          <UserDropdown/>
        </ShowIf>
      </Nav>
    </Navbar>
  )
}
