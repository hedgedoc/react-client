/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { Fragment } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { useAsync } from 'react-use'
import type { RevisionDetails, RevisionMetadata } from '../../../../api/revisions/types'
import { getRevision } from '../../../../api/revisions'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { ShowIf } from '../../../common/show-if/show-if'
import { WaitSpinner } from '../../../common/wait-spinner/wait-spinner'
import { useNoteMarkdownContent } from '../../../../hooks/common/use-note-markdown-content'
import { useIsDarkModeActivated } from '../../../../hooks/common/use-is-dark-mode-activated'
import type { AsyncState } from 'react-use/lib/useAsyncFn'

export interface RevisionViewerProps {
  selectedRevisionId?: number
  allRevisions?: RevisionMetadata[]
}

/**
 * Renders the diff viewer for a given revision and its previous one.
 * @param selectedRevisionId The id of the currently selected revision.
 * @param allRevisions List of metadata for all available revisions.
 */
export const RevisionViewer: React.FC<RevisionViewerProps> = ({ selectedRevisionId, allRevisions }) => {
  const noteIdentifier = useApplicationState((state) => state.noteDetails.primaryAddress)
  const markdownContent = useNoteMarkdownContent()
  const darkModeEnabled = useIsDarkModeActivated()

  const previousRevisionContent = useAsync(async () => {
    if (!allRevisions || selectedRevisionId === undefined) {
      return Promise.reject()
    }
    const revisionIds = allRevisions.map((revisionMetadata) => revisionMetadata.id)
    const largestId = Math.max(...revisionIds)
    if (selectedRevisionId === largestId) {
      return Promise.resolve(markdownContent)
    }
    const nextSmallerId = revisionIds
      .sort()
      .reverse()
      .find((id) => id < selectedRevisionId)
    if (!nextSmallerId) {
      return Promise.resolve('')
    }
    const revision = await getRevision(noteIdentifier, nextSmallerId)
    return revision.content
  }, [selectedRevisionId, allRevisions])

  const selectedRevision = useAsync(() => {
    if (!allRevisions || selectedRevisionId === undefined) {
      return Promise.reject()
    }
    return getRevision(noteIdentifier, selectedRevisionId)
  }, [selectedRevisionId, noteIdentifier])

  if (selectedRevisionId === undefined || !allRevisions) {
    return null
  }

  return (
    <Fragment>
      <ShowIf condition={selectedRevision.loading || previousRevisionContent.loading}>
        <WaitSpinner />
      </ShowIf>
      <ShowIf
        condition={
          !selectedRevision.loading &&
          !selectedRevision.error &&
          !previousRevisionContent.loading &&
          !previousRevisionContent.error
        }>
        <ReactDiffViewer
          oldValue={previousRevisionContent.value ?? ''}
          newValue={(selectedRevision as AsyncState<RevisionDetails>).value?.content}
          splitView={false}
          compareMethod={DiffMethod.WORDS}
          useDarkTheme={darkModeEnabled}
        />
      </ShowIf>
    </Fragment>
  )
}