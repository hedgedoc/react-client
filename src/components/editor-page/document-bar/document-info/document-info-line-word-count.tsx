/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ShowIf } from '../../../common/show-if/show-if'
import { DocumentInfoLine } from './document-info-line'
import { UnitalicBoldText } from './unitalic-bold-text'

export const DocumentInfoLineWordCount: React.FC = () => {
  useTranslation()

  // -1 means the word count isn't determined yet, any non-negative number is the actual counting result
  const [wordCount, setWordCount] = useState(-1)

  useEffect(() => {
    // Send question to iframe and set answer to wordCount
  }, [setWordCount])

  return (
    <DocumentInfoLine icon={ 'align-left' } size={ '2x' }>
      <ShowIf condition={ wordCount === -1 }>
        <Trans i18nKey={ 'common.loading' }/>
      </ShowIf>
      <ShowIf condition={ wordCount > -1 }>
        <Trans i18nKey={ 'editor.modal.documentInfo.words' }>
          <UnitalicBoldText text={ wordCount }/>
        </Trans>
      </ShowIf>
    </DocumentInfoLine>
  )
}
