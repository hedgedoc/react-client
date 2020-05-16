import React, {Fragment} from "react";
import {HistoryTableRow} from "../history-table/history-table-row";
import {HistoryEntry, ViewStateEnum} from "../history";
import {HistoryCard} from "../history-card/history-card";
import {HistoryTable} from "../history-table/history-table";

interface HistoryContentProps {
    viewState: ViewStateEnum
    entries: HistoryEntry[]
}

export const HistoryContent: React.FC<HistoryContentProps> = ({viewState, entries}) => {

    switch (viewState) {
        default:
        case ViewStateEnum.card:
            return <Fragment>
                {
                    entries.map((entry) =>
                        <HistoryCard
                            entry={entry}
                        />
                    )
                }
            </Fragment>
        case ViewStateEnum.table:
            return <HistoryTable>
                {
                    entries.map((entry) =>
                        <HistoryTableRow
                            entry={entry}
                        />)
                }
            </HistoryTable>;
    }
}