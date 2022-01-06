/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { createContext } from 'react'
import type { TaskCheckedChangeCallback } from './task-list-checkbox'

export const taskListCheckboxChangeCallbackContext = createContext<TaskCheckedChangeCallback | undefined>(undefined)

export interface TaskListCheckboxChangeCallbackContextProps {
  onTaskCheckedChange?: TaskCheckedChangeCallback
}

export const TaskListCheckboxChangeCallbackProvider: React.FC<TaskListCheckboxChangeCallbackContextProps> = ({
  onTaskCheckedChange,
  children
}) => {
  return (
    <taskListCheckboxChangeCallbackContext.Provider value={onTaskCheckedChange}>
      {children}
    </taskListCheckboxChangeCallbackContext.Provider>
  )
}
