import React, {Fragment} from 'react'
import "../common/button.scss"
import {HistoryEntriesProps} from "../history-content/history-content";
import {sortEntries} from "../../../../../utils/historyUtils";
import {HistoryCard} from "./history-card";

export const HistoryCardList: React.FC<HistoryEntriesProps> = ({entries, onPinClick}) => {
    return (
        <Fragment>
            {
                sortEntries(entries).map((entry) => (
                    <HistoryCard
                        key={entry.id}
                        entry={entry}
                        onPinClick={onPinClick}
                    />))
            }
        </Fragment>
    )
}
