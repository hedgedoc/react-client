/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import styles from './status-bar.module.scss'
import { RemainingCharactersInfo } from './remaining-characters-info'
import { NumberOfLinesInDocumentInfo } from './number-of-lines-in-document-info'
import { CursorPositionInfo } from './cursor-position-info'
import { SeparatorDash } from './separator-dash'
import { SelectedCharacters } from './selected-characters'
import { SelectedLines } from './selected-lines'

/**
 * Shows additional information about the document length and the current selection.
 */
export const StatusBar: React.FC = () => {
  return (
    <div className={`d-flex flex-row ${styles['status-bar']} px-2`}>
      <div>
        <CursorPositionInfo />
        <SelectedCharacters />
        <SelectedLines />
      </div>
      <div className='ml-auto'>
        <NumberOfLinesInDocumentInfo />
        <SeparatorDash />
        <RemainingCharactersInfo />
      </div>
    </div>
  )
}
