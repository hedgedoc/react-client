/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import { Button, Overlay } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { cypressId } from '../../../../../utils/cypress-attribute'
import { TableSizePickerPopover } from './table-size-picker-popover'
import { CustomTableSizeModal } from './custom-table-size-modal'
import type { OverlayInjectedProps } from 'react-bootstrap/Overlay'
import { createNumberRangeArray } from '../../../../common/number-range/number-range'
import { replaceSelection } from '../formatters/replace-selection'
import { useChangeEditorContentCallback } from '../../../change-content-context/use-change-editor-content-callback'

enum PickerMode {
  INVISIBLE,
  GRID,
  CUSTOM
}

/**
 * Creates a markdown table with the given size.
 *
 * @param rows The number of table rows
 * @param columns The number of table columns
 * @return The created markdown table
 */
const createMarkdownTable = (rows: number, columns: number): string => {
  const rowArray = createNumberRangeArray(rows)
  const colArray = createNumberRangeArray(columns).map((col) => col + 1)
  const head = '|  # ' + colArray.join(' |  # ') + ' |'
  const divider = '| ' + colArray.map(() => '----').join(' | ') + ' |'
  const body = rowArray.map(() => '| ' + colArray.map(() => 'Text').join(' | ') + ' |').join('\n')
  return `${head}\n${divider}\n${body}`
}

/**
 * Toggles the visibility of a table size picker overlay and inserts the result into the editor.
 */
export const TablePickerButton: React.FC = () => {
  const { t } = useTranslation()
  const [pickerMode, setPickerMode] = useState<PickerMode>(PickerMode.INVISIBLE)
  const onDismiss = useCallback(() => setPickerMode(PickerMode.INVISIBLE), [])
  const onShowModal = useCallback(() => setPickerMode(PickerMode.CUSTOM), [])
  const changeEditorContent = useChangeEditorContentCallback()

  const onSizeSelect = useCallback(
    (rows: number, columns: number) => {
      const table = createMarkdownTable(rows, columns)
      changeEditorContent?.(({ currentSelection }) => replaceSelection(currentSelection, table, true))
      setPickerMode(PickerMode.INVISIBLE)
    },
    [changeEditorContent]
  )

  const tableTitle = useMemo(() => t('editor.editorToolbar.table.titleWithoutSize'), [t])
  const button = useRef(null)
  const toggleOverlayVisibility = useCallback(() => {
    setPickerMode((oldPickerMode) => (oldPickerMode === PickerMode.INVISIBLE ? PickerMode.GRID : PickerMode.INVISIBLE))
  }, [])

  const onOverlayHide = useCallback(() => {
    setPickerMode((oldMode) => {
      if (oldMode === PickerMode.CUSTOM) {
        return PickerMode.CUSTOM
      } else {
        return PickerMode.INVISIBLE
      }
    })
  }, [])

  const createPopoverElement = useCallback<(props: OverlayInjectedProps) => React.ReactElement>(
    ({ ref, ...popoverProps }) => (
      <TableSizePickerPopover
        onTableSizeSelected={onSizeSelect}
        onShowCustomSizeModal={onShowModal}
        onRefUpdate={ref}
        {...popoverProps}
      />
    ),
    [onShowModal, onSizeSelect]
  )

  return (
    <Fragment>
      <Button
        {...cypressId('table-size-picker-button')}
        variant='light'
        onClick={toggleOverlayVisibility}
        title={tableTitle}
        ref={button}
        disabled={!changeEditorContent}>
        <ForkAwesomeIcon icon='table' />
      </Button>
      <Overlay
        target={button.current}
        onHide={onOverlayHide}
        show={pickerMode === PickerMode.GRID}
        placement={'bottom'}
        rootClose={pickerMode === PickerMode.GRID}>
        {createPopoverElement}
      </Overlay>
      <CustomTableSizeModal
        showModal={pickerMode === PickerMode.CUSTOM}
        onDismiss={onDismiss}
        onSizeSelect={onSizeSelect}
      />
    </Fragment>
  )
}
