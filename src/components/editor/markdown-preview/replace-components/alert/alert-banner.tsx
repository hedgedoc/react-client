import { DomElement } from 'domhandler'
import React, { ReactElement } from 'react'
import { Alert } from 'react-bootstrap'

type ValidLevels = ('success'|'warning'|'danger'|'info')
const startTagRegex = /^:::(success|warning|danger|info)$/
const endTagRegex = /^\n:::$/

const getElementReplacement = (node: DomElement): (ReactElement | undefined) => {
  if (node.type !== 'tag' || node.name !== 'p' || !node.children || node.children.length < 3) {
    return
  }

  const first = node.children[0]
  const last = node.children[node.children.length - 1]

  const endTagDoesMatch = endTagRegex.test(last.data)
  const startTagMatches = startTagRegex.exec(first.data)

  if (last.type !== 'text' || first.type !== 'text' || !endTagDoesMatch || !startTagMatches) {
    return
  }

  const variant = startTagMatches[1] as ValidLevels
  if (!variant) {
    return
  }

  return <Alert variant={variant}>match!</Alert>
}

export { getElementReplacement as getAlertReplacement }
