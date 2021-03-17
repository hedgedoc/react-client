/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { MetadataInputFieldProps } from './metadata-editor'
import { NoteTextDirection } from '../note-frontmatter/note-frontmatter'


export const TextDirectionMetadataInput: React.FC<MetadataInputFieldProps<NoteTextDirection>> = ({ frontmatterKey, content, onContentChange }) => {
  const { t } = useTranslation()

  const toggleButtonSelect = useCallback((value: NoteTextDirection) => {
    onContentChange({ dir: value })
  }, [onContentChange])

  return (
    <ToggleButtonGroup
      className={ 'd-block' }
      type="radio"
      name={ frontmatterKey }
      id={ frontmatterKey }
      value={ content }
      onChange={ toggleButtonSelect }>
      <ToggleButton
        value={ NoteTextDirection.LTR }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.LTR') }>
        <ForkAwesomeIcon icon={ 'align-left' }/>
        &nbsp;
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.LTR' }/>
      </ToggleButton>
      <ToggleButton
        value={ NoteTextDirection.RTL }
        variant="outline-secondary"
        title={ t('editor.modal.metadataEditor.labels.RTL') }>
        <ForkAwesomeIcon icon={ 'align-right' }/>
        &nbsp;
        <Trans i18nKey={ 'editor.modal.metadataEditor.labels.RTL' }/>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
