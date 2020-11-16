import MarkdownIt from 'markdown-it/lib'

export const MarkdownItParserDebugger = (onDebugOutput: ((output: string) => void)): MarkdownIt.PluginSimple => {
  return (md: MarkdownIt) => {
    if (process.env.NODE_ENV !== 'production') {
      md.core.ruler.push('test', (state) => {
        onDebugOutput(JSON.stringify(state))
        return true
      })
    }
  }
}

// The following code is a temporary work-around to fix the issue that the webworker tries to do HMR although it can't.
/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-empty-function,@typescript-eslint/no-explicit-any */
(global as any).$RefreshReg$ = () => {};
(global as any).$RefreshSig$$ = () => () => {}
/* eslint-enable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-empty-function,@typescript-eslint/no-explicit-any */
