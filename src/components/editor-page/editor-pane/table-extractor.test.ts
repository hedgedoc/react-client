/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { excelTableToMarkdown, isTable } from './table-extractor'

describe('isTable detection: ', () => {

  it('single line is no table', () => {
    const input = 'some none table'
    expect(isTable(input))
      .toBe(false)
  })

  it('multiple lines without tabs are no table', () => {
    const input = 'some none table\nanother line'
    expect(isTable(input))
      .toBe(false)
  })

  it('code blocks are no table', () => {
    const input = '```python\ndef a:\n\tprint("a")\n\tprint("b")```'
    expect(isTable(input))
      .toBe(false)
  })

  it('tab-indented text is no table', () => {
    const input = '\tsome tab indented text\n\tabc\n\tdef'
    expect(isTable(input))
      .toBe(false)
  })

  it('not equal number of tabs is no table', () => {
    const input = '1 ...\n2\tabc\n3\td\te\tf\n4\t16'
    expect(isTable(input))
      .toBe(false)
  })

  it('table without newline at end is valid', () => {
    const input = '1\t1\n2\t4\n3\t9\n4\t16\n5\t25'
    expect(isTable(input))
      .toBe(true)
  })

  it('table with newline at end is valid', () => {
    const input = '1\t1\n2\t4\n3\t9\n4\t16\n5\t25\n'
    expect(isTable(input))
      .toBe(true)
  })

  it('table with some first cells missing is valid', () => {
    const input = '1\t1\n\t0\n\t0\n4\t16\n5\t25\n'
    expect(isTable(input))
      .toBe(true)
  })

  it('table with some last cells missing is valid', () => {
    const input = '1\t1\n2\t\n3\t\n4\t16\n'
    expect(isTable(input))
      .toBe(true)
  })
})

describe('Conversion from "excel" to markdown table', () => {
  it('works with normal table without newline at end', () => {
    const input = '1\t1\ta\n2\t4\tb\n3\t9\tc\n4\t16\td'
    expect(excelTableToMarkdown(input))
      .toEqual('| #1 | #2 | #3 |\n| -- | -- | -- |\n| 1 | 1 | a |\n| 2 | 4 | b |\n| 3 | 9 | c |\n| 4 | 16 | d |')
  })

  it('works with normal table with newline at end', () => {
    const input = '1\t1\n2\t4\n3\t9\n4\t16\n'
    expect(excelTableToMarkdown(input))
      .toEqual('| #1 | #2 |\n| -- | -- |\n| 1 | 1 |\n| 2 | 4 |\n| 3 | 9 |\n| 4 | 16 |')
  })

  it('works with table with some first cells missing', () => {
    const input = '1\t1\n\t0\n\t0\n4\t16\n'
    expect(excelTableToMarkdown(input))
      .toEqual('| #1 | #2 |\n| -- | -- |\n| 1 | 1 |\n|  | 0 |\n|  | 0 |\n| 4 | 16 |')
  })

  it('works with table with some last cells missing', () => {
    const input = '1\t1\n2\t\n3\t\n4\t16\n'
    expect(excelTableToMarkdown(input))
      .toEqual('| #1 | #2 |\n| -- | -- |\n| 1 | 1 |\n| 2 |  |\n| 3 |  |\n| 4 | 16 |')
  })
})
