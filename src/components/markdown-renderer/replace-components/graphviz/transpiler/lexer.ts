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
  pattern: /([a-zA-Z]|[\200-\377]|_)(\w|[\200-\377])*/,
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
  pattern: /strict/
})

export const Graph = createToken({
  name: 'Graph',
  pattern: /graph/
})

export const Digraph = createToken({
  name: 'Digraph',
  pattern: /digraph/
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
  pattern: /node/
})

export const Edge = createToken({
  name: 'Edge',
  pattern: /edge/
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
  pattern: /subgraph/
})

export const Compass = createToken({
  name: 'Compass',
  pattern: / (nw|ne|se|sw|s|e|w|n|c|_) /
})

/* const North = createToken({
  name: 'North',
  pattern: /n/,
  categories: [Compass]
})

const NorthEast = createToken({
  name: 'NorthEast',
  pattern: /ne/,
  categories: [Compass]
})

const East = createToken({
  name: 'East',
  pattern: /e/,
  categories: [Compass]
})

const SouthEast = createToken({
  name: 'SouthEast',
  pattern: /se/,
  categories: [Compass]
})

const South = createToken({
  name: 'South',
  pattern: /s/,
  categories: [Compass]
})

const SouthWest = createToken({
  name: 'SouthWest',
  pattern: /sw/,
  categories: Compass
})

const West = createToken({
  name: 'West',
  pattern: /w/,
  categories: Compass
})

const NorthWest = createToken({
  name: 'NorthWest',
  pattern: /nw/,
  categories: Compass
})

const Center = createToken({
  name: 'Center',
  pattern: /c/,
  categories: [Compass]
})

const Underscore = createToken({
  name: 'Underscore',
  pattern: /_/,
  categories: Compass
}) */

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
  EdgeOperation,
  DirectionalEdge,
  UndirectionalEdge,
  Strict,
  Graph,
  Digraph,
  LCurly,
  RCurly,
  Node,
  Edge,
  LBracket,
  RBracket,
  Equal,
  Comma,
  Colon,
  Subgraph,
  Compass,
  /* NorthEast,
  SouthEast,
  SouthWest,
  NorthWest,
  North,
  East,
  South,
  West,
  Center,
  Underscore, */
  Identifier,
  Alphabetic,
  Numeric,
  Quoted,
  HTML
]

export const GraphVizLexer = new Lexer(allTokens)
