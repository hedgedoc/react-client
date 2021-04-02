/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { MetadataInputFieldProps } from './metadata-editor'

export const StringMetadataTextarea: React.FC<MetadataInputFieldProps<string>> = ({ frontmatterKey, content, onContentChange }) => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange({ [frontmatterKey]: event.currentTarget.value })
  }, [frontmatterKey, onContentChange])

  return (
    <textarea
      id={ frontmatterKey }
      className={ 'form-control' }
      value={ content }
      onChange={ onChange }
    />
  )
}
