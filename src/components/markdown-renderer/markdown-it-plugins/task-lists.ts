// Markdown-it plugin to render GitHub-style task lists; see
//
// https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
// https://github.com/blog/1825-task-lists-in-all-markdown-documents

import MarkdownIt from 'markdown-it/lib'
import StateCore from 'markdown-it/lib/rules_core/state_core'
import Token from 'markdown-it/lib/token'

let disableCheckboxes = true
let useLabelWrapper = false
let useLabelAfter = false

interface TaskListsOptions {
  enabled: boolean
  label: boolean
  labelAfter: boolean
}

type TokenConstructorType = typeof Token

export function markdownItTaskLists (md: MarkdownIt, options: TaskListsOptions): void {
  if (options) {
    disableCheckboxes = !options.enabled
    useLabelWrapper = options.label
    useLabelAfter = options.labelAfter
  }

  md.core.ruler.after('inline', 'github-task-lists', function (state: StateCore): boolean {
    const tokens = state.tokens
    for (let i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i])
        attrSet(tokens[i - 2], 'class', 'task-list-item' + (!disableCheckboxes ? ' enabled' : ''))
        attrSet(tokens[parentToken(tokens, i - 2)], 'class', 'contains-task-list')
      }
    }
    return false
  })
}

function attrSet (token: Token, name: string, value: string) {
  const index = token.attrIndex(name)
  const attr: [string, string] = [name, value]

  if (index < 0) {
    token.attrPush(attr)
  } else {
    if (token.attrs == null) {
      token.attrs = []
    }
    token.attrs[index] = attr
  }
}

function parentToken (tokens: Token[], index: number) {
  const targetLevel = tokens[index].level - 1
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i
    }
  }
  return -1
}

function isTodoItem (tokens: Token[], index: number) {
  return isInline(tokens[index]) &&
    isParagraph(tokens[index - 1]) &&
    isListItem(tokens[index - 2]) &&
    startsWithTodoMarkdown(tokens[index])
}

function todoify (token: Token) {
  if (token.children == null) return
  token.children.unshift(makeCheckbox(token))
  token.children[1].content = token.children[1].content.slice(3)
  token.content = token.content.slice(3)

  if (useLabelWrapper) {
    if (useLabelAfter) {
      token.children.pop()

      // Use large random number as id property of the checkbox.
      const id = `task-item-${Math.ceil(Math.random() * (10000 * 1000) - 1000)}`
      token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">'
      token.children.push(afterLabel(token.content, id))
    } else {
      token.children.unshift(beginLabel())
      token.children.push(endLabel())
    }
  }
}

function makeCheckbox (token: Token) {
  const checkbox = new Token('html_inline', '', 0)
  const disabledAttr = disableCheckboxes ? ' disabled="" ' : ''
  const dataLine = token.map ? `data-line="${token.map[0]}"` : 'data-line=""'

  if (token.content.indexOf('[ ] ') === 0) {
    checkbox.content = `<input class="task-list-item-checkbox" ${disabledAttr} type="checkbox" ${dataLine}">`
  } else if (token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0) {
    checkbox.content = `<input class="task-list-item-checkbox" checked="" ${disabledAttr} type="checkbox" ${dataLine}>`
  }
  return checkbox
}

// these next two functions are kind of hacky; probably should really be a
// true block-level token with .tag=='label'
function beginLabel () {
  const token = new Token('html_inline', '', 0)
  token.content = '<label>'
  return token
}

function endLabel () {
  const token = new Token('html_inline', '', 0)
  token.content = '</label>'
  return token
}

function afterLabel (content: string, id: string) {
  const token = new Token('html_inline', '', 0)
  token.content = `<label class="task-list-item-label" for="${id}">${content}</label>`
  token.attrs = [['for', 'id']]
  return token
}

function isInline (token: Token) {
  return token.type === 'inline'
}

function isParagraph (token: Token) {
  return token.type === 'paragraph_open'
}

function isListItem (token: Token) {
  return token.type === 'list_item_open'
}

function startsWithTodoMarkdown (token: Token) {
  // leading whitespace in a list item is already trimmed off by markdown-it
  return token.content.indexOf('[ ] ') === 0 || token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0
}
