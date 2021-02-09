/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { TextDirection } from '../note-frontmatter/note-frontmatter'
import { MetadataInputFieldProps } from './metadata-editor'


export const TextDirectionMetadataInput: React.FC<MetadataInputFieldProps<TextDirection>> = ({ id, content, onContentChange }) => {
  const { t } = useTranslation()

  return (
    <ToggleButtonGroup
      className={ 'd-block' }
      type="radio"
      name={ id }
      id={ id }
      value={ content }>
      <ToggleButton
        value={ TextDirection.LTR }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.LTR') }
        onChange={ () => onContentChange(TextDirection.LTR) }>
        <ForkAwesomeIcon icon={ 'align-left' }/>
        &nbsp;
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.LTR' }/>
      </ToggleButton>
      <ToggleButton
        value={ TextDirection.RTL }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.RTL') }
        onChange={ () => onContentChange(TextDirection.RTL) }>
        <ForkAwesomeIcon icon={ 'align-right' }/>
        &nbsp;
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.RTL' }/>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
