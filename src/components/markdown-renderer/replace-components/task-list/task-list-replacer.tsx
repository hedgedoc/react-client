import React, { ReactElement } from 'react'
import { DomElement } from 'domhandler'
import { ComponentReplacer, SubNodeConverter } from '../ComponentReplacer'

const REGEX = /(\s*[-*] )(\[[ xX]])( .*)/

export class TaskListReplacer implements ComponentReplacer {
  content: string
  onContentChange: (content: string) => void

  constructor (content: string, onContentChange: (content: string) => void) {
    this.content = content
    this.onContentChange = onContentChange
  }

  handleCheckboxChange = (event: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
    const checkbox = event.currentTarget
    const checked = checkbox.checked
    const lineNum = Number(checkbox.dataset.line)
    const lines = this.content.split('\n')
    const line = lines[lineNum]
    const results = REGEX.exec(line)
    if (results) {
      const before = results[1]
      const after = results[3]
      lines[lineNum] = `${before}[${checked ? 'x' : ' '}]${after}`
      this.onContentChange(lines.join('\n'))
    }
  }

  getReplacement (node: DomElement, index:number, subNodeConverter: SubNodeConverter): (ReactElement|undefined) {
    if (node.attribs?.class === 'task-list-item-checkbox') {
      return (
        <input
          className="task-list-item-checkbox"
          type="checkbox"
          checked={node.attribs.checked !== undefined}
          onClick={this.handleCheckboxChange}
          data-line={node.attribs['data-line']}
        />
      )
    }
  }
}
