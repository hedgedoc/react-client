import React, {Fragment, useEffect, useState} from 'react'
import {HistoryContent} from './history-content/history-content';
import {HistoryToolbar, HistoryToolbarState, initState as toolbarInitState} from './history-toolbar/history-toolbar';
import {loadHistoryFromLocalStore, sortAndFilterEntries} from "../../../../utils/historyUtils";
import {Row} from 'react-bootstrap';

export interface HistoryEntry {
    id: string,
    title: string,
    lastVisited: Date,
    tags: string[],
    pinned: boolean
}

export type pinClick = (entryId: string) => void;

export const History: React.FC = () => {
    const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([])
    const [viewState, setViewState] = useState<HistoryToolbarState>(toolbarInitState)

    useEffect(() => {
        const history = loadHistoryFromLocalStore();
        setHistoryEntries(history);
    }, [])

    useEffect(() => {
        window.localStorage.setItem("history", JSON.stringify(historyEntries));
    }, [historyEntries])

    const pinClick: pinClick = (entryId: string) => {
        setHistoryEntries((entries) => {
            return entries.map((entry) => {
                if (entry.id === entryId) {
                    entry.pinned = !entry.pinned;
                }
                return entry;
            });
        })
    }

    return (
        <Fragment>
            <h1>History</h1>
            <Row className={"justify-content-center mb-3"}>
                <HistoryToolbar onSettingsChange={setViewState}/>
            </Row>
            <div className="d-flex flex-wrap justify-content-center">
                <HistoryContent viewState={viewState.viewState}
                                entries={sortAndFilterEntries(historyEntries, viewState)}
                                onPinClick={pinClick}/>
            </div>
        </Fragment>
    )
}