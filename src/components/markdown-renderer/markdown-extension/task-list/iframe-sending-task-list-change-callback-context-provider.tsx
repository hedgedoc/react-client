/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { TaskCheckedChangeCallback } from './task-list-checkbox'
import { CommunicationMessageType } from '../../../render-page/window-post-message-communicator/rendering-message'
import {
  TaskListCheckboxChangeCallbackProvider
} from './task-list-checkbox-change-callback-context'
import { useCallback } from 'react'
import { useRendererToEditorCommunicator } from '../../../editor-page/render-context/renderer-to-editor-communicator-context-provider'

export const IframeSendingTaskListChangeCallbackContextProvider: React.FC = ({  children }) => {
  const communicator = useRendererToEditorCommunicator()

  const onTaskCheckedChange: TaskCheckedChangeCallback = useCallback(
    (lineInMarkdown: number, checked: boolean) => {
      communicator.sendMessageToOtherSide({
        type: CommunicationMessageType.ON_TASK_CHECKBOX_CHANGE,
        checked,
        lineInMarkdown: lineInMarkdown
      })
    },
    [communicator]
  )

  return (
    <TaskListCheckboxChangeCallbackProvider onTaskCheckedChange={onTaskCheckedChange}>
      {children}
    </TaskListCheckboxChangeCallbackProvider>
  )
}
