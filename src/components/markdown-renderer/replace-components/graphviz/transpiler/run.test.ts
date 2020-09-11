import { GraphVizLexer } from './lexer'
import { GraphVizParser } from './parser'

it('test', () => {
  const lexingResult = GraphVizLexer.tokenize(`graph {
  a -- b
  a -- b
  b -- a [color=blue]
}`)
  const parser = new GraphVizParser()

  parser.input = lexingResult.tokens
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.log(parser.graph())
})
