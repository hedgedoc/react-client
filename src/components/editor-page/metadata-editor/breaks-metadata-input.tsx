/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { MetadataInputFieldProps } from './metadata-editor'

enum ButtonState {
  ON = 1,
  OFF = 0
}

export const BreaksMetadataInput: React.FC<MetadataInputFieldProps<boolean>> = ({ frontmatterKey, content, onContentChange }) => {
  const { t } = useTranslation()

  const toggleButtonClick = useCallback((value: ButtonState) => {
    onContentChange({ breaks: value === ButtonState.ON })
  }, [onContentChange])

  return (
    <ToggleButtonGroup
      type="radio"
      name={ frontmatterKey }
      id={ frontmatterKey }
      value={ content ? ButtonState.ON : ButtonState.OFF }
      className={ 'd-block' }
      onChange={ toggleButtonClick }>
      <ToggleButton
        value={ ButtonState.ON }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.breaksOn') }>
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.breaksOn' }/>
      </ToggleButton>
      <ToggleButton
        value={ ButtonState.OFF }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.breaksOff') }>
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.breaksOff' }/>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
