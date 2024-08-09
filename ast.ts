import { Token } from './token';

type Node = {
  token: Token,
  toString(): string,
}

class Identifier {
  token: Token;
  value: string;
  expression: Expression;

  constructor(token: Token, expression: Expression) {
    this.token = token;
    this.value = token.literal!;
    this.expression = expression;
  }

  toString(): string {
    return this.token.literal!;
  }
}

interface Statement extends Node { }

interface Expression extends Node { }

class ExpressionStatement {
  expression: Expression;

  constructor(expression: Expression) {
    this.expression = expression;
  }

  toString() {
    return this.expression.toString();
  }
}


// root ast node.
class Rule {
  statements: Statement[] = [];

  toString(): string {
    let out = '';
    for (const s of this.statements) {
      out += s.toString();
    }
    return out;
  }
  
  get literal(): string {
    if (this.statements.length > 0) {
      return this.statements[0].token.literal!;
    } else {
      return '';
    }
  }
}


export { Rule, Statement, Identifier }
