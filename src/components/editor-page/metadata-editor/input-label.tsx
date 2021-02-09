/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import './input-label.scss'
import { Form } from 'react-bootstrap'

export interface InputLabelProps {
  id: string
  label: string
}

export const InputLabel: React.FC<InputLabelProps> = ({ id, label, children }) => {
  return (
    <Form.Group className={ 'pb-3' }>
      <label className='small font-weight-lighter tighter' htmlFor={ id }>{ label }</label>
      { children }
    </Form.Group>
  )
}
