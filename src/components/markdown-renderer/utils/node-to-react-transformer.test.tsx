/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { NodeToReactTransformer } from './node-to-react-transformer'
import { Element } from 'domhandler'
import type { ReactElement, ReactHTMLElement } from 'react'
import type { NodeReplacement } from '../replace-components/component-replacer'
import { DO_NOT_REPLACE, REPLACE_WITH_NOTHING } from '../replace-components/component-replacer'

describe('node to react transformer', () => {
  let nodeToReactTransformer: NodeToReactTransformer
  let defaultTestSpanElement: Element

  beforeEach(() => {
    defaultTestSpanElement = new Element('span', { 'data-test': 'test' })
    nodeToReactTransformer = new NodeToReactTransformer()
  })

  describe('replacement', () => {
    it('can translate an element without any replacer', () => {
      const translation = nodeToReactTransformer.translateNodeToReactElement(defaultTestSpanElement, 1) as ReactElement
      expect(translation.type).toEqual('span')
      expect(translation.props).toEqual({ children: [], 'data-test': 'test' })
    })

    it('can replace an element nothing', () => {
      nodeToReactTransformer.setReplacers([
        {
          replace(): NodeReplacement {
            return REPLACE_WITH_NOTHING
          }
        }
      ])
      const translation = nodeToReactTransformer.translateNodeToReactElement(defaultTestSpanElement, 1) as ReactElement
      expect(translation).toEqual(null)
    })

    it('can translate an element with no matching replacer', () => {
      nodeToReactTransformer.setReplacers([
        {
          replace(): NodeReplacement {
            return DO_NOT_REPLACE
          }
        }
      ])
      const translation = nodeToReactTransformer.translateNodeToReactElement(defaultTestSpanElement, 1) as ReactElement

      expect(translation.type).toEqual('span')
      expect(translation.props).toEqual({ children: [], 'data-test': 'test' })
    })

    it('can replace an element', () => {
      nodeToReactTransformer.setReplacers([
        {
          replace(): NodeReplacement {
            return <div data-test2={'test2'} />
          }
        }
      ])
      const translation = nodeToReactTransformer.translateNodeToReactElement(defaultTestSpanElement, 1) as ReactElement

      expect(translation.type).toEqual('div')
      expect(translation.props).toEqual({ 'data-test2': 'test2' })
    })
  })

  describe('key calculation', () => {
    beforeEach(() => {
      nodeToReactTransformer.setLineIds([
        {
          id: 1,
          line: 'test'
        }
      ])
    })

    it('can calculate a fallback key', () => {
      const result = nodeToReactTransformer.translateNodeToReactElement(
        defaultTestSpanElement,
        1
      ) as ReactHTMLElement<HTMLDivElement>

      expect(result.type).toEqual('span')
      expect(result.key).toEqual('-1')
    })

    it('can calculate a key based on line markers and line keys', () => {
      const lineMarker = new Element('app-linemarker', { 'data-start-line': '1', 'data-end-line': '2' })
      defaultTestSpanElement.prev = lineMarker
      const rootElement: Element = new Element('div', {}, [lineMarker, defaultTestSpanElement])

      const result = nodeToReactTransformer.translateNodeToReactElement(
        rootElement,
        1
      ) as ReactHTMLElement<HTMLDivElement>
      const resultSpanTag = (result.props.children as ReactElement[])[1]

      expect(result.type).toEqual('div')
      expect(resultSpanTag.type).toEqual('span')
      expect(resultSpanTag.key).toEqual('1_1')
    })
  })
})
