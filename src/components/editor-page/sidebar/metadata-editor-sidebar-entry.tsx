/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MetadataEditor } from '../metadata-editor/metadata-editor'
import { SidebarButton } from './sidebar-button'
import { SpecificSidebarEntryProps } from './types'

export const MetadataEditorSidebarEntry: React.FC<SpecificSidebarEntryProps> = ({ className, hide }) => {
  const [showModal, setShowModal] = useState(false)
  useTranslation()

  return (
    <Fragment>
      <SidebarButton hide={ hide } className={ className } icon={ 'tags' } onClick={ () => setShowModal(true) }>
        <Trans i18nKey={ 'editor.modal.metadataEditor.title' }/>
      </SidebarButton>
      <MetadataEditor show={ showModal } onHide={ () => setShowModal(false) }/>
    </Fragment>
  )
}
