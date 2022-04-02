/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Suspense } from 'react'
import { createSetUpTaskList } from './initializers'
import { LoadingScreen } from './loading-screen/loading-screen'
import { Logger } from '../../utils/logger'
import { useAsync } from 'react-use'
import { ApplicationLoaderError } from './application-loader-error'

const log = new Logger('ApplicationLoader')

export const ApplicationLoader: React.FC = ({ children }) => {
  const { error, loading } = useAsync(async () => {
    const initTasks = createSetUpTaskList()
    for (const task of initTasks) {
      try {
        await task.task
      } catch (reason: unknown) {
        log.error('Error while initialising application', reason)
        throw new ApplicationLoaderError(task.name)
      }
    }
  }, [])

  if (loading) {
    return <LoadingScreen failedTaskName={error?.message} />
  } else {
    return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
  }
}
