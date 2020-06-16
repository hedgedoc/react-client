import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

export const youtubePlugin: RegexOptions = {
  name: 'youtube',
  regex: /^(?:(?:http(?:s)?:\/\/)?(?:www.)?(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11}))$/gi,
  replace: (match) => {
    const thumbnailSrc = `//img.youtube.com/vi/${match}/hqdefault.jpg`
    return `<img src="${thumbnailSrc}" alt="youtube video"/>`
  }
}

/*
MarkdownIt.P = new Plugin(
  // regexp to match
  /{%youtube\s*([\d\D]*?)\s*%}/,

  (match, utils) => {
    const videoid = match[1]
    if (!videoid) return
    const div = $('<div class="youtube raw"></div>')
    div.attr('data-videoid', videoid)
    const thumbnailSrc = `//img.youtube.com/vi/${videoid}/hqdefault.jpg`markdown-it-regex
    const image = `<img src="${thumbnailSrc}" />`
    div.append(image)
    const icon = '<i class="icon fa fa-youtube-play fa-5x"></i>'
    div.append(icon)
    return div[0].outerHTML
  }
)
*/
