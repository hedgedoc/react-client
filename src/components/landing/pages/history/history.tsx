import React, {Fragment, useEffect, useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import moment from "moment";
import {HistoryContent} from './history-content/history-content';

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

function loadHistoryFromLocalStore(): HistoryEntry[] {
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

export type pinClick = (entryId: string) => void;

const History: React.FC = () => {
    const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([])
    const [viewState, setViewState] = useState<ViewStateEnum>(ViewStateEnum.card)

    useEffect(() => {
        const history = loadHistoryFromLocalStore();
        setHistoryEntries(history);
    }, [])

    const pinClick = (entryId: string) => {
        const modifiedEntries = historyEntries.map((entry) => {
            if (entry.id === entryId) {
                entry.pinned = !entry.pinned;
            }
            return entry;
        });

        setHistoryEntries(modifiedEntries);
        window.localStorage.setItem("history", JSON.stringify(modifiedEntries));
    }

    return (
        <Fragment>
            <h1>History</h1>
            <ToggleButtonGroup type="radio" name="options" defaultValue={ViewStateEnum.card} className="mb-2"
                               onChange={(newState: ViewStateEnum) => setViewState(newState)}>
                <ToggleButton value={ViewStateEnum.card}>Card</ToggleButton>
                <ToggleButton value={ViewStateEnum.table}>Table</ToggleButton>
            </ToggleButtonGroup>
            <div className="d-flex flex-wrap justify-content-center">
                <HistoryContent viewState={viewState} entries={historyEntries} onPinClick={pinClick}/>
            </div>
        </Fragment>
    )
}

export {History}
