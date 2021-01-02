/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { DomElement } from 'domhandler'
import { ReactElement } from 'react'
import { ComponentReplacer, SubNodeTransform } from '../ComponentReplacer'

export class ExternalLinksInNewTab extends ComponentReplacer {
  public getReplacement (node: DomElement, subNodeTransform: SubNodeTransform): (ReactElement | null | undefined) {
    if (node.name !== 'a') {
      return undefined
    }

    const isInternalLink = node.attribs?.href?.substr(0, 1) === '#'

    let linkAttributes = {}
    if (!isInternalLink) {
      linkAttributes = {
        rel: 'noopener noreferrer',
        target: '_blank'
      }
    }

    return <a {...node.attribs} {...linkAttributes}>
      {
        node.children?.map((child, index) => subNodeTransform(child, index))
      }
    </a>
  }
}
