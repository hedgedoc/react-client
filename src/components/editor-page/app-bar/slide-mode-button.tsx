/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { useTranslation } from 'react-i18next'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import Link from 'next/link'

export const SlideModeButton: React.FC = () => {
  const { t } = useTranslation()
  const id = useApplicationState((state) => state.noteDetails.id)

  return (
    <Link href={`/p/${id}`}>
      <a target='_blank'>
        <Button
          title={t('editor.documentBar.slideMode')}
          className='ml-2 text-secondary'
          size='sm'
          variant='outline-light'>
          <ForkAwesomeIcon icon='television' />
        </Button>
      </a>
    </Link>
  )
}
