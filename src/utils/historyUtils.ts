import moment from 'moment'
import { HistoryEntry, LocatedHistoryEntry, Location } from '../components/landing/pages/history/history'
import { HistoryToolbarState } from '../components/landing/pages/history/history-toolbar/history-toolbar'
import { SortModeEnum } from '../components/sort-button/sort-button'

export function sortAndFilterEntries (localEntries: HistoryEntry[], remoteEntries: HistoryEntry[], toolbarState: HistoryToolbarState): LocatedHistoryEntry[] {
  const locatedLocalEntries = locateEntries(localEntries, Location.LOCAL)
  const locatedRemoteEntries = locateEntries(remoteEntries, Location.REMOTE)
  return sortEntries(filterByKeywordSearch(filterBySelectedTags(mergeEntryArrays(locatedLocalEntries, locatedRemoteEntries), toolbarState.selectedTags), toolbarState.keywordSearch), toolbarState)
}

function locateEntries (entries: HistoryEntry[], location: Location): LocatedHistoryEntry[] {
  return entries.map(entry => {
    return {
      ...entry,
      location: location
    }
  })
}

function mergeEntryArrays (locatedLocalEntries: LocatedHistoryEntry[], locatedRemoteEntries: LocatedHistoryEntry[]): LocatedHistoryEntry[] {
  const duplicates: LocatedHistoryEntry[] = []
  for (const remoteEntry of locatedRemoteEntries) {
    for (const localEntry of locatedLocalEntries) {
      if (localEntry.id === remoteEntry.id) {
        duplicates.push(localEntry)
      }
    }
  }
  let filteredLocalEntries = locatedLocalEntries
  for (const duplicate of duplicates) {
    filteredLocalEntries = filteredLocalEntries.filter(entry => entry.id !== duplicate.id)
  }
  return filteredLocalEntries.concat(locatedRemoteEntries)
}

function filterBySelectedTags (entries: LocatedHistoryEntry[], selectedTags: string[]): LocatedHistoryEntry[] {
  return entries.filter(entry => {
    return (selectedTags.length === 0 || arrayCommonCheck(entry.tags, selectedTags))
  }
  )
}

function arrayCommonCheck<T> (array1: T[], array2: T[]): boolean {
  const foundElement = array1.find((element1) =>
    array2.find((element2) =>
      element2 === element1
    )
  )
  return !!foundElement
}

function filterByKeywordSearch (entries: LocatedHistoryEntry[], keywords: string): LocatedHistoryEntry[] {
  const searchTerm = keywords.toLowerCase()
  return entries.filter(entry => entry.title.toLowerCase().indexOf(searchTerm) !== -1)
}

function sortEntries (entries: LocatedHistoryEntry[], viewState: HistoryToolbarState): LocatedHistoryEntry[] {
  return entries.sort((firstEntry, secondEntry) => {
    if (firstEntry.pinned && !secondEntry.pinned) {
      return -1
    }
    if (!firstEntry.pinned && secondEntry.pinned) {
      return 1
    }

    if (viewState.titleSortDirection !== SortModeEnum.no) {
      return firstEntry.title.localeCompare(secondEntry.title) * viewState.titleSortDirection
    }

    if (viewState.lastVisitedSortDirection !== SortModeEnum.no) {
      if (firstEntry.lastVisited > secondEntry.lastVisited) {
        return 1 * viewState.lastVisitedSortDirection
      }
      if (firstEntry.lastVisited < secondEntry.lastVisited) {
        return -1 * viewState.lastVisitedSortDirection
      }
    }

    return 0
  })
}

export function formatHistoryDate (date: Date): string {
  return moment(date).format('llll')
}

export interface OldHistoryEntry {
  id: string;
  text: string;
  time: number;
  tags: string[];
  pinned: boolean;
}

export function convertOldHistory (oldHistory: OldHistoryEntry[]): HistoryEntry[] {
  return oldHistory.map((entry: OldHistoryEntry) => {
    return {
      id: entry.id,
      title: entry.text,
      lastVisited: moment(entry.time).toDate(),
      tags: entry.tags,
      pinned: entry.pinned
    }
  })
}

export function loadHistoryFromLocalStore (): HistoryEntry[] {
  const historyJsonString = window.localStorage.getItem('history')

  if (!historyJsonString) {
    // if localStorage["history"] is empty we check the old localStorage["notehistory"]
    // and convert it to the new format
    const oldHistoryJsonString = window.localStorage.getItem('notehistory')
    const oldHistory = oldHistoryJsonString ? JSON.parse(JSON.parse(oldHistoryJsonString)) as OldHistoryEntry[] : []
    return convertOldHistory(oldHistory)
  } else {
    return JSON.parse(historyJsonString) as HistoryEntry[]
  }
}

export function setHistoryToLocalStore (entries: HistoryEntry[]): void {
  window.localStorage.setItem('history', JSON.stringify(entries))
}
