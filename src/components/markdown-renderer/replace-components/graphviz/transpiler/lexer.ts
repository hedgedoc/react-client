import { createToken, Lexer } from 'chevrotain'

// marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /[ ]+/,
  group: Lexer.SKIPPED
})

export const StatementSeparator = createToken({
  name: 'StatementSeparator',
  pattern: Lexer.NA
})

export const AttributeSeparator = createToken({
  name: 'AttributeSeparator',
  pattern: Lexer.NA
})

export const LineBreak = createToken({
  name: 'LineBreak',
  pattern: /[\r\n]+/,
  group: Lexer.SKIPPED
  // categories: [StatementSeparator]
})

const Semicolon = createToken({
  name: 'Semicolon',
  pattern: /;/,
  categories: [StatementSeparator, AttributeSeparator]
})

const Comma = createToken({
  name: 'Comma',
  pattern: /,/,
  categories: [AttributeSeparator]
})

export const Identifier = createToken({
  name: 'Identifier',
  pattern: Lexer.NA
})

const Alphabetic = createToken({
  name: 'Alphabetic',
  pattern: /[a-z\200-\377_][\w\200-\377]*/i,
  categories: [Identifier]
})

const Numeric = createToken({
  name: 'Numeric',
  pattern: /-?(.[0-9]+|[0-9]+(.[0-9]*)?)/,
  categories: [Identifier]
})

const Quoted = createToken({
  name: 'Quoted',
  pattern: /".*"/,
  categories: [Identifier]
})

const HTML = createToken({
  name: 'HTML',
  pattern: /<(\w|&amp;|&lt;|%gt;|&quot;)*>/,
  categories: [Identifier]
})

export const Strict = createToken({
  name: 'strict',
  pattern: /strict(?: )/i
})

export const Graph = createToken({
  name: 'Graph',
  pattern: /graph(?: )/i
})

export const Digraph = createToken({
  name: 'Digraph',
  pattern: /digraph/i
})

export const LCurly = createToken({
  name: 'LCurly',
  pattern: /{/
})

export const RCurly = createToken({
  name: 'RCurly',
  pattern: /}/
})

export const Node = createToken({
  name: 'Node',
  pattern: /node(?: )/i
})

export const Edge = createToken({
  name: 'Edge',
  pattern: /edge(?: )/i
})

export const LBracket = createToken({
  name: 'LBracket',
  pattern: /\[/
})

export const RBracket = createToken({
  name: 'RBracket',
  pattern: /]/
})

export const Equal = createToken({
  name: 'Equal',
  pattern: /=/
})

export const Colon = createToken({
  name: 'Colon',
  pattern: /:/
})

export const Subgraph = createToken({
  name: 'Subgraph',
  pattern: /subgraph/i
})

export const Compass = createToken({
  name: 'Compass',
  pattern: / (nw|ne|se|sw|s|e|w|n|c|_) /
})

export const EdgeOperation = createToken({
  name: 'EdgeOperation',
  pattern: Lexer.NA
})

const DirectionalEdge = createToken({
  name: 'DirectionalEdge',
  pattern: /->/,
  categories: [EdgeOperation]
})

const UndirectionalEdge = createToken({
  name: 'UndirectionalEdge',
  pattern: /--/,
  categories: [EdgeOperation]
})

export const allTokens = [
  WhiteSpace,
  StatementSeparator,
  LineBreak,
  Semicolon,
  DirectionalEdge,
  UndirectionalEdge,
  Strict,
  Graph,
  Digraph,
  LCurly,
  RCurly,
  LBracket,
  RBracket,
  Node,
  Edge,
  Equal,
  Comma,
  Colon,
  Subgraph,
  Compass,
  Numeric,
  Quoted,
  HTML,
  Alphabetic
]

export const GraphVizLexer = new Lexer(allTokens)
