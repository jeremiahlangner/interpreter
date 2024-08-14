import Lexer from './lexer';
import { Token, Keyword, } from './token';

enum Precedence {
  condition = 1,
  sum = 2,
  product = 3,
  prefix = 4,
  postfix = 5,
}

interface Expression {}

interface Prefix extends Expression {
  type: Token['type'] | Keyword['type'],
  right: Expression, 
}

interface Postfix extends Expression {
  type: Token['type'] | Keyword['type'],
  left: Expression, 
}

interface Operator extends Expression {
  left: Expression,
  right: Expression,
  operator: Token['type'],
}

export class Parser {
  lexer: Lexer;
  current: Token | Keyword | undefined;
  peek: Token | Keyword | undefined;
  
  prefixes: Record<string, any> = {
    ident: () => this.current,
    // recursively parse until encounter right parenthesis
    lparen: () => {
      const expr = this.parse();
      this.next();
      return expr;
    },
    plus: () => ({ operator: this.current!.type, right: this.parse() }),
    minus:() => ({ operator: this.current!.type, right: this.parse() }),
    colon: () => {},
    lbracket: () => {},
  };

  infixes: Record<string, any> = {
    plus: () => {},
    minus: () => {},
    times: () => {},
    divide: () => {},
    lcaret: () => {},
    rcaret: () => {},
  };

  postfixes: Record<string, any> = {
    rbracket: () => {},
  }

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.next();
    this.next();
  }

  private next(expected?: Token | Keyword) {
    if (expected && this.peek!.type != expected.type)
      throw new Error(`Syntax error at position ${this.lexer.position + 1} - Expected '${expected.literal}' and found '${this.peek!.literal}'`);

    this.current = this.peek;
    this.peek = this.lexer.next();
  }

  parse(precedence: number = 0): any {
    if (!this.current)
      throw new Error('No current token exists');

    const prefix = this.prefixes[this.current.type!];
    if (!prefix) 
      throw new Error(`Failed to parse ${this.current.literal}`);
  }
}

// assertions / logging
const input = 'some_variable = 45';
const lexer = new Lexer();
lexer.lex(input);
const parser = new Parser(lexer);
const output = parser.parse();
console.log(output);

