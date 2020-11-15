import MarkdownIt from 'markdown-it'
import { TocAst } from '../../../external-types/markdown-it-toc-done-right/interface'
import { RawYAMLMetadata } from '../../editor/yaml-metadata/yaml-metadata'
import { asciinema } from '../markdown-it-plugins/asciinema'
import { documentToc } from '../markdown-it-plugins/document-toc'
import { frontmatterExtract } from '../markdown-it-plugins/frontmatter'
import { gist } from '../markdown-it-plugins/gist'
import { headlineAnchors } from '../markdown-it-plugins/headline-anchors'
import { highlightedCode } from '../markdown-it-plugins/highlighted-code'
import { katex } from '../markdown-it-plugins/katex'
import { pdf } from '../markdown-it-plugins/pdf'
import { plantumlWithError } from '../markdown-it-plugins/plantuml'
import { quoteExtra } from '../markdown-it-plugins/quote-extra'
import { tasksLists } from '../markdown-it-plugins/tasks-lists'
import { vimeo } from '../markdown-it-plugins/vimeo'
import { youtube } from '../markdown-it-plugins/youtube'
import { legacySlideshareShortCode } from '../regex-plugins/replace-legacy-slideshare-short-code'
import { legacySpeakerdeckShortCode } from '../regex-plugins/replace-legacy-speakerdeck-short-code'
import { LineMarkers, lineNumberMarker } from '../replace-components/linemarker/line-number-marker'
import { BasicMarkdownItConfigurator } from './BasicMarkdownItConfigurator'

export class FullMarkdownItConfigurator extends BasicMarkdownItConfigurator {
  constructor (
    private useFrontmatter: boolean,
    private onYamlError: (error: boolean) => void,
    private onRawMeta: (rawMeta: RawYAMLMetadata) => void,
    private onToc: (toc: TocAst) => void,
    private onLineMarkers: (lineMarkers: LineMarkers[]) => void,
    private plantumlServer: string | null,
    onDebugOutput: (output: string) => void
  ) {
    super(onDebugOutput)
  }

  protected configure (markdownIt: MarkdownIt): void {
    super.configure(markdownIt)

    this.configurations.push(
      plantumlWithError(this.plantumlServer),
      tasksLists,
      (markdownIt) => {
        frontmatterExtract(markdownIt,
          !this.useFrontmatter
            ? undefined
            : {
                onYamlError: (error: boolean) => this.onYamlError(error),
                onRawMeta: (rawMeta: RawYAMLMetadata) => this.onRawMeta(rawMeta)
              })
      },
      headlineAnchors,
      katex,
      youtube,
      vimeo,
      gist,
      legacySlideshareShortCode,
      legacySpeakerdeckShortCode,
      pdf,
      asciinema,
      highlightedCode,
      quoteExtra,
      (markdownIt) => documentToc(markdownIt, this.onToc),
      (markdownIt) => lineNumberMarker(markdownIt, (lineMarkers) => this.onLineMarkers(lineMarkers))
    )
  }
}
