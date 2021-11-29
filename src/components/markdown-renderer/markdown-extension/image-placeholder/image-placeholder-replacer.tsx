/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NativeRenderer, NodeReplacement, SubNodeTransform } from '../../replace-components/component-replacer'
import { ComponentReplacer } from '../../replace-components/component-replacer'
import type { Element } from 'domhandler'
import { ImagePlaceholder } from './image-placeholder'

export class ImagePlaceholderReplacer extends ComponentReplacer {
  private countPerSourceLine = new Map<number, number>()

  reset(): void {
    this.countPerSourceLine = new Map<number, number>()
  }

  replace(node: Element, subNodeTransform: SubNodeTransform, nativeRenderer: NativeRenderer): NodeReplacement {
    if (node.name === 'img' && node.attribs && node.attribs.src === 'https://') {
      const lineIndex = Number(node.attribs['data-line'])
      const indexInLine = this.countPerSourceLine.get(lineIndex) ?? 0
      this.countPerSourceLine.set(lineIndex, indexInLine + 1)
      return (
        <ImagePlaceholder
          alt={node.attribs.alt}
          title={node.attribs.title}
          width={node.attribs.width}
          height={node.attribs.height}
          line={isNaN(lineIndex) ? undefined : lineIndex}
          indexInLine={indexInLine}
        />
      )
    }
  }
}
