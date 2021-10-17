/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Element } from 'domhandler'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { CsvTable } from './csv-table'

/**
 * Detects code blocks with "csv" as language and renders them as table.
 */
export class CsvReplacer extends ComponentReplacer {
  public getReplacement(codeNode: Element): React.ReactElement | undefined {
    if (
      codeNode.name !== 'code' ||
      !codeNode.attribs ||
      !codeNode.attribs['data-highlight-language'] ||
      codeNode.attribs['data-highlight-language'] !== 'csv' ||
      !codeNode.children ||
      !codeNode.children[0]
    ) {
      return
    }

    const code = ComponentReplacer.extractTextChildContent(codeNode)

    const extraData = codeNode.attribs['data-extra']
    const extraRegex = /\s*(delimiter=([^\s]*))?\s*(header)?/
    const extraInfos = extraRegex.exec(extraData)

    let delimiter = ','
    let showHeader = false

    if (extraInfos) {
      delimiter = extraInfos[2] || delimiter
      showHeader = extraInfos[3] !== undefined
    }

    return <CsvTable code={code} delimiter={delimiter} showHeader={showHeader} />
  }
}
