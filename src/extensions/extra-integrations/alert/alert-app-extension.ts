/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { AppExtension } from '../../base/app-extension'
import { AlertMarkdownExtension } from './alert-markdown-extension'
import type { MarkdownRendererExtension } from '../../../components/markdown-renderer/extensions/base/markdown-renderer-extension'

/**
 * Adds alert boxes to the markdown rendering.
 */
export class AlertAppExtension extends AppExtension {
  buildMarkdownRendererExtensions(): MarkdownRendererExtension[] {
    return [new AlertMarkdownExtension()]
  }
}
