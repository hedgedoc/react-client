import React, { Fragment, useEffect, useState } from 'react'
import './application-loader.scss'
import { InitTask } from '../../initializers'
import { LoadingScreen } from './loading-screen'

interface ApplicationLoaderProps {
  initTasks: InitTask[]
}

export const ApplicationLoader: React.FC<ApplicationLoaderProps> = ({ children, initTasks }) => {
  const [failedTitle, setFailedTitle] = useState<string>('')
  const [doneTasks, setDoneTasks] = useState<number>(0)

  const runTask:((task: Promise<void>) => (Promise<void>)) = async (task) => {
    await task
    setDoneTasks(prevDoneTasks => {
      return prevDoneTasks + 1
    })
  }

  useEffect(() => {
    setDoneTasks(0)
    for (const task of initTasks) {
      runTask(task.task).catch((reason: Error) => {
        console.error(reason)
        setFailedTitle(task.name)
      })
    }
  }, [initTasks])

  return (
    doneTasks < initTasks.length || initTasks.length === 0
      ? <LoadingScreen failedTitle={failedTitle}/>
      : <Fragment>{children}</Fragment>
  )
}
