/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { MetadataInputFieldProps } from './metadata-editor'

export const StringMetadataInput: React.FC<MetadataInputFieldProps<string>> = ({ content, onContentChange, frontmatterKey }) => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onContentChange({ [frontmatterKey]: event.currentTarget.value })
  }, [frontmatterKey, onContentChange])

  return (
    <input
      id={ frontmatterKey }
      type="text"
      className={ 'form-control' }
      value={ content }
      onChange={ onChange }
    />
  )
}
