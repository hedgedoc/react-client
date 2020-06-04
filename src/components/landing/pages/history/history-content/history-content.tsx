import React, { Fragment, useState } from 'react'
import { Alert, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { PagerPagination } from '../../../../pagination/pager-pagination'
import { LocatedHistoryEntry, pinClick } from '../history'
import { HistoryCardList } from '../history-card/history-card-list'
import { HistoryTable } from '../history-table/history-table'
import { ViewStateEnum } from '../history-toolbar/history-toolbar'

export interface HistoryContentProps {
  viewState: ViewStateEnum
  entries: LocatedHistoryEntry[]
  onPinClick: pinClick
}

export interface HistoryEntryProps {
  entry: LocatedHistoryEntry,
  onPinClick: pinClick
}

export interface HistoryEntriesProps {
    entries: LocatedHistoryEntry[]
    onPinClick: pinClick
    pageIndex: number
    onLastPageIndexChange: (lastPageIndex: number) => void
}

export const HistoryContent: React.FC<HistoryContentProps> = ({ viewState, entries, onPinClick }) => {
  useTranslation()
  const [pageIndex, setPageIndex] = useState(0)
  const [lastPageIndex, setLastPageIndex] = useState(0)

  if (entries.length === 0) {
    return (
      <Row className={'justify-content-center'}>
        <Alert variant={'secondary'}>
          <Trans i18nKey={'landing.history.noHistory'}/>
        </Alert>
      </Row>
    )
  }

  const mapViewStateToComponent = (viewState: ViewStateEnum) => {
    switch (viewState) {
      default:
      case ViewStateEnum.CARD:
        return <HistoryCardList entries={entries} onPinClick={onPinClick} pageIndex={pageIndex}
          onLastPageIndexChange={setLastPageIndex}/>
      case ViewStateEnum.TABLE:
        return <HistoryTable entries={entries} onPinClick={onPinClick} pageIndex={pageIndex}
          onLastPageIndexChange={setLastPageIndex}/>
    }
  }

  return (
    <Fragment>
      {mapViewStateToComponent(viewState)}
      <Row className="justify-content-center">
        <PagerPagination numberOfPageButtonsToShowAfterAndBeforeCurrent={2} lastPageIndex={lastPageIndex}
          onPageChange={setPageIndex}/>
      </Row>
    </Fragment>)
}
