/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { isTable } from './table-extractor'

describe('isTable detection', () => {

  it('single line', () => {
    const input = 'some none table'
    expect(isTable(input)).toBe(false)
  })

  it('multi lines without tabs', () => {
    const input = 'some none table\nanother line'
    expect(isTable(input)).toBe(false)
  })

  it('code blocks', () => {
    const input = '```python\ndef a:\n\tprint("a")\n\tprint("b")```'
    expect(isTable(input)).toBe(false)
  })

  it ('not equal number of tabs', () => {
    const input = '1 ...\n2\tabc\n3\td\te\tf\n4\t16'
    expect(isTable(input)).toBe(false)
  })

  it('valid table without newline at end', () => {
    const input = '1\t1\n2\t4\n3\t9\n4\t16\n5\t25'
    expect(isTable(input)).toBe(true)
  })

  it('valid table with newline at end', () => {
    const input = '1\t1\n2\t4\n3\t9\n4\t16\n5\t25\n'
    expect(isTable(input)).toBe(true)
  })
})
