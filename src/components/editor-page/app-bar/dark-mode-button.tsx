/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useIsDarkModeActivated } from '../../../hooks/common/use-is-dark-mode-activated'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { Logger } from '../../../utils/logger'
import { setDarkMode } from '../../../redux/global-user-interface/methods'

enum DarkModeState {
  DARK,
  LIGHT
}

const log = new Logger("DarkModeButton")

const DarkModeButton: React.FC = () => {
  const { t } = useTranslation()
  const darkModeEnabled = useIsDarkModeActivated() ? DarkModeState.DARK : DarkModeState.LIGHT

  const setDarkModeByUser = useCallback((enabled: boolean) => {
      try {
        window.localStorage.setItem('darkMode', String(enabled))
      } catch (error) {
        log.error('Saving to local storage failed', error)
      }
      setDarkMode(enabled)
  }, [])

  return (
    <ToggleButtonGroup type='radio' name='dark-mode' value={darkModeEnabled} className='ml-2'>
      <ToggleButton
        value={DarkModeState.DARK}
        variant='outline-secondary'
        title={t('editor.darkMode.switchToDark')}
        onChange={() => setDarkModeByUser(true)}>
        <ForkAwesomeIcon icon='moon' />
      </ToggleButton>
      <ToggleButton
        value={DarkModeState.LIGHT}
        variant='outline-secondary'
        title={t('editor.darkMode.switchToLight')}
        onChange={() => setDarkModeByUser(false)}>
        <ForkAwesomeIcon icon='sun-o' />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export { DarkModeButton }
