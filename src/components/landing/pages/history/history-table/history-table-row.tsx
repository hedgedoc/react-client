import React from "react";
import {HistoryEntry} from "../history";
import {PinButton} from "../common/pin-button";
import {CloseButton} from "../common/close-button";
import moment from "moment";
import {useTranslation} from "react-i18next";

interface HistoryTableProp {
    entry: HistoryEntry
}

export const HistoryTableRow: React.FC<HistoryTableProp> = ({entry}) => {
    useTranslation()
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
