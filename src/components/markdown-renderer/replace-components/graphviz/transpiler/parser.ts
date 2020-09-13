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

// The grammar build here describes the DOT language by GraphViz https://www.graphviz.org/doc/info/lang.html
/*
The grammar is written in markdown to differentiate between terminals and non-terminals.
> The following is an abstract grammar defining the DOT language. Terminals are shown in bold font and nonterminals in italics.
> Literal characters are given in single quotes. Parentheses ( and ) indicate grouping when needed.
> Square brackets [ and ] enclose optional items. Vertical bars | separate alternatives.
graph  :  [ **strict** ] (**graph** | **digraph**) [ *ID* ] '{' *stmt_list* '}'
stmt_list  :  [ stmt [ ';' ] stmt_list ]
stmt  :  *node_stmt*
  | *edge_stmt*
  | *attr_stmt*
  | *ID* '**=**' *ID*
  | *subgraph*
attr_stmt  :  (**graph** | **node** | **edge**) *attr_list*
attr_list  :  '**[**' [ *a_list* ] '**]**' [ *attr_list* ]
a_list  :  *ID* '**=**' *ID* [ ('**;**' | '**,**') ] [ *a_list* ]
edge_stmt  :  (*node_id* | *subgraph*) *edgeRHS* [ *attr_list* ]
edgeRHS  :  *edgeop* (*node_id* | *subgraph*) [ *edgeRHS* ]
node_stmt  :  *node_id* [ *attr_list* ]
node_id  :  *ID* [ *port* ]
port  :  '**:**' *ID* [ '**:**' *compass_pt* ]
 |  '**:**' *compass_pt*
subgraph  :  [ **subgraph** [ *ID* ] ] '**{**' *stmt_list* '**}**'
compass_pt  :  (**n** | **ne** | **e** | **se** | **s** | **sw** | **w** | **nw** | **c** | **_**)
edgeop  :  '**--**' | '**->**'
 */

export class GraphVizParser extends CstParser {
  constructor () {
    super(allTokens)
    this.performSelfAnalysis()
  }

  public graph = this.RULE('graph', () => {
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
    this.SUBRULE(this.stmt_list)
    this.OPTION2(() => this.CONSUME(LineBreak))
    this.CONSUME(RCurly)
  })

  // eslint-disable-next-line camelcase
  private stmt_list = this.RULE('stmt_list', () => {
    this.SUBRULE(this.stmt)
    this.OPTION1(() => this.CONSUME(StatementSeparator))
    this.OPTION(() => this.SUBRULE1(this.stmt_list))
  })

  private stmt = this.RULE('stmt', () => {
    this.OR({
      IGNORE_AMBIGUITIES: true,
      DEF: [
        { ALT: () => this.SUBRULE(this.node_stmt) },
        { ALT: () => this.SUBRULE(this.edge_stmt) },
        { ALT: () => this.SUBRULE(this.attr_stmt) },
        {
          ALT: () => {
            this.CONSUME1(Identifier)
            this.CONSUME(Equal)
            this.CONSUME2(Identifier)
          }
        },
        { ALT: () => this.SUBRULE(this.subgraph) }
      ]
    })
  })

  // eslint-disable-next-line camelcase
  private attr_stmt = this.RULE('attr_stmt', () => {
    this.OR([
      { ALT: () => this.CONSUME(Graph) },
      { ALT: () => this.CONSUME(Node) },
      { ALT: () => this.CONSUME(Edge) }
    ])
    this.SUBRULE(this.attr_list)
  })

  // eslint-disable-next-line camelcase
  private attr_list = this.RULE('attr_list', () => {
    this.CONSUME(LBracket)
    this.SUBRULE(this.a_list)
    this.CONSUME(RBracket)
    this.OPTION(() => {
      this.SUBRULE(this.attr_list)
    })
  })

  // eslint-disable-next-line camelcase
  private a_list = this.RULE('a_list', () => {
    this.CONSUME1(Identifier)
    this.CONSUME(Equal)
    this.CONSUME2(Identifier)
    this.OPTION(() => {
      this.CONSUME(AttributeSeparator)
    })
    this.OPTION1(() => {
      this.SUBRULE(this.a_list)
    })
  })

  // eslint-disable-next-line camelcase
  private edge_stmt = this.RULE('edge_stmt', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.node_id) },
      { ALT: () => this.SUBRULE(this.subgraph) }
    ])
    this.SUBRULE(this.edgeRHS)
    this.OPTION(() => this.SUBRULE(this.attr_list))
  })

  private edgeRHS = this.RULE('edgeRHS', () => {
    this.CONSUME(EdgeOperation)
    this.OR([
      { ALT: () => this.SUBRULE(this.node_id) },
      { ALT: () => this.SUBRULE(this.subgraph) }
    ])
    this.OPTION(() => this.SUBRULE(this.edgeRHS))
  })

  // eslint-disable-next-line camelcase
  private node_stmt =this.RULE('node_stmt', () => {
    this.SUBRULE(this.node_id)
    this.OPTION(() => {
      this.SUBRULE(this.attr_list)
    })
  })

  // eslint-disable-next-line camelcase
  private node_id = this.RULE('node_id', () => {
    this.CONSUME(Identifier)
    this.OPTION(() => {
      this.SUBRULE(this.port)
    })
  })

  private port = this.RULE('port', () => {
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

  private subgraph = this.RULE('subgraph', () => {
    this.OPTION(() => {
      this.CONSUME(Subgraph)
      this.OPTION1(() => {
        this.CONSUME(Identifier)
      })
    })
    this.CONSUME(LCurly)
    this.SUBRULE(this.stmt_list)
    this.CONSUME(RCurly)
  })

  // eslint-disable-next-line camelcase
  private compass_pt = this.RULE('compass_pt', () => {
    this.CONSUME(Compass)
  })
}
