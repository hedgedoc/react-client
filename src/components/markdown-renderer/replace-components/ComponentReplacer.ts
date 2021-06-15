/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Element, isText, NodeWithChildren } from 'domhandler'
import MarkdownIt from 'markdown-it'
import { ReactElement } from 'react'

export type ValidReactDomElement = ReactElement | string | null

export type SubNodeTransform = (node: Element, subKey: number | string) => ValidReactDomElement | void

export type NativeRenderer = () => ValidReactDomElement

export type MarkdownItPlugin = MarkdownIt.PluginSimple | MarkdownIt.PluginWithOptions | MarkdownIt.PluginWithParams

export abstract class ComponentReplacer {
  /**
   * Extracts the content of the first text child node.
   *
   * @param node the node with the text node child
   * @return the string content
   */
  protected static extractTextChildContent(node: NodeWithChildren): string {
    const childrenTextNode = node.children[0]
    return isText(childrenTextNode) ? childrenTextNode.data : ''
  }

  public abstract getReplacement(
    node: Element,
    subNodeTransform: SubNodeTransform,
    nativeRenderer: NativeRenderer
  ): ValidReactDomElement | undefined
}
