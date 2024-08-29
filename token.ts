type Token = BaseToken & Extract<
  CommaToken |  
  LBracketToken |
  RBracketToken |
  LParenToken | 
  RParenToken |  
  EqualsToken |  
  PlusToken |
  MinusToken | 
  LTToken | 
  GTToken | 
  GTEqualToken | 
  LTEqualToken | 
  MultiplyToken |
  DivideToken |
  StringLiteral | 
  NumberLiteral |
  IdentifierToken |
  ReferenceToken
, { type: string }>;

type BaseToken = { 
  literal: string,
  prefix?: boolean,
  infix?: boolean,
};

interface CommaToken extends BaseToken { 
  type: 'comma', 
  literal: ',' 
};

interface LBracketToken extends BaseToken { 
  type: 'lbracket', 
  literal: '[' 
};

interface RBracketToken extends BaseToken { 
  type: 'rbracket', 
  literal: ']' 
};

interface LParenToken extends BaseToken { 
  type: 'lparen', 
  literal: '(' 
};

interface RParenToken extends BaseToken { 
  type: 'rparen', 
  literal: ')' 
};

interface EqualsToken extends BaseToken { 
  type: 'equals', 
  literal: '=',
};

interface PlusToken extends BaseToken { 
  type: 'plus', 
  literal: '+',
};

interface MinusToken extends BaseToken { 
  type: 'minus', 
  literal: '-', 
};

interface LTToken extends BaseToken { 
  type: 'lessthan', 
  literal: '<',
};

interface GTToken extends BaseToken { 
  type: 'greaterthan', 
  literal: '>',
};

interface GTEqualToken extends BaseToken { 
  type: 'greaterthanorequal', 
  literal: '>=',
};

interface LTEqualToken extends BaseToken { 
  type: 'lessthanorequal', 
  literal: '<=',
};

interface MultiplyToken extends BaseToken { 
  type: 'multiply', 
  literal: '*',
};

interface DivideToken extends BaseToken { 
  type: 'divide', 
  literal: '/',
};

interface IdentifierToken extends BaseToken { 
  type: 'ident', 
  literal: string, 
};

interface ReferenceToken extends BaseToken { 
  type: 'ref', 
  literal: ':', 
};

interface StringLiteral extends BaseToken { 
  type: 'string', 
  literal: string, 
};

interface NumberLiteral extends BaseToken { 
  type: 'number', 
  literal: string, 
};

interface ListLiteral extends BaseToken {
  type: 'list',
  literal: string,
}

const TokenMap: Record<string, Token> = {
  ',': { type: 'comma', literal: ',' },
  '[': { type: 'lbracket', literal: '[', prefix: true },
  ']': { type: 'rbracket', literal: ']' },
  '(': { type: 'lparen', literal: '(', prefix: true },
  ')': { type: 'rparen', literal: ')' },
  '=': { type: 'equals', literal: '=', infix: true },
  ':': { type: 'ref', literal: ':', prefix: true },
  '+': { type: 'plus', literal: '+', infix: true },
  '-': { type: 'minus', literal: '-', infix: true, prefix: true },
  '<': { type: 'lessthan', literal: '<', infix: true },
  '>': { type: 'greaterthan', literal: '>', infix: true },
  '>=': { type: 'greaterthanorequal', literal: '>=', infix: true },
  '<=': { type: 'lessthanorequal', literal: '<=', infix: true },
  '*': { type: 'multiply', literal: '*', infix: true },
  '/': { type: 'divide', literal: '/', infix: true },
};

type Keyword = BaseKeyword & Extract<
  DateKeyword |
  AndKeyword |
  NotKeyword |
  InKeyword |
  OrKeyword | 
  True |
  False 
  , { type: string }
>;

type BaseKeyword = {
  infix?: boolean,
  prefix?: boolean,
}

interface DateKeyword extends BaseKeyword {
  type: 'date',
  literal: 'date',
}

interface AndKeyword extends BaseKeyword  { 
  type: 'and', 
  literal: 'and' 
};

interface NotKeyword extends BaseKeyword { 
  type: 'not', 
  literal: 'not', 
};

interface InKeyword extends BaseKeyword { 
  type: 'in', 
  literal: 'in' 
};

interface OrKeyword extends BaseKeyword { 
  type: 'or', 
  literal: 'or' 
};

interface True extends BaseKeyword { 
  type: 'boolean', 
  literal: 'true', 
};

interface False extends BaseKeyword { 
  type: 'boolean', 
  literal: 'false',
};

const KeywordMap: Record<string, Keyword> = {
  'and': { type: 'and', literal: 'and', infix: true },
  'not': { type: 'not', literal: 'not', prefix: true, },
  'in': { type: 'in', literal: 'in', infix: true },
  'or': { type: 'or', literal: 'or', infix: true },
  'true': { type: 'boolean', literal: 'true', prefix: true },
  'false': { type: 'boolean', literal: 'false', prefix: true },
  'date': { type: 'date', literal: 'date', prefix: true, },
};

export { Keyword, Token, KeywordMap, TokenMap };
