import React from "react";
import {HistoryEntry} from "../history";
import {PinButton} from "../common/pin-button";
import {CloseButton} from "../common/close-button";
import moment from "moment";

interface HistoryTableProp {
    entry: HistoryEntry
}

export const HistoryTableRow: React.FC<HistoryTableProp> = ({entry}) => {
    return (
        <tr>
            <td>{entry.title}</td>
            <td>{moment(entry.lastVisited).format("llll")}</td>
            <td>
                <PinButton pin={entry.pinned} onPinChange={() => {
                }}/>
                &nbsp;
                <CloseButton/>
            </td>
        </tr>
    )
}
