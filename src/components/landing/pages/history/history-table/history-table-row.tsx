import React from "react";
import {PinButton} from "../common/pin-button";
import {CloseButton} from "../common/close-button";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {HistoryContentChildrenProps} from "../history-content/history-content";

export const HistoryTableRow: React.FC<HistoryContentChildrenProps> = ({entry, onPinClick}) => {
    useTranslation()
    return (
        <tr>
            <td>{entry.title}</td>
            <td>{moment(entry.lastVisited).format("llll")}</td>
            <td>
                <PinButton pin={entry.pinned} onPinClick={() => {
                    onPinClick(entry.id)
                }}/>
                &nbsp;
                <CloseButton/>
            </td>
        </tr>
    )
}
