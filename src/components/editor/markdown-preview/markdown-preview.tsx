import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import taskList from 'markdown-it-task-lists'
import React, { ReactElement, useMemo } from 'react'
import ReactHtmlParser from 'react-html-parser'
import './markdown-preview.scss'

export interface MarkdownPreviewProps {
  content: string
}

function escapeHtml (unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function highlightRender (code: string, lang: string): string {
  if (!lang || new RegExp('no(-?)highlight|plain|text').test(lang)) { return '' }
  code = escapeHtml(code)
  if (lang === 'sequence') {
    return `<div class="sequence-diagram raw">${code}</div>`
  } else if (lang === 'flow') {
    return `<div class="flow-chart raw">${code}</div>`
  } else if (lang === 'graphviz') {
    return `<div class="graphviz raw">${code}</div>`
  } else if (lang === 'mermaid') {
    return `<div class="mermaid raw">${code}</div>`
  } else if (lang === 'abc') {
    return `<div class="abc raw">${code}</div>`
  }
  console.log(code, lang)
  const result = {
    value: code
  }
  const showlinenumbers = new RegExp('=$|=\\d+$|=\\+$').test(lang)
  if (showlinenumbers) {
    let startnumber = 1
    const matches = (new RegExp('=(d+)$')).exec(lang)
    if (matches) { startnumber = parseInt(matches[1]) }
    const lines = result.value.split('\n')
    const linenumbers:string[] = []
    for (let i = 0; i < lines.length - 1; i++) {
      linenumbers[i] = `<span data-linenumber='${startnumber + i}'></span>`
    }
    const continuelinenumber = /=\+$/.test(lang)
    const linegutter = `<div class='gutter linenumber${continuelinenumber ? ' continue' : ''}'>${linenumbers.join('\n')}</div>`
    result.value = `<div class='wrapper'>${linegutter}<div class='code'>${result.value}</div></div>`
  }
  return result.value
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const markdownIt = useMemo(() => {
    const md = new MarkdownIt('default', {
      html: true,
      breaks: true,
      langPrefix: '',
      linkify: true,
      typographer: true,
      highlight: highlightRender
    })
    md.use(taskList)
    md.use(emoji)
    return md
  }, [])
  const result: ReactElement[] = useMemo(() => {
    const html: string = markdownIt.render(content)
    const ret: ReactElement[] = ReactHtmlParser(html)
    return ret
  }, [content, markdownIt])

  return (
    <div className={'bg-light container-fluid flex-fill h-100 overflow-y-scroll'}>
      <div className={'markdown-body container-fluid'}>{result}</div>
    </div>
  )
}

export { MarkdownPreview }
