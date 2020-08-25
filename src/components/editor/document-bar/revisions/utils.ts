import { Revision } from '../../../../api/revisions'

export const downloadRevision = (noteId: string, revision: Revision | null): void => {
  if (!revision) {
    return
  }
  const encoded = Buffer.from(revision.content).toString('base64')
  const wrapper = document.createElement('a')
  wrapper.download = `${noteId}-${revision.timestamp}.md`
  wrapper.href = `data:text/markdown;charset=utf-8;base64,${encoded}`
  document.body.appendChild(wrapper)
  wrapper.click()
  document.body.removeChild(wrapper)
}
