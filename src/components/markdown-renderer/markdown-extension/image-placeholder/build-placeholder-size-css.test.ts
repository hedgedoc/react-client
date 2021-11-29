/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { buildPlaceholderSizeCss, convertToNumber } from './build-placeholder-size-css'

describe('convertToNumber', () => {
  it('undefined', () => {
    expect(convertToNumber(undefined)).toBe(undefined)
  })
  it('0 as number', () => {
    expect(convertToNumber(0)).toBe(0)
  })
  it('234 as number', () => {
    expect(convertToNumber(234)).toBe(234)
  })
  it('-123 as number', () => {
    expect(convertToNumber(-123)).toBe(-123)
  })
  it('345 as string', () => {
    expect(convertToNumber('345')).toBe(345)
  })
  it('456px as string', () => {
    expect(convertToNumber('456px')).toBe(456)
  })
})

describe('buildPlaceholderSizeCss', () => {
  it('width undefined | height undefined', () => {
    expect(buildPlaceholderSizeCss(undefined, undefined)).toStrictEqual({ width: '500px', height: '200px' })
  })
  it('width 200 | height undefined', () => {
    expect(buildPlaceholderSizeCss(200, undefined)).toStrictEqual({ width: '200px', height: '80px' })
  })
  it('width undefined | height 100', () => {
    expect(buildPlaceholderSizeCss(undefined, 100)).toStrictEqual({ width: '250px', height: '100px' })
  })
  it('width 345 | height 234', () => {
    expect(buildPlaceholderSizeCss(345, 234)).toStrictEqual({ width: '345px', height: '234px' })
  })
})
