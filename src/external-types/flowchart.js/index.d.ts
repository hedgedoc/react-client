declare module 'flowchart.js' {
  type Options = {
    'line-width': number,
    'fill': string,
    'font-size': string,
    'font-family': string,
    'font-color': string,
    'line-color': string,
    'element-color': string
  }
  type ParseOutput = {
    clean: () => void,
    drawSVG: (container: HTMLElement, options: Partial<Options>) => void,
  }
  export const parse: (code: string) => ParseOutput
}
