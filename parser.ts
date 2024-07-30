import { Rule, Statement, CompareStatement } from './ast';
import { Token } from './token';
import Lexer from './lexer';

export class Parser {
  lexer: Lexer;
  curToken: Token | undefined;
  peekToken: Token | undefined;

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

  // Rules consist of a single statement; statement may be recursive
  public parseRule(): Rule | undefined {
    const rule = new Rule();

    while (this.curToken) {
      const statement = this.parseStatement();
      if (statement) rule.statements.push(statement);
      this.nextToken();
    }

    return rule;
  }

  private parseStatement(): Statement | undefined {
    switch (this.curToken!.type) {
      case '':
        return this.parseRuleStatement();
      default:
        return;
    }
  }

}

// assertions / logging
const input = 'some_variable = 45';
const lexer = new Lexer(input);
const parser = new Parser(lexer);
const output = parser.parseRule();
console.log(output);

