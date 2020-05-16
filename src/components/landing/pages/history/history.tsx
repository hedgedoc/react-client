import React, {Fragment, useEffect, useState} from 'react'
import {Alert, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import moment from "moment";
import {Trans} from 'react-i18next';
import {HistoryContent} from './history-content/history-content';

interface HistoryChange {
    onPinChange: () => void,
}

export enum ViewStateEnum {
    card,
    table
}

export interface HistoryEntry {
    id: string,
    title: string,
    lastVisited: Date,
    tags: string[],
    pinned: boolean
}

interface OldHistoryEntry {
    id: string;
    text: string;
    time: number;
    tags: string[];
    pinned: boolean;
}

function loadHistoryFromLocalStore() {
    const historyJsonString = window.localStorage.getItem("history");
    if (historyJsonString === null) {
        // if localStorage["history"] is empty we check the old localStorage["notehistory"]
        // and convert it to the new format
        const oldHistoryJsonString = window.localStorage.getItem("notehistory")
        const oldHistory = oldHistoryJsonString ? JSON.parse(JSON.parse(oldHistoryJsonString)) : [];
        return oldHistory.map((entry: OldHistoryEntry) => {
            return {
                id: entry.id,
                title: entry.text,
                lastVisited: moment(entry.time).toDate(),
                tags: entry.tags,
                pinned: entry.pinned,
            }
        })
    } else {
        return JSON.parse(historyJsonString)
    }
}

const History: React.FC = () => {
    const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([])
    const [viewState, setViewState] = useState<ViewStateEnum>(ViewStateEnum.card)

    useEffect(() => {
        const history = loadHistoryFromLocalStore();
        setHistoryEntries(history);
    }, [])

    return (
        <Fragment>
            <h1>History</h1>
            <ToggleButtonGroup type="radio" name="options" defaultValue={ViewStateEnum.card} className="mb-2"
                               onChange={(newState: ViewStateEnum) => setViewState(newState)}>
                <ToggleButton value={ViewStateEnum.card}>Card</ToggleButton>
                <ToggleButton value={ViewStateEnum.table}>Table</ToggleButton>
            </ToggleButtonGroup>
            <div className="d-flex flex-wrap justify-content-center">
                {
                    historyEntries.length === 0 ?
                        <Alert variant={"secondary"}>
                            <Trans i18nKey={"nohistory"}/>
                        </Alert>
                        :
                        <HistoryContent viewState={viewState} entries={historyEntries}/>
                }
            </div>
        </Fragment>
    )
}

export {History}
