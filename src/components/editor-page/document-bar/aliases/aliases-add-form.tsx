/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { useTranslation } from 'react-i18next'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { addAlias } from '../../../../api/alias'
import { updateMetadata } from '../../../../redux/note-details/methods'
import { showErrorNotification } from '../../../../redux/ui-notifications/methods'
import { useOnInputChange } from '../../../../hooks/common/use-on-input-change'

const validAliasRegex = /^[a-z0-9_-]*$/

/**
 * Form for adding a new alias to a note.
 */
export const AliasesAddForm: React.FC = () => {
  const { t } = useTranslation()
  const noteId = useApplicationState((state) => state.noteDetails.id)
  const [newAlias, setNewAlias] = useState('')

  const onAddAlias = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      addAlias(noteId, newAlias)
        .then(updateMetadata)
        .catch(showErrorNotification('editor.modal.aliases.errorAddingAlias'))
        .finally(() => {
          setNewAlias('')
        })
    },
    [noteId, newAlias, setNewAlias]
  )

  const onNewAliasInputChange = useOnInputChange(setNewAlias)

  const newAliasValid = useMemo(() => {
    return validAliasRegex.test(newAlias)
  }, [newAlias])

  return (
    <form onSubmit={onAddAlias}>
      <InputGroup className={'mr-1 mb-1'} hasValidation={true}>
        <Form.Control
          value={newAlias}
          placeholder={t('editor.modal.aliases.addAlias')}
          onChange={onNewAliasInputChange}
          isInvalid={!newAliasValid}
          required={true}
        />
        <Button
          type={'submit'}
          variant='light'
          className={'text-secondary ml-2'}
          disabled={!newAliasValid || newAlias === ''}
          title={t('editor.modal.aliases.addAlias')}>
          <ForkAwesomeIcon icon={'plus'} />
        </Button>
      </InputGroup>
    </form>
  )
}