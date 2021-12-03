/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NativeRenderer, NodeReplacement, SubNodeTransform } from '../../replace-components/component-replacer'
import { ComponentReplacer } from '../../replace-components/component-replacer'
import type { Element } from 'domhandler'
import { UploadIndicatingFrame } from './upload-indicating-frame'

const uploadIdRegex = /^upload-(.*)$/

export class UploadIndicatingImageFrameReplacer extends ComponentReplacer {
  replace(node: Element, subNodeTransform: SubNodeTransform, nativeRenderer: NativeRenderer): NodeReplacement {
    if (node.name === 'img' && uploadIdRegex.test(node.attribs.src)) {
      return <UploadIndicatingFrame width={node.attribs.width} height={node.attribs.height} />
    }
  }
}
