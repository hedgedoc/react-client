import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

export const youtubePlugin: RegexOptions = {
  name: 'youtube',
  regex: /^(?:(?:http(?:s)?:\/\/)?(?:www.)?(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11}))$/,
  replace: (match) => {
    const thumbnailSrc = `//img.youtube.com/vi/${match}/hqdefault.jpg`
    return `<div class="youtube"><img class="youtube" src="${thumbnailSrc}" alt="youtube video"/><i class="youtube icon fa fa-youtube-play fa-5x"/></div>`
  }
}

/*
click to replace img with <iframe> embedding
function W (t: HTMLDivElement, n: string) {
  if (e(t).attr('data-videoid')) {
    const r = e("<iframe frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
    e(r).attr('src', n + e(t).attr('data-videoid') + '?autoplay=1'), e(t).find('img').css('visibility', 'hidden'), e(t).append(r)
  }
}

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
