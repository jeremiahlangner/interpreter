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
  ListLiteral |
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
};

type PlusToken = { 
  type: 'plus', 
  literal: '+',
};

type MinusToken = { 
  type: 'minus', 
  literal: '-', 
};

type LTToken = { 
  type: 'lessthan', 
  literal: '<',
};

type GTToken = { 
  type: 'greaterthan', 
  literal: '>',
};

type GTEqualToken = { 
  type: 'greaterthanorequal', 
  literal: '>=',
};

type LTEqualToken = { 
  type: 'lessthanorequal', 
  literal: '<=',
};

type MultiplyToken = { 
  type: 'multiply', 
  literal: '*',
};

type DivideToken = { 
  type: 'divide', 
  literal: '/',
};

type IdentifierToken = { 
  type: 'ident', 
  literal: string, 
};

type ReferenceToken = { 
  type: 'ref', 
  literal: ':', 
};

type StringLiteral = { 
  type: 'string', 
  literal: string, 
};

type NumberLiteral = { 
  type: 'number', 
  literal: string, 
};

type ListLiteral = {
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

type DateKeyword = {
  type: 'date',
  literal: 'date',
}

type AndKeyword = { 
  type: 'and', 
  literal: 'and' 
};

type NotKeyword = { 
  type: 'not', 
  literal: 'not', 
};

type InKeyword = { 
  type: 'in', 
  literal: 'in' 
};

type OrKeyword = { 
  type: 'or', 
  literal: 'or' 
};

type True = { 
  type: 'boolean', 
  literal: 'true', 
};

type False = { 
  type: 'boolean', 
  literal: 'false',
};

const KeywordMap: Record<string, Keyword> = {
  'and': { type: 'and', literal: 'and', infix: true },
  'not': { type: 'not', literal: 'not', prefix: true, infix: true },
  'in': { type: 'in', literal: 'in', infix: true },
  'or': { type: 'or', literal: 'or', infix: true },
  'true': { type: 'boolean', literal: 'true', prefix: true },
  'false': { type: 'boolean', literal: 'false', prefix: true },
  'date': { type: 'date', literal: 'date', prefix: true, },
};

export { Keyword, Token, KeywordMap, TokenMap };
