/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ReactElement } from 'react'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import convertHtmlToReact from '@hedgedoc/html-to-react'
import './highlighted-code.scss'
import hljs from 'highlight.js/lib/core'
import type { LanguageFn } from 'highlight.js'
import { cypressId } from '../../../../../utils/cypress-attribute'
import { CopyToClipboardButton } from '../../../../common/copyable/copy-to-clipboard-button/copy-to-clipboard-button'
import { Logger } from '../../../../../utils/logger'

const log = new Logger('HighlightedCode')

export interface HighlightedCodeProps {
  code: string
  language?: string
  startLineNumber?: number
  wrapLines: boolean
}

/*
 TODO: Test method or rewrite code so this is not necessary anymore
 */
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/'/g, '&#039;')
}

const replaceCode = (code: string): (ReactElement | null | string)[][] => {
  return code
    .split('\n')
    .filter((line) => !!line)
    .map((line) => convertHtmlToReact(line, {}))
}

export const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code, language, startLineNumber, wrapLines }) => {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    if (!language) {
      setHtml(escapeHtml(code))
      return
    } else {
      let adjustedLanguage: string;
      if (language === 'html') {
        adjustedLanguage = 'xml'
      } else if (language === 'js') {
        adjustedLanguage = 'javascript'
      } else {
        adjustedLanguage = language.replace('-', '_')
      }

      import('highlight.js/lib/languages/' + adjustedLanguage)
        .then((imported: { default: LanguageFn }) => {
          hljs.registerLanguage(language, imported.default)
          const unreplacedCode = language ? hljs.highlight(code, { language }).value : escapeHtml(code)
          setHtml(unreplacedCode)
        })
        .catch((error: Error) => {
          log.error('Unknown language ' + language)
          setHtml(escapeHtml(code))
        })
    }
  }, [code, language, startLineNumber])

  const replacedDom = useMemo(() => {
    return replaceCode(html).map((line, index) => (
      <Fragment key={index}>
        <span className={'linenumber'}>{(startLineNumber || 1) + index}</span>
        <div className={'codeline'}>{line}</div>
      </Fragment>
    ))
  }, [html, startLineNumber])

  return (
    <div className={'code-highlighter'}>
      <code className={`hljs ${startLineNumber !== undefined ? 'showGutter' : ''} ${wrapLines ? 'wrapLines' : ''}`}>
        {replacedDom}
      </code>
      <div className={'text-right button-inside'}>
        <CopyToClipboardButton content={code} {...cypressId('copy-code-button')} />
      </div>
    </div>
  )
}

export default HighlightedCode
