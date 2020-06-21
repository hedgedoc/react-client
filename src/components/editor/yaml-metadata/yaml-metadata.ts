export class YAMLMetaData {
  title: string
  description: string
  tags: string[]
  robots: string
  lang: string
  dir: string
  breaks: boolean
  GA: string
  disqus: string
  type: string
  slideOptions: SlideOptions | undefined
  opengraph: OpenGraph | undefined

  constructor (yamlData: RawYAMLMetadata) {
    this.title = ''
    this.description = ''
    this.tags = []
    this.robots = ''
    this.lang = 'en'
    this.dir = 'ltr'
    this.breaks = true
    this.GA = ''
    this.disqus = ''
    this.type = ''
    this.slideOptions = {
      transition: 'none',
      theme: 'white'
    }
    this.opengraph = {
      title: '',
      image: '',
      'image:type': ''
    }
    if (yamlData !== undefined) {
      this.title = yamlData.title ?? ''
      this.description = yamlData.description ?? ''
      this.tags = yamlData.tags?.split(',').map(entry => entry.trim()) ?? []
      this.robots = yamlData.robots ?? ''
      this.lang = yamlData.lang ?? 'en'
      this.dir = yamlData.dir ?? 'ltr'
      this.breaks = yamlData.breaks ?? true
      this.GA = yamlData.GA ?? ''
      this.disqus = yamlData.disqus ?? ''
      this.type = yamlData.type ?? ''
      this.slideOptions = {
        transition: getTransition(yamlData.slideOptions?.transition),
        theme: getTheme(yamlData.slideOptions?.theme)
      }
      this.opengraph = {
        title: yamlData.opengraph?.title ?? '',
        image: yamlData.opengraph?.image ?? '',
        'image:type': yamlData.opengraph ? yamlData.opengraph['image:type'] ?? '' : ''
      }
    }
  }
}

export interface RawYAMLMetadata {
  title: string | undefined
  description: string | undefined
  tags: string | undefined
  robots: string | undefined
  lang: string | undefined
  dir: string | undefined
  breaks: boolean | undefined
  GA: string | undefined
  disqus: string | undefined
  type: string | undefined
  slideOptions: {
    transition: string | undefined
    theme: string | undefined
  } | undefined | null
  opengraph: {
    title: string | undefined
    image: string | undefined
    'image:type': string | undefined
  } | undefined | null
}

export const isEqual = (rawMetaData1: RawYAMLMetadata | null, rawMetaData2: RawYAMLMetadata | null): boolean => {
  return (
    rawMetaData1?.title === rawMetaData2?.title &&
    rawMetaData1?.description === rawMetaData2?.description &&
    rawMetaData1?.tags === rawMetaData2?.tags &&
    rawMetaData1?.robots === rawMetaData2?.robots &&
    rawMetaData1?.lang === rawMetaData2?.lang &&
    rawMetaData1?.dir === rawMetaData2?.dir &&
    rawMetaData1?.breaks === rawMetaData2?.breaks &&
    rawMetaData1?.GA === rawMetaData2?.GA &&
    rawMetaData1?.disqus === rawMetaData2?.disqus &&
    rawMetaData1?.type === rawMetaData2?.type &&
    rawMetaData1?.slideOptions?.transition === rawMetaData2?.slideOptions?.transition &&
    rawMetaData1?.slideOptions?.theme === rawMetaData2?.slideOptions?.theme &&
    rawMetaData1?.opengraph?.title === rawMetaData2?.opengraph?.title &&
    rawMetaData1?.opengraph?.image === rawMetaData2?.opengraph?.image &&
    rawMetaData1?.opengraph?.['image:type'] === rawMetaData2?.opengraph?.['image:type']
  )
}

export interface SlideOptions {
  transition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom' | undefined
  theme: 'black' | 'white' | 'league' | 'beige' | 'sky' | 'night' | 'serif' | 'simple' | 'solarized' | 'blood' | 'moon' | undefined
}

const getTransition = (string: string | undefined): SlideOptions['transition'] => {
  switch (string) {
    case 'fade':
      return 'fade'
    case 'slide':
      return 'slide'
    case 'convex':
      return 'convex'
    case 'concave':
      return 'concave'
    case 'zoom':
      return 'zoom'
    case undefined:
    default:
      return 'none'
  }
}

const getTheme = (string: string | undefined): SlideOptions['theme'] => {
  switch (string) {
    case 'black':
      return 'black'
    case 'white':
    case undefined:
    default:
      return 'white'
    case 'league':
      return 'league'
    case 'beige':
      return 'beige'
    case 'sky':
      return 'sky'
    case 'night':
      return 'night'
    case 'serif':
      return 'serif'
    case 'simple':
      return 'simple'
    case 'solarized':
      return 'solarized'
    case 'blood':
      return 'blood'
    case 'moon':
      return 'moon'
  }
}

export interface OpenGraph {
  title: string | undefined
  image: string | undefined
  'image:type': string | undefined
}
