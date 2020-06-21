import yaml from 'js-yaml'
import MarkdownIt from 'markdown-it'
import frontmatter from 'markdown-it-front-matter'
import { RawYAMLMetadata, YAMLMetaData } from './yaml-metadata'

describe('yaml tests', () => {
  let raw: RawYAMLMetadata | undefined
  let finished: YAMLMetaData | undefined
  const md = new MarkdownIt('default', {
    html: true,
    breaks: true,
    langPrefix: '',
    typographer: true
  })
  md.use(frontmatter, (rawMeta: string) => {
    raw = yaml.safeLoad(rawMeta) as RawYAMLMetadata
    finished = new YAMLMetaData(raw)
  })

  // generate default YAMLMetadata
  md.render('---\n---')
  const defaultYAML = finished

  raw = undefined
  finished = undefined

  const testMetadata = (input: string, expectedRaw: Partial<RawYAMLMetadata>, expectedFinished: Partial<YAMLMetaData>) => {
    md.render(input)
    expect(raw).not.toBe(undefined)
    expect(raw).toEqual(expectedRaw)
    expect(finished).not.toBe(undefined)
    expect(finished).toEqual({
      ...defaultYAML,
      ...expectedFinished
    })
  }

  beforeEach(() => {
    raw = undefined
    finished = undefined
  })

  it('title only', () => {
    testMetadata(`---
    title: test
    ___
    `,
    {
      title: 'test'
    },
    {
      title: 'test'
    })
  })

  it('robots only', () => {
    testMetadata(`---
    robots: index, follow
    ___
    `,
    {
      robots: 'index, follow'
    },
    {
      robots: 'index, follow'
    })
  })

  it('tags only', () => {
    testMetadata(`---
    tags: test123, abc
    ___
    `,
    {
      tags: 'test123, abc'
    },
    {
      tags: ['test123', 'abc']
    })
  })

  it('breaks only', () => {
    testMetadata(`---
    breaks: false
    ___
    `,
    {
      breaks: false
    },
    {
      breaks: false
    })
  })

  it('slideOptions nothing', () => {
    testMetadata(`---
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
    testMetadata(`---
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
    testMetadata(`---
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

  it('opengraph nothing', () => {
    testMetadata(`---
    opengraph:
    ___
    `,
    {
      opengraph: null
    },
    {
      opengraph: {
        title: '',
        image: '',
        'image:type': ''
      }
    })
  })

  it('opengraph title only', () => {
    testMetadata(`---
    opengraph:
      title: Testtitle
    ___
    `,
    {
      opengraph: {
        title: 'Testtitle',
        image: undefined,
        'image:type': undefined
      }
    },
    {
      opengraph: {
        title: 'Testtitle',
        image: '',
        'image:type': ''
      }
    })
  })

  it('opengraph full', () => {
    testMetadata(`---
    opengraph:
      title: Testtitle
      image: TestyMcTestImage
      image:type: mock
    ___
    `,
    {
      opengraph: {
        title: 'Testtitle',
        image: 'TestyMcTestImage',
        'image:type': 'mock'
      }
    },
    {
      opengraph: {
        title: 'Testtitle',
        image: 'TestyMcTestImage',
        'image:type': 'mock'
      }
    })
  })
})
