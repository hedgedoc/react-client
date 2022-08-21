/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { mockI18n } from '../test-utils/mock-i18n'
import { render } from '@testing-library/react'
import { TestMarkdownRenderer } from '../test-utils/test-markdown-renderer'
import { LinkifyFixMarkdownExtension } from './linkify-fix-markdown-extension'

describe('Linkify markdown extensions', () => {
  beforeAll(async () => {
    await mockI18n()
  })

  it('renders a .rocks link correctly', () => {
    const view = render(
      <TestMarkdownRenderer
        extensions={[new LinkifyFixMarkdownExtension()]}
        content={'example.rocks\n\nexample.com\n\nexample.de'}
      />
    )
    expect(view.container).toMatchSnapshot()
  })
})
