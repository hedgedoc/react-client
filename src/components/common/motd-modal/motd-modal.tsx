/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { CommonModal } from '../modals/common-modal'
import { Trans, useTranslation } from 'react-i18next'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { dismissMotd } from '../../../redux/motd/methods'
import { testId } from '../../../utils/cypress-attribute'

/**
 * Reads the motd from the global application state and shows it in a modal.
 * If the modal gets dismissed by the user then the "last modified" identifier will be written into the local storage
 * to prevent that the motd will be shown again until it gets changed.
 */
export const MotdModal: React.FC = () => {
  useTranslation()
  const motdState = useApplicationState((state) => state.motd)

  const domContent = useMemo(() => {
    if (!motdState) {
      return null
    }
    return motdState.text
      ?.split('\n')
      .map((line) => <span>{line}</span>)
      .reduce((previousLine, currentLine, currentLineIndex) => (
        <Fragment key={currentLineIndex}>
          {previousLine}
          <br />
          {currentLine}
        </Fragment>
      ))
  }, [motdState])

  const dismiss = useCallback(() => {
    if (!motdState) {
      return
    }
    dismissMotd()
  }, [motdState])

  if (motdState === null || motdState.dismissed) {
    return null
  } else {
    return (
      <CommonModal {...testId('motd')} show={!!motdState} titleI18nKey={'motd.title'}>
        <Modal.Body>{domContent}</Modal.Body>
        <Modal.Footer>
          <Button variant={'success'} onClick={dismiss} {...testId('motd-dismiss')}>
            <Trans i18nKey={'common.dismiss'} />
          </Button>
        </Modal.Footer>
      </CommonModal>
    )
  }
}
