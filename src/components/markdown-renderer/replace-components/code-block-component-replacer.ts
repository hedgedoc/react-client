/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ValidReactDomElement } from './component-replacer'
import { ComponentReplacer } from './component-replacer'
import type { FunctionComponent } from 'react'
import React from 'react'
import type { Element } from 'domhandler'

export interface CodeProps {
  code: string
}

export class CodeBlockComponentReplacer extends ComponentReplacer {
  constructor(private component: FunctionComponent<CodeProps>, private language: string) {
    super()
  }

  replace(node: Element): ValidReactDomElement | undefined {
    const code = CodeBlockComponentReplacer.extractTextFromCodeNode(node, this.language)
    return code ? React.createElement(this.component, { code: code }) : undefined
  }

  public static extractTextFromCodeNode(node: Element, language: string): string | undefined {
    return node.name === 'code' && node.attribs['data-highlight-language'] === language && node.children[0]
      ? ComponentReplacer.extractTextChildContent(node)
      : undefined
  }
}
