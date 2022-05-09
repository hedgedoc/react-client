/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import * as useSingleStringUrlParameterModule from '../../../hooks/common/use-single-string-url-parameter'
import * as getNoteModule from '../../../api/notes'
import * as setNoteDataFromServerModule from '../../../redux/note-details/methods'
import type { Note } from '../../../api/notes/types'
import { Mock } from 'ts-mockery'
import { render, screen } from '@testing-library/react'
import { NoteLoadingBoundary } from './note-loading-boundary'
import * as LoadingScreenModule from '../../../components/application-loader/loading-screen/loading-screen'
import { testId } from '../../../utils/test-id'
import { Fragment } from 'react'

describe('Note loading boundary', () => {
  const mockedNoteId = 'mockedNoteId'

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  beforeEach(() => {
    jest.spyOn(LoadingScreenModule, 'LoadingScreen').mockImplementation(({ errorMessage }) => {
      return (
        <Fragment>
          <span {...testId('LoadingScreen')}>This is a mock for LoadingScreen.</span>
          {errorMessage ? <span {...testId('LoadingScreen.Error')}> Error message: {errorMessage}</span> : null}
        </Fragment>
      )
    })
    mockGetNoteIdQueryParameter()
  })

  const mockGetNoteIdQueryParameter = () => {
    const expectedQueryParameter = 'noteId'
    jest.spyOn(useSingleStringUrlParameterModule, 'useSingleStringUrlParameter').mockImplementation((parameter) => {
      expect(parameter).toBe(expectedQueryParameter)
      return mockedNoteId
    })
  }

  const mockGetNoteApiCall = (returnValue: Note) => {
    jest.spyOn(getNoteModule, 'getNote').mockImplementation((id) => {
      expect(id).toBe(mockedNoteId)
      return new Promise((resolve) => {
        setTimeout(() => resolve(returnValue), 0)
      })
    })
  }

  const mockCrashingNoteApiCall = () => {
    jest.spyOn(getNoteModule, 'getNote').mockImplementation((id) => {
      expect(id).toBe(mockedNoteId)
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('CRAAAAASH')), 0)
      })
    })
  }

  const mockSetNoteInRedux = (expectedNote: Note): jest.SpyInstance<void, [apiResponse: Note]> => {
    return jest.spyOn(setNoteDataFromServerModule, 'setNoteDataFromServer').mockImplementation((givenNote) => {
      expect(givenNote).toBe(expectedNote)
    })
  }

  it('loads a note', async () => {
    const mockedNote: Note = Mock.of<Note>()
    mockGetNoteApiCall(mockedNote)
    const setNoteInReduxFunctionMock = mockSetNoteInRedux(mockedNote)

    const view = render(
      <NoteLoadingBoundary>
        <span data-testid={'success'}>success!</span>
      </NoteLoadingBoundary>
    )
    await screen.findByTestId('LoadingScreen')
    await screen.findByTestId('success')
    expect(view.container).toMatchSnapshot()
    expect(setNoteInReduxFunctionMock).toBeCalledWith(mockedNote)
  })

  it('shows an error', async () => {
    const mockedNote: Note = Mock.of<Note>()
    mockCrashingNoteApiCall()
    const setNoteInReduxFunctionMock = mockSetNoteInRedux(mockedNote)

    const view = render(
      <NoteLoadingBoundary>
        <span data-testid={'success'}>success!</span>
      </NoteLoadingBoundary>
    )
    await screen.findByTestId('LoadingScreen')
    await screen.findByTestId('LoadingScreen.Error')
    expect(view.container).toMatchSnapshot()
    expect(setNoteInReduxFunctionMock).not.toBeCalled()
  })
})
