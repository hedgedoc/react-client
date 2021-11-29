/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface RawNoteFrontmatter {
  title: string | undefined
  description: string | undefined
  tags: string | string[] | undefined
  robots: string | undefined
  lang: string | undefined
  dir: string | undefined
  breaks: boolean | undefined
  GA: string | undefined
  disqus: string | undefined
  type: string | undefined
  slideOptions: { [key: string]: string } | null
  opengraph: { [key: string]: string } | null
}
