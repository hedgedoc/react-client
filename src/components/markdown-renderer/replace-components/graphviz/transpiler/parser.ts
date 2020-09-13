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
  LineBreak,
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
      this.OPTION1(() => {
        this.CONSUME(Identifier)
      })
      this.CONSUME(LCurly)
      // this.OPTION2(() => this.CONSUME(LineBreak))
      this.SUBRULE(this.stmt_list)
      this.OPTION3(() => this.CONSUME1(LineBreak))
      this.CONSUME(RCurly)
    })

    this.RULE('stmt_list', () => {
      this.SUBRULE(this.stmt)
      this.OPTION1(() => this.CONSUME(StatementSeparator))
      this.OPTION(() => this.SUBRULE1(this.stmt_list))
    })

    this.RULE('stmt', () => {
      this.OR({
        IGNORE_AMBIGUITIES: true,
        DEF: [
          { ALT: () => this.SUBRULE(this.edge_stmt) },
          { ALT: () => this.SUBRULE(this.node_stmt) },
          { ALT: () => this.SUBRULE(this.attr_stmt) },
          {
            ALT: () => {
              this.CONSUME(Identifier)
              this.CONSUME(Equal)
              this.CONSUME1(Identifier)
            }
          },
          { ALT: () => this.SUBRULE(this.subgraph) }
        ]
      })
    })

    this.RULE('attr_stmt', () => {
      this.OR([
        { ALT: () => this.CONSUME(Graph) },
        { ALT: () => this.CONSUME(Node) },
        { ALT: () => this.CONSUME(Edge) }
      ])
      this.SUBRULE(this.attr_list)
    })

    this.RULE('attr_list', () => {
      this.CONSUME(LBracket)
      this.SUBRULE(this.a_list)
      this.CONSUME(RBracket)
      this.OPTION(() => {
        this.SUBRULE(this.attr_list)
      })
    })

    this.RULE('a_list', () => {
      this.CONSUME(Identifier)
      this.CONSUME(Equal)
      this.CONSUME1(Identifier)
      this.OPTION(() => {
        this.CONSUME(AttributeSeparator)
      })
      this.OPTION1(() => {
        this.SUBRULE(this.a_list)
      })
    })

    this.RULE('edge_stmt', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.node_id) },
        { ALT: () => this.SUBRULE(this.subgraph) }
      ])
      this.SUBRULE(this.edgeRHS)
      this.OPTION(() => this.SUBRULE(this.attr_list))
    })

    this.RULE('edgeRHS', () => {
      this.CONSUME(EdgeOperation)
      this.OR([
        { ALT: () => this.SUBRULE(this.node_id) },
        { ALT: () => this.SUBRULE(this.subgraph) }
      ])
      this.OPTION(() => this.SUBRULE(this.edgeRHS))
    })

    this.RULE('node_stmt', () => {
      this.SUBRULE(this.node_id)
      this.OPTION(() => {
        this.SUBRULE(this.attr_list)
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
              this.SUBRULE(this.compass_pt)
            })
          }
        },
        {
          ALT: () => {
            this.CONSUME2(Colon)
            this.SUBRULE1(this.compass_pt)
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
      // this.OPTION2(() => this.CONSUME(LineBreak))
      this.SUBRULE(this.stmt_list)
      // this.OPTION3(() => this.CONSUME1(LineBreak))
      this.CONSUME(RCurly)
    })

    this.RULE('compass_pt', () => {
      this.CONSUME(Compass)
    })

    this.performSelfAnalysis()
  }
}
