import { CstParser } from 'chevrotain'
import {
  allTokens,
  AttributeSeparator,
  Colon,
  Compass,
  Digraph,
  Edge,
  EdgeOperation,
  Equal,
  Graph,
  Identifier,
  LBracket,
  LCurly,
  Node,
  RBracket,
  RCurly,
  StatementSeparator,
  Strict,
  Subgraph
} from './lexer'

// ----------------- parser -----------------
// Note that this is a Pure grammar, it only describes the grammar
// Not any actions (semantics) to perform during parsing.
export class GraphVizParser extends CstParser {
  // Unfortunately no support for class fields with initializer in ES2015, only in esNext...
  // so the parsing rules are defined inside the constructor, as each parsing rule must be initialized by
  // invoking RULE(...)
  // see: https://github.com/jeffmo/es-class-fields-and-static-properties
  constructor () {
    super(allTokens)

    this.RULE('graph', () => {
      this.OPTION(() => {
        this.CONSUME(Strict)
      })
      this.OR([
        { ALT: () => this.CONSUME(Graph) },
        { ALT: () => this.CONSUME(Digraph) }
      ])
      this.OPTION2(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(LCurly)
      this.AT_LEAST_ONE_SEP({
        SEP: StatementSeparator,
        DEF: () => {
          this.SUBRULE(this.statement)
        }
      })
      this.CONSUME(RCurly)
    })

    this.RULE('statement', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.node_statement) },
        { ALT: () => this.SUBRULE(this.edge_statement) },
        { ALT: () => this.SUBRULE(this.attributes_statement) },
        {
          ALT: () => {
            this.CONSUME(Identifier)
            this.CONSUME(Equal)
            this.CONSUME1(Identifier)
          }
        },
        { ALT: () => this.SUBRULE(this.subgraph) }
      ])
    })

    this.RULE('attributes_statement', () => {
      this.OR([
        { ALT: () => this.CONSUME(Graph) },
        { ALT: () => this.CONSUME(Node) },
        { ALT: () => this.CONSUME(Edge) }
      ])
      this.SUBRULE(this.attributes_list)
    })

    this.RULE('attributes_list', () => {
      this.CONSUME(LBracket)
      this.SUBRULE(this.attribute_list)
      this.CONSUME(RBracket)
      this.OPTION(() => {
        this.SUBRULE(this.attributes_list)
      })
    })

    this.RULE('attribute_list', () => {
      this.CONSUME(Identifier)
      this.CONSUME(Equal)
      this.CONSUME1(Identifier)
      this.OPTION(() => {
        this.CONSUME(AttributeSeparator)
      })
      this.OPTION1(() => {
        this.SUBRULE(this.attribute_list)
      })
    })

    this.RULE('edge_statement', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.node_id) },
        { ALT: () => this.SUBRULE(this.subgraph) }
      ])
      this.SUBRULE(this.edgeRHS)
      this.OPTION(() => this.SUBRULE(this.attributes_list))
    })

    this.RULE('edgeRHS', () => {
      this.CONSUME(EdgeOperation)
      this.OR([
        { ALT: () => this.SUBRULE(this.node_id) },
        { ALT: () => this.SUBRULE(this.subgraph) }
      ])
      this.OPTION(() => this.SUBRULE(this.edgeRHS))
    })

    this.RULE('node_statement', () => {
      this.SUBRULE(this.node_id)
      this.OPTION(() => {
        this.SUBRULE(this.attributes_list)
      })
    })

    this.RULE('node_id', () => {
      this.CONSUME(Identifier)
      this.OPTION(() => {
        this.SUBRULE(this.port)
      })
    })

    this.RULE('port', () => {
      this.OR([
        {
          ALT: () => {
            this.CONSUME(Colon)
            this.CONSUME(Identifier)
            this.OPTION(() => {
              this.CONSUME1(Colon)
              this.SUBRULE(this.compass_pointer)
            })
          }
        },
        {
          ALT: () => {
            this.CONSUME2(Colon)
            this.SUBRULE1(this.compass_pointer)
          }
        }
      ])
    })

    this.RULE('subgraph', () => {
      this.OPTION(() => {
        this.CONSUME(Subgraph)
        this.OPTION1(() => {
          this.CONSUME(Identifier)
        })
      })
      this.CONSUME(LCurly)
      this.AT_LEAST_ONE_SEP({
        SEP: StatementSeparator,
        DEF: () => {
          this.SUBRULE(this.statement)
        }
      })
      this.CONSUME(RCurly)
    })

    this.RULE('compass_pointer', () => {
      this.CONSUME(Compass)
    })

    this.performSelfAnalysis()
  }
}
