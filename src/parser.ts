import Lexer from './lexer';
import { Token, Keyword, } from './token';

 const Precedence = {
  nothing: 0,
  lowest: 1,
  equals: 2,
  compare: 3,
  sum: 4,
  product: 5,
  exponent: 6,
  prefix: 7,
  postfix: 8,
  index: 9,
}

// TODO: Adjust compare precedence.
const OperatorPrecedence = {
  '=': Precedence.equals,
  '!=': Precedence.equals,
  '<': Precedence.equals,
  '>': Precedence.equals,
  '<=': Precedence.equals,
  '>=': Precedence.equals,
  'in': Precedence.equals,
  'and': Precedence.equals,
  'or': Precedence.equals,
  '+': Precedence.sum,
  '-': Precedence.sum,
  '/': Precedence.product,
  '*': Precedence.product,
  '^': Precedence.exponent,
  '[': Precedence.index,
}

type Expression = BaseExpression & Extract<
  LiteralExpression |
  PrefixExpression | 
  InfixExpression |
  IndexExpression,
  { token: Token | Keyword }
>;

type BaseExpression = {
  token: Token | Keyword,
}

interface LiteralExpression extends BaseExpression {
  value: any,
}

interface PrefixExpression extends BaseExpression {
  operator: string,
  right: Expression, 
}

interface InfixExpression extends BaseExpression {
  right: Expression, 
  operator: string,
  left: Expression,
}

interface IndexExpression extends BaseExpression {
  left: Expression,
  index: Expression,
}

/*
  A basic, simple Pratt parser implementation. Takes tokenized strings and parses
  into a syntax tree. Only evaluates expressions.

  TODO: Add error messages for expected tokens.
*/
class Parser {
  lexer: Lexer;
  current: Token | Keyword | undefined;
  peek: Token | Keyword | undefined;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
  }

  private parsePrefixExpression(): LiteralExpression | PrefixExpression {
    switch (this.current!.type) {
      case 'ident': 
      case 'string':
        return {
          token: this.current!,
          value: this.current!.literal,
        };
      case 'number': 
        return {
          token: this.current!,
          value: Number(this.current!.literal),
        };
      case 'boolean':
        return {
          token: this.current!,
          value: this.current!.literal === 'true' ? true : false,
        };
      case 'lparen':
        const exp = this.parse(Precedence.lowest);
        if (this.peek!.type == 'rparen') this.next();
        return exp! as LiteralExpression | PrefixExpression;
      case 'lbracket':
        const token = this.current!;
        const value = [];
        do {
          const exp = this.parse(Precedence.lowest);
          if (this.peek!.type == 'comma') this.next();
          value.push(exp);
        } while (this.peek!.type !== 'rbracket');
        return {
          token,
          value,
        };
    }
    return {
      token: this.current!,
      operator: this.current!.literal,
      right: this.parse(Precedence.prefix)!
    };
  }

  private parseInfixExpression(left: Expression): InfixExpression | IndexExpression {
    switch (this.current!.type) {
      case 'lbracket':
        return <IndexExpression>{
          token: this.current!,
          left,
          index: this.parse(Precedence.lowest),
        };
      default:
        return {
          token: this.current!,
          left,
          operator: this.current!.literal,
          right: this.parse(OperatorPrecedence[this.current!.literal as keyof typeof OperatorPrecedence])!,
        };
    }
  }

  private next(expected?: Token | Keyword) {
    if (expected && this.peek!.type != expected.type)
      throw new Error(`Syntax error at position ${this.lexer.position + 1} - Expected '${expected.literal}' and found '${this.peek!.literal}'`);

    this.current = this.peek;
    this.peek = this.lexer.next();
  }

  private peekPrecedence(): number {
    if (!this.peek) return 0;
    return OperatorPrecedence[this.peek!.literal as keyof typeof OperatorPrecedence] || 0;
  }

  parse(precedence: number = 0): Expression | undefined {
    this.next();
    if (!precedence) this.next();

    if (!this.current) return;

    if (!this.current.prefix)
      throw new Error(`Could not parse expression at position ${this.lexer.position}, '${this.current!.literal}' is not a valid prefix`);

    let left = this.parsePrefixExpression(); 

    while (this.peek && precedence < this.peekPrecedence()) {
      if (!this.peek.infix)
        return left;

      this.next();
      left = <InfixExpression>this.parseInfixExpression(left); 
    } 

    return left;
  }
}

export { 
  Parser,
  Expression,
  LiteralExpression,
  PrefixExpression,
  InfixExpression,
  IndexExpression,
}
