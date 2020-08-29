declare module 'flowchart.js' {
  type Options = {}
  type ParseOutput = {
    clean: () => void,
    drawSVG: (container: string, options: Options) => void,
  }
  export const parse: (code: string) => ParseOutput
}
