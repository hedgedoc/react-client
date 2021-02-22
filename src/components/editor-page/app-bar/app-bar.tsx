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
import { ApplicationState } from '../../../redux'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../common/show-if/show-if'
import { SignInButton } from '../../landing-layout/navigation/sign-in-button'
import { UserDropdown } from '../../landing-layout/navigation/user-dropdown'
import { DarkModeButton } from './dark-mode-button'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button/help-button'
import { NavbarBranding } from './navbar-branding'
import { SyncScrollButtons } from './sync-scroll-buttons/sync-scroll-buttons'
import { NoteType } from '../note-frontmatter/note-frontmatter'
import { SlideModeButton } from './slide-mode-button'
import { ReadOnlyModeButton } from './read-only-mode-button'

export enum AppBarMode {
  BASIC,
  EDITOR
}

export interface AppBarProps {
  mode: AppBarMode
}

export const AppBar: React.FC<AppBarProps> = ({ mode }) => {
  useTranslation()

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
          <SlideModeButton/>
        </ShowIf>
        <ShowIf condition={noteFrontmatter.type !== NoteType.SLIDE}>
          <ReadOnlyModeButton/>
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
