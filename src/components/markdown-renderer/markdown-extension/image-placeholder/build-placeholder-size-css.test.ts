/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { calculatePlaceholderContainerSize, parseSizeNumber } from './build-placeholder-size-css'

describe('convertToNumber', () => {
  it('undefined', () => {
    expect(parseSizeNumber(undefined)).toBe(undefined)
  })
  it('0 as number', () => {
    expect(parseSizeNumber(0)).toBe(0)
  })
  it('234 as number', () => {
    expect(parseSizeNumber(234)).toBe(234)
  })
  it('-123 as number', () => {
    expect(parseSizeNumber(-123)).toBe(-123)
  })
  it('345 as string', () => {
    expect(parseSizeNumber('345')).toBe(345)
  })
  it('456px as string', () => {
    expect(parseSizeNumber('456px')).toBe(456)
  })
})

describe('calculatePlaceholderContainerSize', () => {
  it('width undefined | height undefined', () => {
    expect(calculatePlaceholderContainerSize(undefined, undefined)).toStrictEqual({ width: '500px', height: '200px' })
  })
  it('width 200 | height undefined', () => {
    expect(calculatePlaceholderContainerSize(200, undefined)).toStrictEqual({ width: '200px', height: '80px' })
  })
  it('width undefined | height 100', () => {
    expect(calculatePlaceholderContainerSize(undefined, 100)).toStrictEqual({ width: '250px', height: '100px' })
  })
  it('width 345 | height 234', () => {
    expect(calculatePlaceholderContainerSize(345, 234)).toStrictEqual({ width: '345px', height: '234px' })
  })
})
