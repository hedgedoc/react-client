/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Position } from 'codemirror'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ShowIf } from '../../../common/show-if/show-if'
import './status-bar.scss'
import { cypressId } from '../../../../utils/cypress-attribute'

export interface StatusBarInfo {
  position: Position
  selectedColumns: number
  selectedLines: number
  linesInDocument: number
  charactersInDocument: number
  remainingCharacters: number
}

export const defaultState: StatusBarInfo = {
  position: { line: 0, ch: 0 },
  selectedColumns: 0,
  selectedLines: 0,
  linesInDocument: 0,
  charactersInDocument: 0,
  remainingCharacters: 0
}

export interface StatusBarProps {
  statusBarInfo: StatusBarInfo
}

/**
 * Shows additional information about the document length and the current selection.
 *
 * @param statusBarInfo The information to show
 */
export const StatusBar: React.FC<StatusBarProps> = ({ statusBarInfo }) => {
  const { t } = useTranslation()

  const getLengthTooltip = useMemo(() => {
    if (statusBarInfo.remainingCharacters === 0) {
      return t('editor.statusBar.lengthTooltip.maximumReached')
    }
    if (statusBarInfo.remainingCharacters < 0) {
      return t('editor.statusBar.lengthTooltip.exceeded', { exceeded: -statusBarInfo.remainingCharacters })
    }
    return t('editor.statusBar.lengthTooltip.remaining', { remaining: statusBarInfo.remainingCharacters })
  }, [statusBarInfo, t])

  return (
    <div className='d-flex flex-row status-bar px-2'>
      <div>
        <span>
          {t('editor.statusBar.cursor', {
            line: statusBarInfo.position.line + 1,
            columns: statusBarInfo.position.ch + 1
          })}
        </span>
        <ShowIf condition={statusBarInfo.selectedColumns !== 0 && statusBarInfo.selectedLines !== 0}>
          <ShowIf condition={statusBarInfo.selectedLines === 1}>
            <span>&nbsp;–&nbsp;{t('editor.statusBar.selection.column', { count: statusBarInfo.selectedColumns })}</span>
          </ShowIf>
          <ShowIf condition={statusBarInfo.selectedLines > 1}>
            <span>&nbsp;–&nbsp;{t('editor.statusBar.selection.line', { count: statusBarInfo.selectedLines })}</span>
          </ShowIf>
        </ShowIf>
      </div>
      <div className='ml-auto'>
        <span>{t('editor.statusBar.lines', { lines: statusBarInfo.linesInDocument })}</span>
        &nbsp;–&nbsp;
        <span
          {...cypressId('remainingCharacters')}
          title={getLengthTooltip}
          className={
            statusBarInfo.remainingCharacters <= 0
              ? 'text-danger'
              : statusBarInfo.remainingCharacters <= 100
              ? 'text-warning'
              : ''
          }>
          {t('editor.statusBar.length', { length: statusBarInfo.charactersInDocument })}
        </span>
      </div>
    </div>
  )
}
