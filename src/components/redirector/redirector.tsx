import React from 'react'
import { Redirect } from 'react-router'
import { useParams } from 'react-router-dom'

interface RouteParameters {
  id: string
}

export const Redirector: React.FC = () => {
  const { id } = useParams<RouteParameters>()
  return (
    <Redirect to={`/n/${id}`}/>
  )
}
