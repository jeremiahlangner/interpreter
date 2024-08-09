import { Rule, Statement } from './ast';
import { Token } from './token';
import Lexer from './lexer';

enum precedence {
  _, 
  LOWEST,
  EQUALS,
  LESSGREATER,
  SUM,
  PRODUCT,
  PREFIX,
  CALL
}

interface Expression {};

interface PrefixPart {
  parse(parser: Parser, token: Token): Expression;
}

class IdentifierExpression implements Expression {
  constructor(literal: string) {}
}

class Identifier implements PrefixPart {
  parse(parser: Parser, token: Token): Expression {
    return new IdentifierExpression(token.literal!);
  }
}

class PrefixExpression implements Expression {
  constructor(type: string, operand: Token) {}
}

class PrefixOperatorPart implements PrefixPart {
  parse(parser: Parser, token: Token): Expression {
    const operand = parser.parse();
    return new PrefixExpression(token.type, operand);
  }
}

export class Parser {
  lexer: Lexer;
  curToken: Token | undefined;
  peekToken: Token | undefined;

  errors: any[] = [];
  prefixFns: any[] = [];
  infixFns: any[] = [];

  prefixExpressions: Record<string, any> = {};
  infixExpressions: Record<string, any> = {};

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.nextToken();
    this.nextToken();
  }

  private nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();
  }

  parse() {
    if (!this.curToken)
      throw new Error('No current token exists');

    const prefix = this.prefixExpressions[this.curToken.type!];
    if (!prefix) 
      throw new Error(`Failed to parse ${this.curToken.literal}`);

    const left = prefix.parse();

  }

  // a simple expression parser
  /*
  parseRule(): boolean {
    const statement: ExpressionStatement = { token: this.curToken };

    while (this.curToken) {
      switch (this.curToken!.type) {
        case 'boolean':
          if (!this.nextToken) {
            // TODO: eval
          }
      }
    }

    // default return; rule doesn't exist
    return false;
  }
  */

  expectPeek(token: Token) {
    if (this.peekToken && this.peekToken.type === token.type) {
      this.nextToken();
      return true;
    }
    console.error('Unexpected token at', this.lexer.readPosition);
    return false;
  }
}

// assertions / logging
const input = 'some_variable = 45';
const lexer = new Lexer();
lexer.lex(input);
const parser = new Parser(lexer);
const output = parser.parseRule();
console.log(output);

