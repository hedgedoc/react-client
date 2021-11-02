/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Suspense, useCallback } from 'react'
import { WaitSpinner } from '../../../common/wait-spinner/wait-spinner'
import { Col, Row } from 'react-bootstrap'

export interface CheatsheetLineProps {
  code: string
  onTaskCheckedChange: (newValue: boolean) => void
}

const HighlightedCode = React.lazy(
  () => import('../../../markdown-renderer/replace-components/highlighted-fence/highlighted-code/highlighted-code')
)
const DocumentMarkdownRenderer = React.lazy(() => import('../../../markdown-renderer/document-markdown-renderer'))

export const CheatsheetLine: React.FC<CheatsheetLineProps> = ({ code, onTaskCheckedChange }) => {
  const checkboxClick = useCallback(
    (lineInMarkdown: number, newValue: boolean) => {
      onTaskCheckedChange(newValue)
    },
    [onTaskCheckedChange]
  )

  return (
    <Row className={'mb-4'}>
      <Suspense
        fallback={
          <Col>
            <WaitSpinner />
          </Col>
        }>
        <Col md={5}>
          <DocumentMarkdownRenderer
            content={code}
            baseUrl={'https://example.org'}
            onTaskCheckedChange={checkboxClick}
          />
        </Col>
        <Col md={7} className={'markdown-body'}>
          <HighlightedCode code={code} wrapLines={true} startLineNumber={1} language={'markdown'} />
        </Col>
      </Suspense>
    </Row>
  )
}
