// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CodeMirror from 'codemirror'

declare module 'codemirror' {
    interface EditorConfiguration {
        fullScreen?: boolean;
    }
}
