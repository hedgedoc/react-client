/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { MetadataInputFieldProps } from './metadata-editor'

enum ButtonState {
  ON,
  OFF
}

export const BreaksMetadataInput: React.FC<MetadataInputFieldProps<boolean>> = ({ id, content, onContentChange }) => {
  const { t } = useTranslation()

  return (
    <ToggleButtonGroup
      type="radio"
      name={ id }
      id={ id }
      value={ content ? ButtonState.ON : ButtonState.OFF }
      className={ 'd-block' }>
      <ToggleButton
        value={ ButtonState.ON }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.breaksOn') }
        onChange={ () => onContentChange(true) }>
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.breaksOn' }/>
      </ToggleButton>
      <ToggleButton
        value={ ButtonState.OFF }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.breaksOff') }
        onChange={ () => onContentChange(false) }>
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.breaksOff' }/>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
