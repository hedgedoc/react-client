/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Button, Modal } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { Trans } from 'react-i18next'
import React, { useMemo, useState } from 'react'
import { CommonModalProps } from '../../../common/modals/common-modal'
import { Shortcut } from './shortcuts'
import { Links } from './links'
import { Cheatsheet } from './cheatsheet'

export enum HelpTabStatus {
  Cheatsheet = 'cheatsheet.title',
  Shortcuts = 'shortcuts.title',
  Links = 'links.title'
}

export const HelpModal: React.FC<CommonModalProps> = ({ show, onHide }) => {
  const [tab, setTab] = useState<HelpTabStatus>(HelpTabStatus.Cheatsheet)

  const tabContent = useMemo(() => {
    switch (tab) {
      case HelpTabStatus.Cheatsheet:
        return (<Cheatsheet/>)
      case HelpTabStatus.Shortcuts:
        return (<Shortcut/>)
      case HelpTabStatus.Links:
        return (<Links/>)
    }
  }, [tab])

  return <Modal show={ show } onHide={ onHide } animation={ true } className='text-dark' size='lg'>
    <Modal.Header closeButton>
      <Modal.Title>
        <ForkAwesomeIcon icon='question-circle'/> <Trans i18nKey={ 'editor.documentBar.help' }/> – <Trans
        i18nKey={ `editor.help.${ tab }` }/>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <nav className='nav nav-tabs'>
        <Button variant={ 'light' }
                className={ `nav-link nav-item ${ tab === HelpTabStatus.Cheatsheet ? 'active' : '' }` }
                onClick={ () => setTab(HelpTabStatus.Cheatsheet) }>
          <Trans i18nKey={ 'editor.help.cheatsheet.title' }/>
        </Button>
        <Button variant={ 'light' }
                className={ `nav-link nav-item ${ tab === HelpTabStatus.Shortcuts ? 'active' : '' }` }
                onClick={ () => setTab(HelpTabStatus.Shortcuts) }>
          <Trans i18nKey={ 'editor.help.shortcuts.title' }/>
        </Button>
        <Button variant={ 'light' }
                className={ `nav-link nav-item ${ tab === HelpTabStatus.Links ? 'active' : '' }` }
                onClick={ () => setTab(HelpTabStatus.Links) }>
          <Trans i18nKey={ 'editor.help.links.title' }/>
        </Button>
      </nav>
      { tabContent }
    </Modal.Body>
  </Modal>
}
