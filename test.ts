import assert from 'assert';

import Lexer from './lexer';
import { 
  Parser, 
  LiteralExpression,
  PrefixExpression,
  InfixExpression,
} from './parser';

import { Eval } from './eval';

// Parser Tests
const lexer = new Lexer();
const parser = new Parser(lexer);
const evaluator = new Eval(lexer, parser);

lexer.lex('5');
assert((parser.parse() as LiteralExpression).value == 5);

lexer.lex('5.12345');
assert((parser.parse() as LiteralExpression).value == 5.12345);

lexer.lex('some_identifier');
assert((parser.parse() as LiteralExpression).value == 'some_identifier');

lexer.lex('-5');
assert(parser.parse()!.token.literal == '-');

lexer.lex('not some_identifier');
assert(parser.parse()!.token.literal == 'not');

lexer.lex('4 + 5');
assert((parser.parse() as InfixExpression).operator == '+');

lexer.lex('some_identifier - 45');
assert((parser.parse() as InfixExpression).operator = '-');

lexer.lex('5 * -45');
assert((parser.parse() as InfixExpression).operator == '*');

lexer.lex('0 / 12');
assert((parser.parse() as InfixExpression).operator == '/');

lexer.lex('0 * 5');
const exp = parser.parse();
console.log(evaluator.evaluate(exp!));

/*
lexer.lex('3 + (1 + (2 + 3)) = 4');
console.log(JSON.stringify(parser.parse(), null, ' '));

lexer.lex('true');
console.log(parser.parse());

lexer.lex('"this is a string" = 5');
console.log(parser.parse());

lexer.lex('["this is a list", "testing", 5]');
console.log(parser.parse());

lexer.lex('4 in [1, 2,3, 4]');
console.log(parser.parse());
*/


