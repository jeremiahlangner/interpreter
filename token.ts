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

type CommaToken = { 
  type: 'comma', 
  literal: ',' 
};

type LBracketToken = { 
  type: 'lbracket', 
  literal: '[' 
};

type RBracketToken = { 
  type: 'rbracket', 
  literal: ']' 
};

type LParenToken = { 
  type: 'lparen', 
  literal: '(' 
};

type RParenToken = { 
  type: 'rparen', 
  literal: ')' 
};

type EqualsToken = { 
  type: 'equals', 
  literal: '=',
  infix: true,
};

type PlusToken = { 
  type: 'plus', 
  literal: '+',
  infix: true,
};

type MinusToken = { 
  type: 'minus', 
  literal: '-', 
  prefix: true, 
  infix: true, 
};

type LTToken = { 
  type: 'lessthan', 
  literal: '<',
  infix: true, 
};

type GTToken = { 
  type: 'greaterthan', 
  literal: '>',
  infix: true, 
};

type GTEqualToken = { 
  type: 'greaterthanorequal', 
  literal: '>=',
  infix: true, 
};

type LTEqualToken = { 
  type: 'lessthanorequal', 
  literal: '<=',
  infix: true, 
};

type MultiplyToken =  { 
  type: 'multiply', 
  literal: '*',
  infix: true, 
};

type DivideToken = { 
  type: 'divide', 
  literal: '/',
  infix: true, 
};

type StringToken = { 
  type: 'string', 
  literal: string, 
};

type NumberToken = { 
  type: 'number', 
  literal: string, 
  prefix: true, 
};


type IdentifierToken = { 
  type: 'ident', 
  literal: string, 
  prefix: true,
};

type ReferenceToken = { 
  type: 'ref', 
  literal: ':', 
  prefix: true,
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
