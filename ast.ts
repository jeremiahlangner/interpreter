import { Token } from './token';

/*
  *
  * Ok, so we need a few things: Identifiers, Statements, Expressions. We aren't
* doing assignment, and we only ever return a boolean after evaluation.
  * */

type Node =  {
  tokenLiteral: string,
}

interface Statement extends Node {
  node: Node,
  statementNode: Node,
}

interface Expression extends Node {
  node: Node,
  expressionNode: Node,
}

interface ExpressionStatement extends Statement {
  token: Token,
  expression: Expression,
}

// for data/data assignment later on
type Identifier = {
  token: Token,
  value: string,
}

class Rule {
  statements: Statement[] = [];
  
  tokenLiteral(): string {
    if(this.statements.length > 0) {
      return this.statements[0].tokenLiteral;
    } else {
      return ''
    }
  }

  toString(): string {
    let out: string = '';
    for (const s of this.statements) {
      out += s.toString();
    }
    return out;
  }
}

export { Rule, CompareStatement, Statement }
