import React, { useEffect } from 'react'
// eslint-disable-next-line
import createWorker from 'workerize-loader!./my.worker'
import * as SampleWorker from './my.worker'

export const WorkerTest: React.FC = () => {
  useEffect(() => {
    const sampleWorker = createWorker<typeof SampleWorker>()
    sampleWorker.expensive(1000)
      .then(result => console.log(result))
      .catch(err => console.error(err))
  }, [])

  return null
}
