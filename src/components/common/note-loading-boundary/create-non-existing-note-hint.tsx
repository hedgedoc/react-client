/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Trans, useTranslation } from 'react-i18next'
import React, { useCallback } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useSingleStringUrlParameter } from '../../../hooks/common/use-single-string-url-parameter'
import { createNoteWithPrimaryAlias } from '../../../api/notes'
import { useAsyncFn } from 'react-use'
import { ShowIf } from '../show-if/show-if'
import { Redirect } from '../redirect'
import { ForkAwesomeIcon } from '../fork-awesome/fork-awesome-icon'
import { testId } from '../../../utils/test-id'

/**
 * Shows a button that creates an empty note with the alias from the current window URL.
 * When the button was clicked it also shows the progress.
 */
export const CreateNonExistingNoteHint: React.FC = () => {
  useTranslation()
  const noteIdFromUrl = useSingleStringUrlParameter('noteId', undefined)

  const [returnState, createNote] = useAsyncFn(async () => {
    if (noteIdFromUrl === undefined) {
      throw new Error('Note id not set')
    }
    return await createNoteWithPrimaryAlias('', noteIdFromUrl)
  }, [noteIdFromUrl])

  const onClickHandler = useCallback(() => {
    void createNote()
  }, [createNote])

  if (noteIdFromUrl === undefined) {
    return null
  } else if (returnState.value) {
    return <Redirect to={`/n/${returnState.value.metadata.primaryAddress}`} />
  } else if (returnState.loading) {
    return (
      <div className={'d-flex flex-column mt-5'} {...testId('loadingMessage')}>
        <b>
          <ForkAwesomeIcon icon={'spinner'} className={'fa-spin mr-2'} />
          <Trans i18nKey={'noteLoadingBoundary.createNote.creating'} />
        </b>
      </div>
    )
  } else if (returnState.error !== undefined) {
    return (
      <Alert variant={'danger'} {...testId('failedMessage')} className={'mt-5'}>
        <ForkAwesomeIcon icon={'exclamation-triangle'} className={'mr-1'} />
        <Trans i18nKey={'noteLoadingBoundary.createNote.error'} />
      </Alert>
    )
  } else {
    return (
      <div className={'d-flex flex-column mt-5'}>
        <b>
          <Trans i18nKey={'noteLoadingBoundary.createNote.question'} values={{ aliasName: noteIdFromUrl }} />
        </b>
        <div className={'mt-3'}>
          <Button
            autoFocus
            type='submit'
            variant='primary'
            className='mx-2'
            onClick={onClickHandler}
            {...testId('createNoteButton')}>
            <ShowIf condition={returnState.loading}>
              <ForkAwesomeIcon icon={'spinner'} className={'fa-spin mr-2'} />
            </ShowIf>
            <Trans i18nKey={'noteLoadingBoundary.createNote.create'} />
          </Button>
        </div>
      </div>
    )
  }
}
