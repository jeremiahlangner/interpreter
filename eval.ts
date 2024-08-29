import { 
  Expression, 
  PrefixExpression, 
  LiteralExpression, 
  InfixExpression,
  Parser,
} from './parser';
import Lexer from './lexer';

function parseString(str: string) {
  try { 
    return JSON.parse(str);
  } catch (e) {
    console.log('Failed to parse data.', e);
  }
  return {};
}

class Eval {
  lexer: Lexer;
  parser: Parser;
  data: any;
  ruleSet: Record<string, string>;

  constructor(
    lexer: Lexer, 
    parser: Parser,
    data: string | any = {}, 
    ruleSet: string | Record<string, string> = {}
  ) {
    this.lexer = lexer;
    this.parser = parser;
    this.data = typeof data === 'string' ? parseString(data) : data;
    this.ruleSet = typeof ruleSet === 'string' ? parseString(ruleSet) : ruleSet;
  }

  // handle bracket notation?
  private getDataByPath(path: string): any {
    const paths = path.split('.');
    let data = this.data;
    for (const p of paths) {
      if (typeof data === 'undefined') return;
      data = data[p];
    }
    return data;
  }

  evaluate(exp?: Expression): any {
    if (!exp) return;

    switch (exp.token.type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'lbracket':
        return (<LiteralExpression>exp).value;
      case 'ident':
        let value = this.getDataByPath(exp.token.literal);
        if (typeof value === 'undefined') value = exp.token.literal;
        return value; 
    }
    
    if (!(<InfixExpression>exp).left) {
      if ((<PrefixExpression>exp).operator === 'not') 
        return !this.evaluate((<PrefixExpression>exp).right);
      
      if ((<PrefixExpression>exp).operator === '-') 
        return -this.evaluate((<PrefixExpression>exp).right);
      
      if ((<PrefixExpression>exp).operator === 'date') 
        return new Date(this.evaluate((<PrefixExpression>exp).right)).valueOf();

      if ((<PrefixExpression>exp).operator === ':') {
        if (!this.ruleSet[((<PrefixExpression>exp).right as LiteralExpression).value as keyof typeof this.ruleSet])
          return ((<PrefixExpression>exp).right as LiteralExpression).value;
        this.lexer.lex(this.ruleSet[((<PrefixExpression>exp).right as LiteralExpression).value as keyof typeof this.ruleSet]);
        const ruleExp = this.parser.parse();
        return this.evaluate(ruleExp!);
      }
    }

    const left = this.evaluate((<InfixExpression>exp).left);
    const right = this.evaluate((<InfixExpression>exp).right);
    const operator = (<InfixExpression>exp).operator;

    return {
      '+': left + right,
      '-': left - right,
      '*': left * right,
      '/': left / right,
      '>': left > right,
      '<': left < right,
      '>=': left >= right,
      '<=': left <= right,
      '=': left == right,
      'in': right.includes ? right.includes(left): false,
      'and': left && right,
      'or': left || right,
    }[operator];
  }
}

export {
  Eval,
}
