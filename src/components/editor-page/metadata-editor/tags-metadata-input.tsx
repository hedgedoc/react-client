/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useState } from 'react'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { MetadataInputFieldProps } from './metadata-editor'
import './tags-metadata-input.scss'

export const TagsMetadataInput: React.FC<MetadataInputFieldProps<string[]>> = ({ id, content, onContentChange }) => {

  const [newTag, setNewTag] = useState<string>('')

  const addTag = useCallback(() => {
    if (!/^\s*$/.test(newTag)) {
      onContentChange([...content, newTag])
      setNewTag('')
    }
  }, [content, newTag, onContentChange])

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      addTag()
    }
  }, [addTag])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.currentTarget.value)
  }, [])

  const dismissTag = useCallback((clickedTag: string) => {
    onContentChange(content.filter(tag => tag !== clickedTag))
  }, [content, onContentChange])

  return (
    <Fragment>
      <div className='d-flex flex-row mb-2 mt-1 overflow-x-scroll'>
        {
          content.map(tag => {
            return (
              <div className='rounded-pill mr-1 px-2 bg-primary tag-bubble' key={ tag }>
                <span className={ 'user-select-none' }>{ tag }</span>
                <ForkAwesomeIcon icon={ 'times' } className='pl-1 cursor-pointer' onClick={ () => dismissTag(tag) }/>
              </div>
            )
          })
        }
      </div>
      <input
        type="text"
        id={ id }
        className='form-control'
        value={ newTag }
        onKeyDown={ onKeyDown }
        onChange={ onChange }/>
    </Fragment>
  )
}
