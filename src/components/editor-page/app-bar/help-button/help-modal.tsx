/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Button, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import React, { useMemo, useState } from 'react'
import type { ModalVisibilityProps } from '../../../common/modals/common-modal'
import { CommonModal } from '../../../common/modals/common-modal'
import { ShortcutTabContent } from './shortcuts-tab-content'
import { LinksTabContent } from './links-tab-content'
import { CheatsheetTabContent } from './cheatsheet-tab-content'

export enum HelpTabStatus {
  Cheatsheet = 'cheatsheet.title',
  Shortcuts = 'shortcuts.title',
  Links = 'links.title'
}

export const HelpModal: React.FC<ModalVisibilityProps> = ({ show, onHide }) => {
  const [tab, setTab] = useState<HelpTabStatus>(HelpTabStatus.Cheatsheet)
  const { t } = useTranslation()

  const tabContent = useMemo(() => {
    switch (tab) {
      case HelpTabStatus.Cheatsheet:
        return <CheatsheetTabContent />
      case HelpTabStatus.Shortcuts:
        return <ShortcutTabContent />
      case HelpTabStatus.Links:
        return <LinksTabContent />
    }
  }, [tab])

  const modalTitle = useMemo(() => t('editor.documentBar.help') + ' - ' + t(`editor.help.${tab}`), [t, tab])

  return (
    <CommonModal
      modalSize={'lg'}
      titleIcon={'question-circle'}
      show={show}
      onHide={onHide}
      title={modalTitle}
      titleIsI18nKey={false}>
      <Modal.Body>
        <nav className='nav nav-tabs'>
          <Button
            variant={'light'}
            className={`nav-link nav-item ${tab === HelpTabStatus.Cheatsheet ? 'active' : ''}`}
            onClick={() => setTab(HelpTabStatus.Cheatsheet)}>
            <Trans i18nKey={'editor.help.cheatsheet.title'} />
          </Button>
          <Button
            variant={'light'}
            className={`nav-link nav-item ${tab === HelpTabStatus.Shortcuts ? 'active' : ''}`}
            onClick={() => setTab(HelpTabStatus.Shortcuts)}>
            <Trans i18nKey={'editor.help.shortcuts.title'} />
          </Button>
          <Button
            variant={'light'}
            className={`nav-link nav-item ${tab === HelpTabStatus.Links ? 'active' : ''}`}
            onClick={() => setTab(HelpTabStatus.Links)}>
            <Trans i18nKey={'editor.help.links.title'} />
          </Button>
        </nav>
        {tabContent}
      </Modal.Body>
    </CommonModal>
  )
}
