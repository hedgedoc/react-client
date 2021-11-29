/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NativeRenderer, NodeReplacement, SubNodeTransform } from '../../replace-components/component-replacer'
import { ComponentReplacer, DO_NOT_REPLACE } from '../../replace-components/component-replacer'
import type { Element } from 'domhandler'
import { ClickShield } from '../../replace-components/click-shield/click-shield'

/**
 * Capsules <iframe> elements with a click shield.
 *
 * @see ClickShield
 */
export class IframeCapsuleReplacer extends ComponentReplacer {
  replace(node: Element, subNodeTransform: SubNodeTransform, nativeRenderer: NativeRenderer): NodeReplacement {
    if (node.name === 'iframe') {
      return (
        <ClickShield
          hoverIcon={'globe'}
          targetDescription={node.attribs.src}
          data-cypress-id={'iframe-capsule-click-shield'}>
          {nativeRenderer()}
        </ClickShield>
      )
    } else {
      return DO_NOT_REPLACE
    }
  }
}
