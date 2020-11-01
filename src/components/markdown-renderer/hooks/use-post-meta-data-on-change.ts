import equal from 'fast-deep-equal'
import { useEffect, useRef } from 'react'
import { RawYAMLMetadata, YAMLMetaData } from '../../editor/yaml-metadata/yaml-metadata'

export const usePostMetaDataOnChange = (
  rawMetaRef: RawYAMLMetadata|undefined,
  firstHeadingRef: string|undefined,
  onMetaDataChange?: (yamlMetaData: YAMLMetaData | undefined) => void,
  onFirstHeadingChange?: (firstHeading: string | undefined) => void
): void => {
  const oldMetaRef = useRef<RawYAMLMetadata>()
  const oldFirstHeadingRef = useRef<string>()
  console.log('usePostMetaDataOnChange')
  useEffect(() => {
    if (onMetaDataChange && !equal(oldMetaRef.current, rawMetaRef)) {
      console.log('old != new')
      if (rawMetaRef) {
        const newMetaData = new YAMLMetaData(rawMetaRef)
        console.log('newMetaData', newMetaData)
        onMetaDataChange(newMetaData)
      } else {
        console.log('rawMetaData undefined')
        onMetaDataChange(undefined)
      }
      oldMetaRef.current = rawMetaRef
    }
    if (onFirstHeadingChange && !equal(firstHeadingRef, oldFirstHeadingRef.current)) {
      onFirstHeadingChange(firstHeadingRef || undefined)
      oldFirstHeadingRef.current = firstHeadingRef
    }
  })
}
