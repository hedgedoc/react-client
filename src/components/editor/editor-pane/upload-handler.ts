import { Editor } from 'codemirror'
import { uploadFile } from '../../../api/media'
import { store } from '../../../redux'

export const handleUpload = (files: FileList | null, editor: Editor | undefined): void => {
  if (files && editor) {
    const file = files[0]
    const mimeType = file.type
    const cursor = editor.getCursor()
    const uploadPlaceholder = `![Uploading file...${file.name}]()`
    const noteId = store.getState().documentContent.noteId
    editor.replaceRange(uploadPlaceholder, cursor, cursor, '+input')
    uploadFile(noteId, mimeType, file)
      .then(({ link }) => {
        editor.replaceRange(`![](${link})`, cursor, {
          line: cursor.line,
          ch: cursor.ch + uploadPlaceholder.length
        }, '+input')
      })
      .catch(() => {
        editor.replaceRange('', cursor, {
          line: cursor.line,
          ch: cursor.ch + uploadPlaceholder.length
        }, '+input')
      })
  }
}
