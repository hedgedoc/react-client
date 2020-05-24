import React, {Fragment, useState} from 'react'
import {HistoryEntriesProps} from "../history-content/history-content";
import {HistoryCard} from "./history-card";
import {PagerPagination} from "../../../../pagination/pager-pagination";
import {PagerPage} from '../../../../pagination/pager-page';
import {Row} from 'react-bootstrap';

export const HistoryCardList: React.FC<HistoryEntriesProps> = ({entries, onPinClick}) => {

    const [pageIndex, setPageIndex] = useState(0);
    const [lastPageIndex, setLastPageIndex] = useState(0);

    return (
        <Fragment>
            <Row className="justify-content-center">
                <PagerPage numberOfElementsPerPage={6} pageIndex={pageIndex} onLastPageIndexChange={setLastPageIndex}>
                    {
                        entries.map((entry) => (
                            <HistoryCard
                                key={entry.id}
                                entry={entry}
                                onPinClick={onPinClick}
                            />))
                    }
                </PagerPage>
            </Row>
            <Row className="justify-content-center">
                <PagerPagination numberOfPageButtonsToShowAfterAndBeforeCurrent={2} lastPageIndex={lastPageIndex}
                                 onPageChange={setPageIndex}/>
            </Row>
        </Fragment>
    );
}
