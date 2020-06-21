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
    this.title = yamlData.title ?? ''
    this.description = yamlData.description ?? ''
    this.tags = yamlData.tags.split(',') ?? []
    this.robots = yamlData.robots ?? ''
    this.lang = yamlData.lang ?? 'en'
    this.dir = yamlData.dir ?? 'ltr'
    this.breaks = yamlData.breaks ?? true
    this.GA = yamlData.GA ?? ''
    this.disqus = yamlData.disqus ?? ''
    this.type = yamlData.type ?? ''
    this.slideOptions = yamlData.slideOptions ? {
      transition: getTransition(yamlData.slideOptions.transition),
      theme: getTheme(yamlData.slideOptions.theme)
    } : undefined
    this.opengraph = yamlData.opengraph ? {
      title: yamlData.opengraph.title ?? '',
      image: yamlData.opengraph.image ?? '',
      'image:type': yamlData.opengraph['image:type'] ?? ''
    } : undefined
  }
}

export interface RawYAMLMetadata {
  title: string,
  description: string
  tags: string
  robots: string
  lang: string
  dir: string
  breaks: boolean
  GA: string
  disqus: string
  type: string
  slideOptions: {
    transition: string
    theme: string
  }
  opengraph: {
    title: string
    image: string
    'image:type': string
  }
}

export interface SlideOptions {
  transition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'
  theme: 'black' | 'white' | 'league' | 'beige' | 'sky' | 'night' | 'serif' | 'simple' | 'solarized' | 'blood' | 'moon'
}

const getTransition = (string: string): SlideOptions['transition'] => {
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
    default:
      return 'none'
  }
}

const getTheme = (string: string): SlideOptions['theme'] => {
  switch (string) {
    case 'black':
      return 'black'
    case 'white':
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
  title: string
  image: string
  'image:type': string
}
