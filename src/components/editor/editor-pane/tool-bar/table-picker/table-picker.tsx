import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useClickAway } from 'react-use'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../../../common/show-if/show-if'
import { TablePickerDialog } from './table-picker-dialog'
import './table-picker.scss'

export interface TablePickerProps {
  show: boolean
  onDismiss: () => void
  onTablePicked: (row: number, cols: number) => void
}

export type TableSize = {
  rows: number,
  columns: number
}

export const TablePicker: React.FC<TablePickerProps> = ({ show, onDismiss, onTablePicked }) => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [tableSize, setTableSize] = useState<TableSize>()
  const [showDialog, setShowDialog] = useState(false)

  useClickAway(containerRef, () => {
    onDismiss()
  })

  useEffect(() => {
    setTableSize(undefined)
  }, [show])

  return (
    <div className={`position-absolute table-picker-container p-2 ${!show ? 'd-none' : ''} bg-light`} ref={containerRef}>
      <p className={'lead'}>
        <ShowIf condition={!!tableSize}>
          {tableSize?.columns}x{tableSize?.rows}
        </ShowIf> {t('editor.editorToolbar.table.title')}
      </p>
      <div className={'d-grid table-container'}>
        {Array.from(Array(8).keys()).map((row: number) => {
          return Array.from(Array(10).keys()).map((col: number) => {
            return (
              <div
                className={`table-cell ${tableSize && row < tableSize.rows && col < tableSize.columns ? 'bg-primary' : ''}`}
                onMouseEnter={() => {
                  setTableSize({
                    rows: row + 1,
                    columns: col + 1
                  })
                }}
                onClick={() => {
                  if (tableSize) {
                    onTablePicked(tableSize.rows, tableSize.columns)
                  }
                }}
              />
            )
          }
          )
        })}
      </div>
      <div className="d-flex justify-content-center mt-2">
        <Button className={'text-center'} onClick={() => setShowDialog(true)}>
          <ForkAwesomeIcon icon="table"/>&nbsp;{t('editor.editorToolbar.table.customSize')}
        </Button>
        <TablePickerDialog
          showModal={showDialog}
          onDismiss={() => setShowDialog(false)}
          onTablePicked={onTablePicked}
        />
      </div>
    </div>
  )
}
