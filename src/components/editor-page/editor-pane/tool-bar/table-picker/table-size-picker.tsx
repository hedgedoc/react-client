/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useClickAway } from 'react-use'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { createNumberRangeArray } from '../../../../common/number-range/number-range'
import { CustomTableSizeModal } from './custom-table-size-modal'
import './table-picker.scss'
import { cypressId } from '../../../../../utils/cypress-attribute'
import { TableSizeText } from './table-size-text'

export interface TablePickerProps {
  show: boolean
  onDismiss: () => void
  onSizeSelection: (row: number, cols: number) => void
}

export type TableSize = {
  rows: number
  columns: number
}

/**
 * An overlay that lets the user choose a table size.
 *
 * @param show defines if the overlay should be shown
 * @param onDismiss is called if the overlay should be hidden without a selection
 * @param onSizeSelection is called if the user has chosen a table size
 */
export const TableSizePicker: React.FC<TablePickerProps> = ({ show, onDismiss, onSizeSelection }) => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [tableSize, setTableSize] = useState<TableSize>()
  const [showModal, setShowModal] = useState(false)

  useClickAway(containerRef, () => {
    onDismiss()
  })

  useEffect(() => {
    setTableSize(undefined)
  }, [show])

  const onClick = useCallback(() => {
    if (tableSize) {
      onSizeSelection(tableSize.rows, tableSize.columns)
    }
  }, [onSizeSelection, tableSize])

  const onModalDismiss = useCallback(() => {
    setShowModal(false)
  }, [])

  const onTableCellClick = useCallback(
    (row: number, col: number) => () =>
      setTableSize({
        rows: row + 1,
        columns: col + 1
      }),
    []
  )

  const tableContainer = useMemo(
    () =>
      createNumberRangeArray(8).map((row: number) =>
        createNumberRangeArray(10).map((col: number) => (
          <div
            key={`${row}_${col}`}
            className={`table-cell ${
              tableSize && row < tableSize.rows && col < tableSize.columns ? 'bg-primary border-primary' : ''
            }`}
            onMouseEnter={onTableCellClick(row, col)}
            title={t('editor.editorToolbar.table.size', { cols: col + 1, rows: row + 1 })}
            onClick={onClick}
          />
        ))
      ),
    [onClick, onTableCellClick, t, tableSize]
  )
  const doShowModal = useCallback(() => setShowModal(true), [])

  return (
    <div
      className={`position-absolute table-picker-container p-2 ${!show || showModal ? 'd-none' : ''} bg-light`}
      ref={containerRef}
      role='grid'>
      <p className={'lead'}>
        <TableSizeText tableSize={tableSize} />
        <Trans i18nKey={'editor.editorToolbar.table.title'} />
      </p>
      <div className={'table-container'}>{tableContainer}</div>
      <div className='d-flex justify-content-center mt-2'>
        <Button {...cypressId('show-custom-table-modal')} className={'text-center'} onClick={doShowModal}>
          <ForkAwesomeIcon icon='table' />
          &nbsp;
          <Trans i18nKey={'editor.editorToolbar.table.customSize'} />
        </Button>
        <CustomTableSizeModal showModal={showModal} onDismiss={onModalDismiss} onSizeSelect={onSizeSelection} />
      </div>
    </div>
  )
}
