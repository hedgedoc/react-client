/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Suspense, useMemo } from 'react'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'

export const LazyCheatsheet: React.FC = () => {
  const Cheatsheet = React.lazy(() => import('./cheatsheet'))

  const waitSpinner = useMemo(() =>
    <div className={ 'm-3 d-flex align-items-center justify-content-center' }>
      <ForkAwesomeIcon icon={ 'spinner' } className={ 'fa-spin' }/>
    </div>, [])

  return (
    <Suspense fallback={ waitSpinner }>
      <Cheatsheet/>
    </Suspense>
  )
}
