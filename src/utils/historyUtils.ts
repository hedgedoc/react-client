import {HistoryEntry} from "../components/landing/pages/history/history";
import moment from "moment";
import {HistoryToolbarState} from "../components/landing/pages/history/history-toolbar/history-toolbar";
import {SortModeEnum} from "../components/sort-button/sort-button";

export function sortAndFilterEntries(entries: HistoryEntry[], viewState: HistoryToolbarState): HistoryEntry[] {
    return sortEntries(entries, viewState);
}

function sortEntries(entries: HistoryEntry[], viewState: HistoryToolbarState): HistoryEntry[] {
    return entries.sort((a, b) => {
        if (a.pinned && !b.pinned) {
            return -1;
        }
        if (!a.pinned && b.pinned) {
            return 1;
        }

        if (viewState.titleSortDirection !== SortModeEnum.no) {
            return a.title.localeCompare(b.title) * viewState.titleSortDirection;
        }

        if (viewState.lastVisitedSortDirection !== SortModeEnum.no) {
            if (a.lastVisited > b.lastVisited) {
                return 1 * viewState.lastVisitedSortDirection;
            }
            if (a.lastVisited < b.lastVisited) {
                return -1 * viewState.lastVisitedSortDirection;
            }
        }

        return 0;
    })
}

export function formatHistoryDate(date: Date) {
    return moment(date).format("llll")
}

export interface OldHistoryEntry {
    id: string;
    text: string;
    time: number;
    tags: string[];
    pinned: boolean;
}

export function loadHistoryFromLocalStore(): HistoryEntry[] {
    const historyJsonString = window.localStorage.getItem("history");
    if (!historyJsonString) {
        // if localStorage["history"] is empty we check the old localStorage["notehistory"]
        // and convert it to the new format
        const oldHistoryJsonString = window.localStorage.getItem("notehistory")
        const oldHistory = !!oldHistoryJsonString ? JSON.parse(JSON.parse(oldHistoryJsonString)) : [];
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