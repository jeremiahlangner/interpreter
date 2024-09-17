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
    if (!path) return;

    const paths = path.split('.');

    if (!paths.length) return;

    let data = this.data;
    for (const p of paths) {
      if (typeof data === 'undefined') return;
      data = data[p];
    }
    return data;
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
      case 'root':
        return this.data;
      case 'lparen':
        if ((<LiteralExpression>exp).value.length > 1) 
          return (<LiteralExpression>exp).value.map(
            (e: Expression) => this.evaluate(e)
          );
        return this.evaluate((<LiteralExpression>exp).value[0]);
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

      if ((<PrefixExpression>exp).operator === 'find') { 
        if (!(<LiteralExpression>(<PrefixExpression>exp).right).value[1]) {
          console.log('Expression error. Expected 2 arguments for function "find".', exp);
          return false;
        }

        const obj = this.evaluate((<LiteralExpression>(<PrefixExpression>exp).right).value[0]);
        const e = new Evaluator();
        for (const k in obj) {
          e.data = obj[k];
          if (e.evaluate((<LiteralExpression>(<PrefixExpression>exp).right).value[1])) return true;
        }
        return false;
      }

      if ((<PrefixExpression>exp).operator === ':') {
        let rule;

        // Get cached rule if available.
        if (this._rules[(<LiteralExpression>(<PrefixExpression>exp).right).value])
          rule = this._rules[(<LiteralExpression>(<PrefixExpression>exp).right).value];

        // Return rule as string if does not exist.
        if (!this.rules[(<LiteralExpression>(<PrefixExpression>exp).right).value as keyof typeof this.rules])
          return (<LiteralExpression>(<PrefixExpression>exp).right).value;

        // If rule exists in rule set, lex and parse the rule. Cache it for later use.
        if (!rule) {
          this.lexer.lex(this.rules[(<LiteralExpression>(<PrefixExpression>exp).right).value as keyof typeof this.rules]);
          this._rules[(<LiteralExpression>(<PrefixExpression>exp).right).value] = this.parser.parse()!;
          rule = this._rules[(<LiteralExpression>(<PrefixExpression>exp).right).value];
        }
        return this.evaluate(rule);
      }
    }

    if ((<IndexExpression>exp).index) {
      const data = this.evaluate((<IndexExpression>exp).left);
      const index = this.evaluate((<IndexExpression>exp).index);
      
      if (data?._indices || index === '?') {
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
    if (list.length > 0) data = list;
  }

  return data;
}
