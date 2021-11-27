/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import type { TableSize } from './table-size-picker'

export interface TableSizeProps {
  tableSize?: TableSize
}

/**
 * Renders an info text that contains the given {@link TableSize table size}.
 *
 * @param tableSize The table size that should be included
 */
export const TableSizeText: React.FC<TableSizeProps> = ({ tableSize }) => {
  useTranslation()

  const translationValues = useMemo(() => {
    return tableSize ? { cols: tableSize.columns, rows: tableSize.rows } : undefined
  }, [tableSize])

  if (!translationValues) {
    return null
  } else {
    return <Trans i18nKey={'editor.editorToolbar.table.size'} values={translationValues} />
  }
}
