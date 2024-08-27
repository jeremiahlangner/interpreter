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
  StringToken | 
  NumberToken |
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

interface StringToken extends BaseToken { 
  type: 'string', 
  literal: string, 
};

interface NumberToken extends BaseToken { 
  type: 'number', 
  literal: string, 
};


interface IdentifierToken extends BaseToken { 
  type: 'ident', 
  literal: string, 
};

interface ReferenceToken extends BaseToken { 
  type: 'ref', 
  literal: ':', 
};

const TokenMap: Record<string, Token> = {
  ',': { type: 'comma', literal: ',' },
  '[': { type: 'lbracket', literal: '[' },
  ']': { type: 'rbracket', literal: ']' },
  '(': { type: 'lparen', literal: '(' },
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
  AndKeyword |
  NotKeyword |
  InKeyword |
  OrKeyword | 
  TrueBoolean |
  FalseBoolean 
  , { type: string }
>;

type BaseKeyword = {
  infix?: boolean,
  prefix?: boolean,
}

type AndKeyword =  { 
  type: 'and', 
  literal: 'and' 
};

type NotKeyword = { 
  type: 'not', 
  literal: 'not', 
  prefix: true, 
  infix: true 
};

type InKeyword = { 
  type: 'in', 
  literal: 'in' 
};

type OrKeyword = { 
  type: 'or', 
  literal: 'or' 
};

// let me work with these for a minute...
type TrueBoolean = { type: 'boolean', literal: 'true' };
type FalseBoolean = { type: 'boolean', literal: 'false' };

const KeywordMap: Record<string, Keyword> = {
  'and': { type: 'and', literal: 'and' },
  'not': { type: 'not', literal: 'not', prefix: true, infix: true },
  'in': { type: 'in', literal: 'in' },
  'or': { type: 'or', literal: 'or' },
  'true': { type: 'boolean', literal: 'true' },
  'false': { type: 'boolean', literal: 'false' },
};

export { Keyword, Token, KeywordMap, TokenMap };
