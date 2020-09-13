import { GraphVizLexer } from './lexer'
import { GraphVizParser } from './parser'

const testGraphs = [`graph {
  a -- b
  c -- d
  b -- a [color=blue]
}`, `digraph structs {
  node [shape=record];
  struct1 [label="<f0> left|<f1> mid&#92; dle|<f2> right"];
  struct2 [label="<f0> one|<f1> two"];
  struct3 [label="hello&#92;nworld |{ b |{c|<here> d|e}| f}| g | h"];
  struct1:f1 -> struct2:f0;
  struct1:f2 -> struct3:here;
}`, `digraph G {
  main -> parse -> execute;
  main -> init;
  main -> cleanup;
  execute -> make_string;
  execute -> printf
  init -> make_string;
  main -> printf;
  execute -> compare;
}`, `digraph D {
    node [fontname="Arial"];
    node_A [shape=record    label="shape=record|{above|middle|below}|right"];
    node_B [shape=plaintext label="shape=plaintext|{curly|braces and|bars without}|effect"];
}`, `digraph D {
  A -> {B; C; D} -> {F}
}`]
describe('test parser', () => {
  testGraphs.forEach((graph, index) => {
    it(`graph ${index + 1}`, () => {
      const lexingResult = GraphVizLexer.tokenize(graph)

      console.log('> lexingResults')
      console.log(lexingResult.tokens.map(token => ({
        text: token.image,
        tokenType: token.tokenType.name
      })))
      console.log('> errors')
      console.log(lexingResult.errors)

      const parser = new GraphVizParser()

      parser.input = lexingResult.tokens
      parser.graph()
      if (parser.errors.length > 0) {
        console.log('parser errors', JSON.stringify(parser.errors, null, 2))
        throw new Error('Parsing errors detected')
      }
    })
  })
})
