/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type CodeMirror from 'codemirror'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { addTable } from '../utils/toolbarButtonUtils'
import { TableSizePicker } from './table-size-picker'
import { cypressId } from '../../../../../utils/cypress-attribute'

export interface TablePickerButtonProps {
  editor: CodeMirror.Editor
}

/**
 * Toggles the visibility of a {@link TableSizePicker table size picker overlay} and inserts the result into the editor.
 *
 * @param editor The editor in which the result should get inserted
 */
export const TablePickerButton: React.FC<TablePickerButtonProps> = ({ editor }) => {
  const { t } = useTranslation()
  const [showTablePicker, setShowTablePicker] = useState(false)
  const onDismiss = useCallback(() => setShowTablePicker(false), [])
  const onTablePicked = useCallback(
    (rows: number, cols: number) => {
      setShowTablePicker(false)
      addTable(editor, rows, cols)
    },
    [editor]
  )
  const toggleOverlayVisibility = useCallback(() => setShowTablePicker((old) => !old), [])
  const tableTitle = useMemo(() => t('editor.editorToolbar.table.title'), [t])

  return (
    <Fragment>
      <TableSizePicker show={showTablePicker} onDismiss={onDismiss} onSizeSelection={onTablePicked} />
      <Button {...cypressId('show-table-overlay')} variant='light' onClick={toggleOverlayVisibility} title={tableTitle}>
        <ForkAwesomeIcon icon='table' />
      </Button>
    </Fragment>
  )
}
