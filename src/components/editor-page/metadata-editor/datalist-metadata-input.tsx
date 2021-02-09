/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback } from 'react'
import { MetadataInputFieldProps, SelectMetadataOptions } from './metadata-editor'

export const DatalistMetadataInput: React.FC<MetadataInputFieldProps<string> & SelectMetadataOptions<string>> = ({ id, content, onContentChange, options }) => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onContentChange(event.currentTarget.value)
  }, [onContentChange])

  return (
    <Fragment>
      <input list={ id } onChange={ onChange } value={ content } className={ 'form-control' }/>
      <datalist id={ id }>
        { options.map(option => {
          return (
            <option value={ option }>
              { option }
            </option>
          )
        }) }
      </datalist>
    </Fragment>
  )
}
