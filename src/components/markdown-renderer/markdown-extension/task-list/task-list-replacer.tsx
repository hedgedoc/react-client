/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Element } from 'domhandler'
import type { ReactElement } from 'react'
import React from 'react'
import { ComponentReplacer } from '../../replace-components/component-replacer'
import { ContextTaskListCheckbox } from './context-task-list-checkbox'

export type TaskCheckedChangeHandler = (lineInMarkdown: number, checked: boolean) => void

/**
 * Detects task lists and renders them as checkboxes that execute a callback if clicked.
 */
export class TaskListReplacer extends ComponentReplacer {
  constructor() {
    super()
  }

  public replace(node: Element): ReactElement | undefined {
    if (node.attribs?.class !== 'task-list-item-checkbox') {
      return
    }
    const lineInMarkdown = Number(node.attribs['data-line'])
    if (isNaN(lineInMarkdown)) {
      return undefined
    }
    return (
      <ContextTaskListCheckbox
        checked={node.attribs.checked !== undefined}
        lineInMarkdown={lineInMarkdown}
      />
    )
  }
}
