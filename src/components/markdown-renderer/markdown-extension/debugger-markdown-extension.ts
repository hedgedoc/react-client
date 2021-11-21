/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import type MarkdownIt from 'markdown-it'
import { Logger } from '../../../utils/logger'

const log = new Logger('DebuggerMarkdownExtension')

export class DebuggerMarkdownExtension extends MarkdownExtension {
  public configureMarkdownItPost(markdownIt: MarkdownIt): void {
    if (process.env.NODE_ENV !== 'production') {
      markdownIt.core.ruler.push('printStateToConsole', (state) => {
        log.debug('Current state', state)
        return false
      })
    }
  }
}