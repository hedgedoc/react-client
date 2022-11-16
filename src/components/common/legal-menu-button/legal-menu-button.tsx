/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { useDarkModeState } from '../../../hooks/common/use-dark-mode-state'
import { ForkAwesomeIcon } from '../fork-awesome/fork-awesome-icon'

export const LegalMenuButton: React.FC = () => {
  const darkModeState = useDarkModeState()

  return (
    <Dropdown>
      <Dropdown.Toggle variant={darkModeState ? 'outline-dark' : 'outline-light'}>
        <ForkAwesomeIcon icon={'question-circle'} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Trans i18nKey={'legalMenu.legal.notice'} />
        </Dropdown.Item>
        <Dropdown.Item>
          <Trans i18nKey={'legalMenu.legal.termsOfUse'} />
        </Dropdown.Item>
        <Dropdown.Item>
          <Trans i18nKey={'legalMenu.legal.privacyPolicy'} />
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <Trans i18nKey={'legalMenu.about.visitHedgeDoc'} />
        </Dropdown.Item>
        <Dropdown.Item>
          <Trans i18nKey={'legalMenu.about.showVersion'} />
        </Dropdown.Item>
        <Dropdown.Item>
          <Trans i18nKey={'legalMenu.about.openFeaturesPage'} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
