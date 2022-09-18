/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { render, act, screen } from '@testing-library/react'
import testEvent from '@testing-library/user-event'
import React from 'react'
import { mockI18n } from '../../../markdown-renderer/test-utils/mock-i18n'
import * as AliasModule from '../../../../api/alias'
import * as NoteDetailsReduxModule from '../../../../redux/note-details/methods'
import * as useApplicationStateModule from '../../../../hooks/common/use-application-state'
import { AliasesAddForm } from './aliases-add-form'

jest.mock('../../../../api/alias')
jest.mock('../../../../redux/note-details/methods')
jest.mock('../../../../hooks/common/use-application-state')

const addPromise = Promise.resolve({ name: 'mock', primaryAlias: true, noteId: 'mock' })

describe('AliasesAddForm', () => {
  beforeEach(async () => {
    await mockI18n()
    jest.spyOn(AliasModule, 'addAlias').mockImplementation(() => addPromise)
    jest.spyOn(NoteDetailsReduxModule, 'updateMetadata').mockImplementation(() => Promise.resolve())
    jest.spyOn(useApplicationStateModule, 'useApplicationState').mockReturnValue('mock-note')
  })

  afterAll(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  it('renders the input form', async () => {
    const view = render(<AliasesAddForm />)
    expect(view.container).toMatchSnapshot()
    const button = screen.getByTitle('editor.modal.aliases.addAlias')
    expect(button).toBeDisabled()
    const input = screen.getByPlaceholderText('editor.modal.aliases.addAlias')
    await testEvent.type(input, 'abc')
    expect(button).toBeEnabled()
    act(() => {
      button.click()
    })
    expect(AliasModule.addAlias).toBeCalledWith('mock-note', 'abc')
    await addPromise
    expect(NoteDetailsReduxModule.updateMetadata).toBeCalled()
  })
})
