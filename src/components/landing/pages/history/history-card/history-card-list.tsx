import React, {Fragment, useState} from 'react'
import {HistoryEntriesProps} from "../history-content/history-content";
import {HistoryCard} from "./history-card";
import {PagerPagination} from "../../../../pagination/pager-pagination";
import {PagerPage} from '../../../../pagination/pager-page';

export const HistoryCardList: React.FC<HistoryEntriesProps> = ({entries, onPinClick}) => {

    const [pageIndex, setPageIndex] = useState(0);

    return (
        <Fragment>
            <PagerPage numberOfElementsPerPage={1} pageIndex={pageIndex}>
                {
                    entries.map((entry) => (
                        <HistoryCard
                            key={entry.id}
                            entry={entry}
                            onPinClick={onPinClick}
                        />))
                }
            </PagerPage>
            <PagerPagination numberOfPagesToShow={2} numberOfElementsPerPage={1}
                             onPageChange={setPageIndex}></PagerPagination>
        </Fragment>
    );
}
