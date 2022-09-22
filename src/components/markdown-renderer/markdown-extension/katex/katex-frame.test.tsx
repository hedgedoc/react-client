/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { render } from '@testing-library/react'
import KatexFrame from './katex-frame'

describe('katex frame', () => {
  describe('renders a valid latex expression', () => {
    it('as implicit inline', () => {
      const view = render(<KatexFrame expression={'\\int_0^\\infty x^2 dx'}></KatexFrame>)
      expect(view.container).toMatchSnapshot()
    })
    it('as explicit inline', () => {
      const view = render(<KatexFrame expression={'\\int_0^\\infty x^2 dx'} block={false}></KatexFrame>)
      expect(view.container).toMatchSnapshot()
    })
    it('as explicit block', () => {
      const view = render(<KatexFrame expression={'\\int_0^\\infty x^2 dx'} block={true}></KatexFrame>)
      expect(view.container).toMatchSnapshot()
    })
  })

  describe('renders an error for an invalid latex expression', () => {
    it('as implicit inline', () => {
      const view = render(<KatexFrame expression={'\\alf'}></KatexFrame>)
      expect(view.container).toMatchSnapshot()
    })
    it('as explicit inline', () => {
      const view = render(<KatexFrame expression={'\\alf'} block={false}></KatexFrame>)
      expect(view.container).toMatchSnapshot()
    })
    it('as explicit block', () => {
      const view = render(<KatexFrame expression={'\\alf'} block={true}></KatexFrame>)
      expect(view.container).toMatchSnapshot()
    })
  })
})
