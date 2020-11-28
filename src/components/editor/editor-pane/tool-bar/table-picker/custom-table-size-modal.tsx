/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react'
import { Button, ModalFooter } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../../../common/modals/common-modal'
import { TableSize } from './table-picker'

export interface CustomTableSizeModalProps {
  showModal: boolean
  onDismiss: () => void
  onTablePicked: (row: number, cols: number) => void
}

export const CustomTableSizeModal: React.FC<CustomTableSizeModalProps> = ({ showModal, onDismiss, onTablePicked }) => {
  const { t } = useTranslation()
  const [tableSize, setTableSize] = useState<TableSize>({
    rows: 0,
    columns: 0
  })

  const onClick = useCallback(() => {
    onTablePicked(tableSize.rows, tableSize.columns)
    onDismiss()
  }, [onDismiss])

  return (
    <CommonModal
      show={showModal}
      onHide={() => onDismiss()}
      titleI18nKey={'editor.editorToolbar.table.customSize'}
      closeButton={true}
      icon={'table'}>
      <div className={'col-lg-10 d-flex flex-row p-3 m-auto align-items-center'}>
        <input className={'form-control'} type={'number'} min={1} placeholder={t('editor.editorToolbar.table.cols')} onChange={(event) => {
          const value = Number.parseInt(event.currentTarget.value)
          setTableSize(old => ({
            rows: old.rows,
            columns: value
          }))
        } }/>
        <ForkAwesomeIcon icon='times' className='mx-2' fixedWidth={true}/>
        <input className={'form-control'} type={'number'} min={1} placeholder={t('editor.editorToolbar.table.rows')} onChange={(event) => {
          const value = Number.parseInt(event.currentTarget.value)
          setTableSize(old => {
            return {
              rows: value,
              columns: old.columns
            }
          })
        } }/>
      </div>
      <ModalFooter>
        <Button onClick={onClick}>
          {t('editor.editorToolbar.table.create')}
        </Button>
      </ModalFooter>
    </CommonModal>
  )
}
