import React, {Fragment} from "react";
import {HistoryTableRow} from "../history-table/history-table-row";
import {HistoryEntry, ViewStateEnum} from "../history";
import {HistoryCard} from "../history-card/history-card";
import {HistoryTable} from "../history-table/history-table";

export interface HistoryContentProps {
    viewState: ViewStateEnum
    entries: HistoryEntry[]
    onPinClick: ((id: string) => void)
}

export interface HistoryContentChildrenProps {
    entry: HistoryEntry,
    onPinClick: ((id: string) => void)
}

const sortEntries = (entries: HistoryEntry[]): HistoryEntry[] => {
    return entries.sort((a, b) => {
        if (a.pinned && !b.pinned) {
            return -1;
        }
        if (!a.pinned && b.pinned) {
            return 1;
        }
        if (a.lastVisited < b.lastVisited) {
            return -1;
        }
        if (a.lastVisited > b.lastVisited) {
            return 1;
        }
        return 0;
    })
}

export const HistoryContent: React.FC<HistoryContentProps> = ({viewState, entries, onPinClick}) => {

    switch (viewState) {
        default:
        case ViewStateEnum.card:
            return <Fragment>
                {
                    sortEntries(entries).map((entry) =>
                        <HistoryCard
                            key={entry.id}
                            entry={entry}
                            onPinClick={onPinClick}
                        />
                    )
                }
            </Fragment>
        case ViewStateEnum.table:
            return <HistoryTable>
                {
                    sortEntries(entries).map((entry) =>
                        <HistoryTableRow
                            key={entry.id}
                            entry={entry}
                            onPinClick={onPinClick}
                        />)
                }
            </HistoryTable>;
    }
}