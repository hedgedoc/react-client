/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { MetadataInputFieldProps, SelectMetadataOptions } from './metadata-editor'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export const DatalistMetadataInput: React.FC<MetadataInputFieldProps<string> & SelectMetadataOptions<string>> = ({ frontmatterKey, content, onContentChange, options }) => {
  const onSelect = useCallback((eventKey: string | null) => {
    if (eventKey === null) {
      return
    }
    onContentChange({ [frontmatterKey]: eventKey })
  }, [frontmatterKey, onContentChange])

  return (
    <DropdownButton onSelect={ onSelect } id={ frontmatterKey } title={ content }>
      {
        options.map((option) => <Dropdown.Item eventKey={ option } key={ option }>{ option }</Dropdown.Item>)
      }
    </DropdownButton>
  )
}
/*

 <!--<Fragment>
 <input list={ frontmatterKey } onChange={ onChange } value={ content } className={ 'form-control' }/>
 <datalist id={ frontmatterKey }>
 { options.map(option => (
 <option key={ option } value={ option }>
 { option }
 </option>
 )) }
 </datalist>
 </Fragment>-->
 */
