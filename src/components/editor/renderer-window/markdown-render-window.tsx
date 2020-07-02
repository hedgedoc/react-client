import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import useResizeObserver from 'use-resize-observer'
import { TocAst } from '../../../external-types/markdown-it-toc-done-right/interface'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../common/show-if/show-if'
import { LineMarkerPosition, MarkdownRenderer } from '../markdown-renderer/markdown-renderer'
import { MarkdownToc } from '../markdown-toc/markdown-toc'
import { YAMLMetaData } from '../yaml-metadata/yaml-metadata'
import { ScrollProps, ScrollState } from '../scroll/scroll-props'
import { findLineMarks } from '../scroll/utils'

interface RenderWindowProps {
  content: string
  onMetadataChange: (metaData: YAMLMetaData | undefined) => void
  onFirstHeadingChange: (firstHeading: string | undefined) => void
  wide?: boolean
}

export const MarkdownRenderWindow: React.FC<RenderWindowProps & ScrollProps> = ({ content, onMetadataChange, onFirstHeadingChange, wide, scrollState, onScroll }) => {
  const [tocAst, setTocAst] = useState<TocAst>()
  const renderer = useRef<HTMLDivElement>(null)
  const { width } = useResizeObserver({ ref: renderer })
  const lastScrollPosition = useRef<number>()
  const lastScrollState = useRef<ScrollState>()
  const [lineMarks, setLineMarks] = useState<LineMarkerPosition[]>()
  const ignoreScroll = useRef<boolean>()

  const realWidth = width || 0

  useEffect(() => {
    if (!renderer.current || !lineMarks || !scrollState) {
      return
    }
    const { lastMarkBefore, firstMarkAfter } = findLineMarks(lineMarks, scrollState.firstLineInView)
    const positionBefore = lastMarkBefore ? lastMarkBefore.position : 0
    const positionAfter = firstMarkAfter ? firstMarkAfter.position : renderer.current.offsetHeight
    const lastMarkBeforeLine = lastMarkBefore ? lastMarkBefore.line : 1
    const firstMarkAfterLine = firstMarkAfter ? firstMarkAfter.line : content.split('\n').length
    const lineCount = firstMarkAfterLine - lastMarkBeforeLine
    const blockHeight = positionAfter - positionBefore
    const lineHeight = blockHeight / lineCount
    const position = positionBefore + (scrollState.firstLineInView - lastMarkBeforeLine) * lineHeight + scrollState.scrolledPercentage * lineHeight
    const correctedPosition = Math.floor(position)
    if (correctedPosition !== lastScrollPosition.current) {
      lastScrollPosition.current = correctedPosition
      ignoreScroll.current = true
      renderer.current.scrollTo({
        top: correctedPosition
      })
    }
  }, [content, lineMarks, scrollState])

  const userScroll = useCallback(() => {
    if (ignoreScroll.current === true) {
      ignoreScroll.current = false
      return
    }

    if (!renderer.current || !lineMarks || !onScroll) {
      return
    }
    const resyncedScroll = Math.ceil(renderer.current.scrollTop) === lastScrollPosition.current
    if (resyncedScroll) {
      return
    }

    const scrollTop = renderer.current.scrollTop

    const beforeLineMark = lineMarks
      .filter(lineMark => lineMark.position <= scrollTop)
      .reduce((prevLineMark, currentLineMark) =>
        prevLineMark.line >= currentLineMark.line ? prevLineMark : currentLineMark)

    const afterLineMark = lineMarks
      .filter(lineMark => lineMark.position > scrollTop)
      .reduce((prevLineMark, currentLineMark) =>
        prevLineMark.line < currentLineMark.line ? prevLineMark : currentLineMark)

    const blockHeight = afterLineMark.position - beforeLineMark.position
    const distanceToBefore = scrollTop - beforeLineMark.position
    const percentage = (distanceToBefore / blockHeight)
    const newScrollState: ScrollState = { firstLineInView: beforeLineMark.line, scrolledPercentage: percentage }
    if (!lastScrollState.current || lastScrollState.current.firstLineInView !== newScrollState.firstLineInView || lastScrollState.current.scrolledPercentage !== newScrollState.scrolledPercentage) {
      lastScrollState.current = newScrollState
      onScroll(newScrollState)
    }
  }, [lineMarks, onScroll])

  return (
    <div className={'bg-light flex-fill pb-5 flex-row d-flex w-100 h-100 overflow-y-scroll'} ref={renderer}
      onScroll={userScroll }>
      <div className={'col-md'}/>
      <MarkdownRenderer
        className={'flex-fill'}
        content={content}
        wide={wide}
        onTocChange={(tocAst) => setTocAst(tocAst)}
        onMetaDataChange={onMetadataChange}
        onFirstHeadingChange={onFirstHeadingChange}
        onLineMarkerPositionChanged={setLineMarks}
      />

      <div className={'col-md'}>
        <ShowIf condition={realWidth >= 1280 && !!tocAst}>
          <MarkdownToc ast={tocAst as TocAst} className={'position-fixed'}/>
        </ShowIf>
        <ShowIf condition={realWidth < 1280 && !!tocAst}>
          <div className={'markdown-toc-sidebar-button'}>
            <Dropdown drop={'up'}>
              <Dropdown.Toggle id="toc-overlay-button" variant={'secondary'} className={'no-arrow'}>
                <ForkAwesomeIcon icon={'bars'}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className={'p-2'}>
                  <MarkdownToc ast={tocAst as TocAst}/>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ShowIf>
      </div>
    </div>
  )
}
