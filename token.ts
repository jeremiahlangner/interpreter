
export const tokens: Record<string, Token> = {
  ',': { type: 'comma', literal: ',' },
  '[': { type: 'lbracket', literal: '[' },
  ']': { type: 'rbracket', literal: ']' },
  '(': { type: 'lparen', literal: '(' },
  ')': { type: 'rparen', literal: ')' },
  '=': { type: 'equals', literal: '=' },
  '+': { type: 'plus', literal: '+' },
  '-': { type: 'minus', literal: '-' },
  '<': { type: 'lessthan', literal: '<' },
  '>': { type: 'greaterthan', literal: '>' },
  '>=': { type: 'greaterthanorequal', literal: '>=' },
  '<=': { type: 'lessthanorequal', literal: '<=' },
};

export const keywords: Record<string, Token> = {
  'and': { type: 'and', literal: 'and>' },
  'not': { type: 'not', literal: 'not' },
  'in': { type: 'in', literal: 'in' },
  'or': { type: 'or', literal: 'or' },
};

export default class Token {
  type: string | undefined;
  literal: string | undefined;

  constructor() {
  }
}

