/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { MetadataInputFieldProps } from './metadata-editor'

export const StringMetadataInput: React.FC<MetadataInputFieldProps<string>> = ({ id, content, onContentChange }) => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onContentChange(event.currentTarget.value)
  }, [onContentChange])

  return (
    <input
      id={ id }
      type="text"
      className={ 'form-control' }
      value={ content }
      onChange={ onChange }
    />
  )
}
