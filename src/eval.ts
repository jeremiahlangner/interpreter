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

  private getDataByPath(path: string): any {
    const paths = path.split('.');
    let data = this.data;
    try {
      for (const p of paths) {
        if (typeof data === 'undefined') return;
        data = data[p];
      }
      return data;
    } catch (e) {
      console.log('Failed to retrieve data at path', path, e);
      return;
    }
  }

  /*
    * refactor 
  private reevaluate(exp: Expression): any {
    switch (true) {
      case exp.token.type === 'boolean':
      case exp.token.type === 'string':
      case exp.token.type === 'number':
      case exp.token.type === 'question':
        return (<LiteralExpression>exp).value;
      case exp.token.type === 'ident':
        return this.getDataByPath(exp.token.literal);
      case exp.token.type === 'lbracket':
        if ((<LiteralExpression>exp).value)
          return (<LiteralExpression>exp).value.map(
            (e: Expression) => this.evaluate(e)
          );
    }
  }
  */

  private evaluate(exp?: Expression): any {
    if (!exp) return;

    switch (exp.token.type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'question':
        return (<LiteralExpression>exp).value;
      case 'ident':
        return this.getDataByPath(exp.token.literal);
      case 'lbracket':
        if ((<LiteralExpression>exp).value)
          return (<LiteralExpression>exp).value.map(
            (e: Expression) => this.evaluate(e)
          );
    }
    
    if (!(<InfixExpression>exp).left) {
      if ((<PrefixExpression>exp).operator === 'not') 
        return !this.evaluate((<PrefixExpression>exp).right);
      
      if ((<PrefixExpression>exp).operator === '-') 
        return -this.evaluate((<PrefixExpression>exp).right);
      
      if ((<PrefixExpression>exp).operator === 'date') { 
        let dateExp = this.evaluate((<PrefixExpression>exp).right);
        if (typeof dateExp === 'string') {
          if (dateExp === 'today') dateExp = new Date().toLocaleDateString();
          if (dateExp === 'now') dateExp = new Date().toString();
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

    if ((<IndexExpression>exp).index) {
      const data = this.evaluate((<IndexExpression>exp).left);
      const index = this.evaluate((<IndexExpression>exp).index);
      
      if (data?._indices || index === '?') {
        console.log(data, index);
        const _indices = data._indices ? [...data._indices, index] : [index];
        return {
          data: data.data || data,
          _indices
        };
      }

      return data ? data[index]: undefined;
    }
      
    let left = this.evaluate((<InfixExpression>exp).left);
    let right = this.evaluate((<InfixExpression>exp).right);
    const operator = (<InfixExpression>exp).operator;

    if (left && left._indices) left = getValues(left);
    if (right && right._indices) right = getValues(right);

    return {
      '+': left + right,
      '-': left - right,
      '*': left * right,
      '/': left / right,
      '>': left > right,
      '<': left < right,
      '>=': left >= right,
      '<=': left <= right,
      '=': Array.isArray(left) ? left.includes(right) : left === right,
      'in': right && right.includes ? right.includes(left) : false,
      'and': left && right,
      'or': left || right,
    }[operator];
  }
}

function getValues(value: { data: any, _indices: any[] }) {
  let data = value.data;
  let j = 0;
  let i = value._indices[j];
  
  while (i && i !== '?' && data) {
    j++;
    data = data[i];
    i = value._indices[j];
  }

  if (i === '?') {
    let list = [];
    for (const idx in data) {
      const tmpData: any = getValues({ data: data[idx], _indices: value._indices.slice(j+1) });
      if (tmpData) list.push(tmpData);
    }
    console.log(list);
    if (list.length > 0) data = list;
  }

  return data;
}
