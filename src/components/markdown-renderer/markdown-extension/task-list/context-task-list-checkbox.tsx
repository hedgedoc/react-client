/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext } from 'react'
import type { TaskListProps } from './task-list-checkbox'
import { TaskListCheckbox } from './task-list-checkbox'
import { taskListCheckboxChangeCallbackContext } from './task-list-checkbox-change-callback-context'

export type ContextTaskListCheckboxProps = Omit<TaskListProps, 'onTaskCheckedChange'>

export const ContextTaskListCheckbox: React.FC<ContextTaskListCheckboxProps> = ({ ...props }) => {
  const onTaskCheckedChange = useContext(taskListCheckboxChangeCallbackContext)

  return <TaskListCheckbox onTaskCheckedChange={onTaskCheckedChange} {...props} />
}
