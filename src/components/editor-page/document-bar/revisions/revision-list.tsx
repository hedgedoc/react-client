/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo } from 'react'
import { RevisionListEntry } from './revision-list-entry'
import { useAsync } from 'react-use'
import { getAllRevisions } from '../../../../api/revisions'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { ListGroup } from 'react-bootstrap'
import { AsyncLoadingBoundary } from '../../../common/async-loading-boundary'
import { DateTime } from 'luxon'
import { Optional } from '@mrdrogdrog/optional'

export interface RevisionListProps {
  selectedRevisionId?: number
  onRevisionSelect: (selectedRevisionId: number) => void
}

/**
 * The list of selectable revisions of the current note.
 *
 * @param selectedRevisionId The currently selected revision
 * @param onRevisionSelect Callback that is executed when a list entry is selected
 */
export const RevisionList: React.FC<RevisionListProps> = ({ selectedRevisionId, onRevisionSelect }) => {
  const noteIdentifier = useApplicationState((state) => state.noteDetails.primaryAddress)

  const {
    value: revisions,
    error,
    loading
  } = useAsync(async () => {
    const revisions = await getAllRevisions(noteIdentifier)
    revisions.sort(
      (revisionA, revisionB) =>
        DateTime.fromISO(revisionB.createdAt).toMillis() - DateTime.fromISO(revisionA.createdAt).toMillis()
    )
    return revisions
  }, [noteIdentifier])

  useEffect(() => {
    Optional.ofNullable(revisions)
      .map((revisions) => revisions[0]?.id)
      .ifPresent(onRevisionSelect)
  }, [onRevisionSelect, revisions])

  const revisionList = useMemo(() => {
    if (loading || !revisions) {
      return null
    }
    return revisions.map((revisionListEntry) => (
      <RevisionListEntry
        active={selectedRevisionId === revisionListEntry.id}
        onSelect={() => onRevisionSelect(revisionListEntry.id)}
        revision={revisionListEntry}
        key={revisionListEntry.id}
      />
    ))
  }, [loading, onRevisionSelect, revisions, selectedRevisionId])

  return (
    <AsyncLoadingBoundary loading={loading} error={error} componentName={'revision list'}>
      <ListGroup>{revisionList}</ListGroup>
    </AsyncLoadingBoundary>
  )
}
