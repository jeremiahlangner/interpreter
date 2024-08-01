import { Token } from './token';

type Node = {
  tokenLiteral: string,
}

interface Statement extends Node { }

interface Expression extends Node { }

class Identifier {
  token: Token;
  value: string;
  expression: Expression;

  constructor(token: Token, expression: Expression) {
    this.token = token;
    this.value = token.literal!;
    this.expression = expression;
  }
}

// root ast node.
class Rule {
  statements: Statement[] = [];

  literal(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral;
    } else {
      return '';
    }
  }
}


export { Rule, Statement, Identifier }
