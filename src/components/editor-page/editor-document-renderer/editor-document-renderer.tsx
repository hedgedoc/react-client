/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment } from 'react'
import type { RenderIframeProps } from '../renderer-pane/render-iframe'
import { RenderIframe } from '../renderer-pane/render-iframe'
import { useTrimmedNoteMarkdownContentWithoutFrontmatter } from '../../../hooks/common/use-trimmed-note-markdown-content-without-frontmatter'
import { useScrollStateWithoutLineOffset } from './hooks/use-scroll-state-without-line-offset'
import { useOnScrollWithLineOffset } from './hooks/use-on-scroll-with-line-offset'
import { useOnTaskCheckedChangeWithLineOffset } from './hooks/use-on-task-checked-change-with-line-offset'
import { updateNoteTitleByFirstHeading } from '../../../redux/note-details/methods'
import { InvalidYamlAlert } from '../../markdown-renderer/invalid-yaml-alert'
import { YamlArrayDeprecationAlert } from '../renderer-pane/yaml-array-deprecation-alert'

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

  return (
    <Fragment>
      <InvalidYamlAlert show={true} />
      <YamlArrayDeprecationAlert show={true} />
      <div>

      </div>
      <RenderIframe
        {...props}
        frameClasses={'h-100 w-100'}
        onFirstHeadingChange={updateNoteTitleByFirstHeading}
        onTaskCheckedChange={adjustedOnTaskCheckedChange}
        scrollState={adjustedScrollState}
        onScroll={adjustedOnScroll}
        markdownContentLines={trimmedContentLines}
      />
    </Fragment>
  )
}
