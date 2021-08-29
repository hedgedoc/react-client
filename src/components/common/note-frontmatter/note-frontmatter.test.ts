/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { NoteFrontmatter } from './note-frontmatter'

describe('yaml frontmatter', () => {
  it('should parse "title"', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString('title: test')
    expect(noteFrontmatter.title).toEqual('test')
  })

  it('should parse "robots"', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString('robots: index, follow')
    expect(noteFrontmatter.robots).toEqual('index, follow')
  })

  it('should parse the deprecated tags syntax', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString('tags: test123, abc')
    expect(noteFrontmatter.tags).toEqual(['test123', 'abc'])
    expect(noteFrontmatter.deprecatedTagsSyntax).toEqual(true)
  })

  it('should parse the tags list syntax', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString(`tags:
      - test123
      - abc
    `)
    expect(noteFrontmatter.tags).toEqual(['test123', 'abc'])
    expect(noteFrontmatter.deprecatedTagsSyntax).toEqual(false)
  })

  it('should parse the tag inline-list syntax', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString("tags: ['test123', 'abc']")
    expect(noteFrontmatter.tags).toEqual(['test123', 'abc'])
    expect(noteFrontmatter.deprecatedTagsSyntax).toEqual(false)
  })

  it('should parse "breaks"', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString('breaks: false')
    expect(noteFrontmatter.breaks).toEqual(false)
  })

  /*
   it('slideOptions nothing', () => {
   NoteFrontmatter.parseFromString(`---
   slideOptions:
   ___
   `,
   {
   slideOptions: null
   },
   {
   slideOptions: {
   theme: 'white',
   transition: 'none'
   }
   })
   })

   it('slideOptions.theme only', () => {
   NoteFrontmatter.parseFromString(`---
   slideOptions:
   theme: sky
   ___
   `,
   {
   slideOptions: {
   theme: 'sky',
   transition: undefined
   }
   },
   {
   slideOptions: {
   theme: 'sky',
   transition: 'none'
   }
   })
   })

   it('slideOptions full', () => {
   NoteFrontmatter.parseFromString(`---
   slideOptions:
   transition: zoom
   theme: sky
   ___
   `,
   {
   slideOptions: {
   theme: 'sky',
   transition: 'zoom'
   }
   },
   {
   slideOptions: {
   theme: 'sky',
   transition: 'zoom'
   }
   })
   })
   */

  it('should parse an empty opengraph object', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString('opengraph:')
    expect(noteFrontmatter.opengraph).toEqual(new Map<string, string>())
  })

  it('should parse an opengraph title', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString(`opengraph:
      title: Testtitle
    `)
    expect(noteFrontmatter.opengraph.get('title')).toEqual('Testtitle')
  })

  it('should parse multiple opengraph values', () => {
    const noteFrontmatter = NoteFrontmatter.parseFromString(`opengraph:
      title: Testtitle
      image: https://dummyimage.com/48.png
      image:type: image/png
    `)
    expect(noteFrontmatter.opengraph.get('title')).toEqual('Testtitle')
    expect(noteFrontmatter.opengraph.get('image')).toEqual('https://dummyimage.com/48.png')
    expect(noteFrontmatter.opengraph.get('image:type')).toEqual('image/png')
  })
})
