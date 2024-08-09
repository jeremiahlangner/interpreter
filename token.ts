type Token = BaseToken & Extract<
  CommaToken |  
  LBracketToken |
  RBracketToken |
  LParenToken | 
  RParenToken |  
  EqualsToken |  
  ColonToken |
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
  EOFToken |
  IdentifierToken
, { type: string }>;

type BaseToken = { type: string, literal: string };
type CommaToken = { type: 'comma', literal: ',' };
type LBracketToken = { type: 'lbracket', literal: '[' };
type RBracketToken = { type: 'rbracket', literal: ']' };
type LParenToken = { type: 'lparen', literal: '(' };
type RParenToken = { type: 'rparen', literal: ')' };
type EqualsToken = { type: 'equals', literal: '=' };
type ColonToken = { type: 'colon', literal: ':' };
type PlusToken = { type: 'plus', literal: '+' };
type MinusToken = { type: 'minus', literal: '-' };
type LTToken = { type: 'lessthan', literal: '<' };
type GTToken = { type: 'greaterthan', literal: '>' };
type GTEqualToken = { type: 'greaterthanorequal', literal: '>=' };
type LTEqualToken = { type: 'lessthanorequal', literal: '<=' };
type MultiplyToken =  { type: 'multiply', literal: '*' };
type DivideToken = { type: 'divide', literal: '/' };
type StringToken = { type: 'string', literal: string, };
type NumberToken = { type: 'number', literal: string, };
type EOFToken = { type: 'eof', literal: string, };
type IdentifierToken = { type: 'ident', literal: string, };

const TokenMap: Record<string, Token> = {
  ',': { type: 'comma', literal: ',' },
  '[': { type: 'lbracket', literal: '[' },
  ']': { type: 'rbracket', literal: ']' },
  '(': { type: 'lparen', literal: '(' },
  ')': { type: 'rparen', literal: ')' },
  '=': { type: 'equals', literal: '=' },
  ':': { type: 'colon', literal: ':' },
  '+': { type: 'plus', literal: '+' },
  '-': { type: 'minus', literal: '-' },
  '<': { type: 'lessthan', literal: '<' },
  '>': { type: 'greaterthan', literal: '>' },
  '>=': { type: 'greaterthanorequal', literal: '>=' },
  '<=': { type: 'lessthanorequal', literal: '<=' },
  '*': { type: 'multiply', literal: '*' },
  '/': { type: 'divide', literal: '/' },
};

type Keyword = Extract<
  AndKeyword |
  NotKeyword |
  InKeyword |
  OrKeyword | 
  TrueBoolean |
  FalseBoolean 
  , { type: string }
>;

type AndKeyword =  { type: 'and', literal: 'and' };
type NotKeyword = { type: 'not', literal: 'not' };
type InKeyword = { type: 'in', literal: 'in' };
type OrKeyword = { type: 'or', literal: 'or' };

// These should perhaps be binary expressions
type TrueBoolean = { type: 'boolean', literal: 'true' };
type FalseBoolean = { type: 'boolean', literal: 'false' };

const KeywordMap: Record<string, Keyword> = {
  'and': { type: 'and', literal: 'and' },
  'not': { type: 'not', literal: 'not' },
  'in': { type: 'in', literal: 'in' },
  'or': { type: 'or', literal: 'or' },
  'true': { type: 'boolean', literal: 'true' },
  'false': { type: 'boolean', literal: 'false' },
};

export { Keyword, Token, KeywordMap, TokenMap };
