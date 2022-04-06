/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { DocumentInfoModal } from '../../document-bar/document-info/document-info-modal'
import { SidebarButton } from '../sidebar-button/sidebar-button'
import type { SpecificSidebarEntryProps } from '../types'
import { cypressId } from '../../../../utils/cypress-attribute'

export const DocumentInfoSidebarEntry: React.FC<SpecificSidebarEntryProps> = ({ className, hide }) => {
  const [showModal, setShowModal] = useState(false)
  useTranslation()

  return (
    <Fragment>
      <SidebarButton
        hide={hide}
        className={className}
        icon={'line-chart'}
        onClick={() => setShowModal(true)}
        {...cypressId('sidebar-btn-document-info')}>
        <Trans i18nKey={'editor.modal.documentInfo.title'} />
      </SidebarButton>
      <DocumentInfoModal show={showModal} onHide={() => setShowModal(false)} />
    </Fragment>
  )
}
