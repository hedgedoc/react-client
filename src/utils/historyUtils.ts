import {HistoryEntry} from "../components/landing/pages/history/history";
import moment from "moment";

export function sortEntries(entries: HistoryEntry[]): HistoryEntry[] {
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

export function formatHistoryDate(date: Date) {
    return moment(date).format("llll")
}