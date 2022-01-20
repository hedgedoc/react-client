/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import type { RenderIframeProps } from '../renderer-pane/render-iframe'
import { RenderIframe } from '../renderer-pane/render-iframe'
import { useTrimmedNoteMarkdownContentWithoutFrontmatter } from '../../../hooks/common/use-trimmed-note-markdown-content-without-frontmatter'
import { useScrollStateWithoutLineOffset } from './hooks/use-scroll-state-without-line-offset'
import { useOnScrollWithLineOffset } from './hooks/use-on-scroll-with-line-offset'
import { useOnTaskCheckedChangeWithLineOffset } from './hooks/use-on-task-checked-change-with-line-offset'
import { updateNoteTitleByFirstHeading } from '../../../redux/note-details/methods'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { useTranslation } from 'react-i18next'
import { TableOfContentsHoveringButton } from '../../render-page/markdown-toc-button/table-of-contents-hovering-button'

export type EditorDocumentRendererProps = Omit<RenderIframeProps, 'markdownContentLines'>

/**
 * Renders the markdown content from the global application state with the iframe renderer.
 *
 * @param props Every property from the {@link RenderIframe} except the markdown content.
 */
export const EditorDocumentRenderer: React.FC<EditorDocumentRendererProps> = ({ scrollState, onScroll, ...props }) => {
  const trimmedContentLines = useTrimmedNoteMarkdownContentWithoutFrontmatter()

  const adjustedScrollState = useScrollStateWithoutLineOffset(scrollState)
  const adjustedOnScroll = useOnScrollWithLineOffset(onScroll)
  const adjustedOnTaskCheckedChange = useOnTaskCheckedChangeWithLineOffset()

  const { t } = useTranslation()

  /*
   <InvalidYamlAlert show={true} />
   <YamlArrayDeprecationAlert show={true} />


   const [tocAst, setTocAst] = useState<TocAst>()

   const onTocChange = useCallback((ast: TocAst|undefined) => {
   setTocAst(ast)
   },[])
   */
  return (
    <div className={'d-flex flex-column w-100 h-100'}>
      <div className={'d-flex justify-content-between bg-light'} style={{
        borderBottom: "solid 2px #cdcdcd"
      }}>
        <div className={'d-flex'}>
        <Button variant={'warning'} className={'m-1 justify-self-start'} title={t('editor.deprecatedTags')}>
          <ForkAwesomeIcon icon={'tags'} />
        </Button>
        <Button variant={'danger'} className={'m-1'} title={t('editor.invalidYaml')}>
          <ForkAwesomeIcon icon={'exclamation-triangle'} />
        </Button>
        </div>
        <div className={'d-flex'}>
        <TableOfContentsHoveringButton tocAst={{l: 1, c: [], n: 'asd'}} baseUrl={window.location.toString()} />

        <Button variant={'outline-primary'} className={'m-1  justify-self-end'}>
          <ForkAwesomeIcon icon={'expand'} />
        </Button></div>
      </div>
      <RenderIframe
        {...props}
        frameClasses={'flex-fill w-100'}
        onFirstHeadingChange={updateNoteTitleByFirstHeading}
        onTaskCheckedChange={adjustedOnTaskCheckedChange}
        scrollState={adjustedScrollState}
        onScroll={adjustedOnScroll}
        markdownContentLines={trimmedContentLines}
      />
    </div>
  )
}
