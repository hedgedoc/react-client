/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import { UploadIndicatingImageFrameReplacer } from '../upload-indicating-image-frame/upload-indicating-image-frame-replacer'

export class UploadIndicatingImageFrameMarkdownExtension extends MarkdownExtension {
  buildReplacers(): ComponentReplacer[] {
    return [new UploadIndicatingImageFrameReplacer()]
  }
}
