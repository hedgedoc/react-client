import React, { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import './editor-window.scss'

const EditorWindow: React.FC = () => {
  const [content, setContent] = useState<string>('It\'s very easy to make some words **bold** and other words *italic* with Markdown.\nYou can even [link to Google!](http://google.com)')
  return (
    <CodeMirror
      className="h-100 w-100"
      value={content}
      options={{
        mode: 'markdown',
        lineNumbers: true
      }}
      onBeforeChange={(editor, data, value) => {
        setContent(value)
      }}
      onChange={(editor, data, value) => {
        console.log('change!')
      }}
    />
  )
}

export { EditorWindow }
