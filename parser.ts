import { Rule, Statement } from './ast';
import { Token } from './token';
import Lexer from './lexer';
import eval from './eval';

// TODO: add precedence
const precedence: Record<string, number> = {
  'lowest': 0,
};

export class Parser {
  lexer: Lexer;
  curToken: Token | undefined;
  peekToken: Token | undefined;

  errors: any[] = [];
  prefixFns: any[] = [];
  infixFns: any[] = [];

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.nextToken();
    this.nextToken();
  }

  private nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();
  }

  // Rules are expressions; either as identifiers 
  public parseRule(): boolean {
    // expression parser
    switch (this.curToken!.type) {
      case 'boolean':
        if (!this.nextToken) {
          // TODO: eval
        }
    }

    // default return; rule doesn't exist
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

