import Token from './token';

type Node = {
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

type Identifier = {
  token: Token,
  value: string,
}

interface CompareStatement extends Node {
  node: Node;
  token: Token;
  name: Identifier;
  value: Expression;
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
}

export { Rule, CompareStatement, Statement }
