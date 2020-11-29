/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './drop-overlay.scss'

export interface DropOverlayProps {
  onDrop: (event: React.DragEvent) => void
  onDragLeave: (event: React.DragEvent) => void
  onDragOver: (event: React.DragEvent) => void
}

export const DropOverlay: React.FC<DropOverlayProps> = ({ onDrop, onDragLeave, onDragOver }) => {
  const { t } = useTranslation()

  return (
    <div
      className={'drop-overlay bg-dark text-light'}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <ForkAwesomeIcon icon={'download'} size={'5x'} className={'text-light'}/>
      <span className={'drop-overlay-text'} title={t('editor.upload.dropImage')}>{t('editor.upload.dropImage')}</span>
    </div>
  )
}
