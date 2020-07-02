export interface ScrollProps {
  scrollState?: ScrollState
  onScroll?: (scrollState: ScrollState) => void
}

export interface ScrollState {
  firstLineInView: number
  scrolledPercentage: number
}
