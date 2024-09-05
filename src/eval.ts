import { 
  Expression, 
  PrefixExpression, 
  LiteralExpression, 
  InfixExpression,
  IndexExpression,
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

export default class Evaluator {
  lexer: Lexer;
  parser: Parser;
  data: any;
  rules: Record<string, string>;
  _rules: Record<string, Expression> = {};

  constructor(
    data: string | any = {}, 
    rules: string | Record<string, string> = {}
  ) {
    this.lexer = new Lexer();
    this.parser = new Parser(this.lexer);
    this.data = typeof data === 'string' ? parseString(data) : data;
    this.rules = typeof rules === 'string' ? parseString(rules) : rules;
  }

  eval(statement: string) {
    this.lexer.lex(statement);
    return this.evaluate(this.parser.parse());
  }

  // TODO: Handle bracket notation
  private getDataByPath(path: string): any {
    const paths = path.split('.');
    let data = this.data;
    for (const p of paths) {
      if (typeof data === 'undefined') return;
      data = data[p];
    }
    return data;
  }

  private evaluate(exp?: Expression): any {
    console.log(exp);
    if (!exp) return;

    if ((<IndexExpression>exp).index) {
      let data = this.evaluate((<IndexExpression>exp).left);
      let index = this.evaluate((<IndexExpression>exp).index);
      data = data[index];
      return data;
    }

    switch (exp.token.type) {
      case 'boolean':
      case 'string':
      case 'number':
        return (<LiteralExpression>exp).value;
      case 'lbracket':
        if ((<LiteralExpression>exp).value)
          return (<LiteralExpression>exp).value.map(
            (e: Expression) => this.evaluate(e)
          );
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
      
      if ((<PrefixExpression>exp).operator === 'date') { 
        const dateExp = this.evaluate((<PrefixExpression>exp).right);
        
        // Add some "Plain English" date values.
        if (typeof dateExp === 'string') {
          if (dateExp === 'today') return new Date(new Date().toLocaleDateString()).valueOf();
          if (dateExp === 'now') return new Date().valueOf();
        }

        return new Date(dateExp).valueOf();
      }

      if ((<PrefixExpression>exp).operator === ':') {
        let rule;

        // Get cached rule if available.
        if (this._rules[((<PrefixExpression>exp).right as LiteralExpression).value])
          rule = this._rules[((<PrefixExpression>exp).right as LiteralExpression).value];

        // Return rule as string if does not exist.
        if (!this.rules[((<PrefixExpression>exp).right as LiteralExpression).value as keyof typeof this.rules])
          return ((<PrefixExpression>exp).right as LiteralExpression).value;

        // If rule exists in rule set, lex and parse the rule. Cache it for later use.
        if (!rule) {
          this.lexer.lex(this.rules[((<PrefixExpression>exp).right as LiteralExpression).value as keyof typeof this.rules]);
          this._rules[((<PrefixExpression>exp).right as LiteralExpression).value] = this.parser.parse()!;
          rule = this._rules[((<PrefixExpression>exp).right as LiteralExpression).value];
        }
        return this.evaluate(rule);
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
      'in': right.includes ? right.includes(left) : false,
      'and': left && right,
      'or': left || right,
    }[operator];
  }
}
