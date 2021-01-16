/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor } from 'codemirror'
import { createNumberRangeArray } from '../../common/number-range/number-range'
import { insertAtCursor } from './tool-bar/utils/toolbarButtonUtils'

export const extractTable = (pasteData: string, pasteEditor: Editor): void => {
  const tableRows = pasteData.split(/\r?\n/).filter(row => row.trim() !== '')
  const tableCells = tableRows.reduce((cellsInRow, row, index) => {
    cellsInRow[index] = row.split('\t')
    return cellsInRow
  }, [] as string[][])
  const arrayMaxRows = createNumberRangeArray(tableCells.length)
  const arrayMaxColumns = createNumberRangeArray(Math.max(...tableCells.map(row => row.length)))

  const headRow1 = arrayMaxColumns
    .map(col => col + 1)
    .map(col => `| #${col} `)
    .join('') + '|'
  const headRow2 = arrayMaxColumns
    .map(col => col + 1)
    .map(col => `| -${'-'.repeat(col.toString().length)} `)
    .join('') + '|'
  const body = arrayMaxRows.map(row => {
    return arrayMaxColumns
      .map(col => '| ' + tableCells[row][col] + ' ')
      .join('') + '|'
  }).join('\n')
  insertAtCursor(pasteEditor, `${headRow1}\n${headRow2}\n${body}`)
}
