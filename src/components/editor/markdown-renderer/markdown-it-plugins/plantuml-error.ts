import MarkdownIt, { Options } from 'markdown-it/lib'
import Renderer, { RenderRule } from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import './plantuml-error.scss'

export const plantumlError: MarkdownIt.PluginSimple = (md) => {
  const defaultRenderer: RenderRule = md.renderer.rules.fence || (() => { return '' })
  md.renderer.rules.fence = (tokens: Token[], idx: number, options: Options, env, slf: Renderer) => {
    const token = tokens[idx]
    const defaultRender = defaultRenderer(tokens, idx, options, env, slf)
    if (token.info === 'plantuml') {
      return `
        <p class="plantuml-error">PlantUML plugin is enabled but not properly configured.</p>
        ${defaultRender}
      `
    }
    return defaultRender
  }
}
