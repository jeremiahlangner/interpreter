import test from 'node:test';
import assert from 'assert';
import Evaluator from './eval';

let rather = new Evaluator();

test('Lexer should fail to generate tokens for invalid syntax', async t => {
  await t.test('An unrecognized token should log an error and return no value.', () => {
    assert.strictEqual(rather.eval(';'), undefined);
    assert.strictEqual(rather.eval('!'), undefined);
    assert.strictEqual(rather.eval('|'), undefined);
  });
});

test('Evaluator should evaluate string, boolean, number, and list literals.', async t => {
  await t.test('The string "42" should evaluate to the number 42.', () => {
    assert.strictEqual(rather.eval('42'), 42);
  });

  await t.test('The string "true" should evaluate to a true boolean value.', () => {
    assert.strictEqual(rather.eval('true'), true);
  });

  await t.test('The string "false" should evaluate to the number false boolean value.', () => {
    assert.strictEqual(rather.eval('false'), false);
  });

  await t.test('The string "this is a string" should evaluate to the string literal "this is a string".', () => {
    assert.strictEqual(rather.eval('"this is a string"'), "this is a string");
  });
  
  await t.test("The string 'this is a string' should evaluate to the string literal 'this is a string'.", () => {
    assert.strictEqual(rather.eval("'this is a string'"), 'this is a string');
  });
  
  await t.test('The string "[1, "string", true]" should evaluate to the list literal [1, "string", true].', () => {
    const list = rather.eval('[1, "string", true]');
    assert.strictEqual(Array.isArray(list), true);
    assert.strictEqual(list.length, 3);
    assert.strictEqual(list[0], 1);
    assert.strictEqual(list[1], "string");
    assert.strictEqual(list[2], true);
  });
});

test('Evaluator should evaluate number expressions using arithmetic operators to number literals.', async t => {
  await t.test('1 + 1 should equal 2.', () => {
    assert.strictEqual(rather.eval('1 + 1'), 2);
  });

  await t.test('1 - 1 should equal 0.', () => {
    assert.strictEqual(rather.eval('1 - 1'), 0);
  });

  await t.test('1 * 1 should equal 1.', () => {
    assert.strictEqual(rather.eval('1 * 1'), 1);
  });

  await t.test('1 / 1 should equal 1.', () => {
    assert.strictEqual(rather.eval('1 / 1'), 1);
  });

  await t.test('-1 / 1 should equal -1.', () => {
    assert.strictEqual(rather.eval('-1 / 1'), -1);
  });
});

test('Evaluator should evaluate logical operators properly within simple logical expressions.', async t => {
  await t.test('Simple boolean expressions using and should evaluate to their logical boolean values.', () => {
    assert.strictEqual(rather.eval('true and true'), true);
    assert.strictEqual(rather.eval('false and false'), false);
    assert.strictEqual(rather.eval('not false and true'), true);
    assert.strictEqual(rather.eval('false and not true'), false);
    assert.strictEqual(rather.eval('not true and not true'), false);
    assert.strictEqual(rather.eval('not false and not false'), true);
  });

  await t.test('Simple boolean expressions using or should evaluate to their logical boolean values.', () => {
    assert.strictEqual(rather.eval('true or true'), true);
    assert.strictEqual(rather.eval('false or false'), false);
    assert.strictEqual(rather.eval('not false or true'), true);
    assert.strictEqual(rather.eval('false or not true'), false);
    assert.strictEqual(rather.eval('not true or not true'), false);
    assert.strictEqual(rather.eval('not false or not false'), true);
  });
});

test('Evaluator should evaluate comparisons to boolean values.', async t => {
  await t.test('Simple equality expressions using "=" should return a boolean', () => {
    assert.strictEqual(rather.eval('4 = 4'), true);
    assert.strictEqual(rather.eval('4 = 5'), false);
  });
  
  await t.test('Simple inequality expressions using "not" should return an expected boolean', () => {
    assert.strictEqual(rather.eval('not (4 = 4)'), false);
    assert.strictEqual(rather.eval('not (4 = 5)'), true);
  });
  
  await t.test('Simple equality expressions using ">" and "<" should return a boolean', () => {
    assert.strictEqual(rather.eval('4 > 4'), false);
    assert.strictEqual(rather.eval('5 > 4'), true);
    assert.strictEqual(rather.eval('4 < 4'), false);
    assert.strictEqual(rather.eval('4 < 5'), true);
    assert.strictEqual(rather.eval('4 > 5'), false);
    assert.strictEqual(rather.eval('4 >= 5'), false);
    assert.strictEqual(rather.eval('4 <= 4'), true);
    assert.strictEqual(rather.eval('4 <= 5'), true);
    assert.strictEqual(rather.eval('5 >= 5'), true);
    assert.strictEqual(rather.eval('5 >= 4'), true);
  });
});

test('Evaluator should evaluate parenthetical expressions correctly.', async t => {
  await t.test('Evaluator should evaluate literals contained in parentheses.', () => {
    assert.strictEqual(rather.eval('(4)'), 4);
    assert.strictEqual(rather.eval('("string")'), "string");
    assert.strictEqual(rather.eval("('string')"), "string");
    assert.strictEqual(rather.eval('(true)'), true);
    assert.strictEqual(rather.eval('(false)'), false);
    assert.strictEqual(rather.eval('([1])')[0], 1);
    assert.strictEqual(rather.eval('(1,2,3,4)')[0], 1);
  });

  await t.test('Evaluator should evaluate parenthetical expressions before operators of lower precedence.', () => {
    assert.strictEqual(rather.eval('(4 * 5) + 1'), 21);
    assert.strictEqual(rather.eval('(4 + 5) * 2'), 18);
  });

  await t.test('Evaluator should evaluate nested parenthetical expressions.', () => {
    assert.strictEqual(rather.eval('((4 * 5) - 1) + 1'), 20);
  });
});

test('Evaluator should evaluate date strings as numbers.', async t => {
  await t.test('Evaluator should evaluate dates from apparent date strings', () => {
    assert.strictEqual((rather.eval('date("3/3/1988")') / 1e9).toFixed(), ((new Date('3/3/1988')).valueOf() / 1e9).toFixed());
    assert.strictEqual((rather.eval('date("March 3, 1988")') / 1e9).toFixed(), ((new Date('March 3, 1988')).valueOf() / 1e9).toFixed());
  });

  await t.test('Evaluator should evaluate pre-specified relative dates', () => {
    // TODO: do correct date math to find correct date ranges.
    assert.strictEqual((rather.eval('date("now")') / 1e9).toFixed(), ((new Date()).valueOf() / 1e9).toFixed());
    // assert.strictEqual((rather.eval('date("today")') / 1e9).toFixed(), ((new Date()).valueOf() / 1e9).toFixed());
  });
});

test('Evaluator should find objects using comparative expressions', async t => {
  await t.test('Evaluator should find values that match conditions and return true.', () => {
    rather.data = { obj: [ {foo: 'bar', baz: 'lur'}, {foo: 'bar'}, { foo: 'd'} ]};
    assert.strictEqual(rather.eval('find(obj, true)'), true);
    assert.strictEqual(rather.eval('find(obj, foo = "bar")'), true);
    assert.strictEqual(rather.eval('find(obj, foo = "bar" and baz = "lur")'), true);
    assert.strictEqual(rather.eval('find(obj, (foo = "bar") and (baz = "test"))'), false);
    rather.data = { obj: [ 'foo', 'bar', 'baz' ] };
    assert.strictEqual(rather.eval('find(obj, $ = "foo")'), true);
    assert.strictEqual(rather.eval('find(obj, $ = "baz")'), true);
    assert.strictEqual(rather.eval('find(obj, $ = "not a value")'), false);
    rather.data = { foo: 'bar', bar: 'baz', baz: true };
    assert.strictEqual(rather.eval('find($, $ = true)'), true);
    assert.strictEqual(rather.eval('find($, $ = "bar")'), true);
    assert.strictEqual(rather.eval('find($, $ = "baz")'), true);
    assert.strictEqual(rather.eval('find($, $ = false)'), false);
  });
  
  await t.test('Evalutator should return false for too few arguments for find.', () => {
    assert.strictEqual(rather.eval('find()'), false);
    assert.strictEqual(rather.eval('find($ = true)'), false);
  });
});

test('Evaluator should parse and evaluate assigned data, identifier, and index expressions.', async t => {
  await t.test('Evaluator should evaluate data from path identifiers.', () => {
    let rather = new Evaluator({ test1: 1, test2: "string", test3: [1, true, ['test']], test4: { test5: 0 } });
    assert.strictEqual(rather.eval('test1'), 1);
    assert.strictEqual(rather.eval('test2'), "string");
    assert.strictEqual(rather.eval('test3[1]'), true);
    assert.strictEqual(rather.eval('test3[2][0]'), 'test');
    assert.strictEqual(rather.eval('test4["test5"]'), 0);
    assert.strictEqual(rather.eval('test4.test6'), undefined);
    rather.data = { five: { a: [1,2,3,{ b: 'foo'},{ b: 'bar'} ] } };
    assert.strictEqual(rather.eval('five["a"][?]["b"] = "foo"'), true);
    assert.strictEqual(rather.eval('five["a"][?]["b"] = "bar"'), true);
    assert.strictEqual(rather.eval('five["a"][?]["b"] = "baz"'), false);
  });

  await t.test('Evaluator should parse JSON strings to data.', () => {
    let rather = new Evaluator('{ "test1": "test" }');
    assert.strictEqual(rather.eval('test1'), 'test');
    rather = new Evaluator('bad json'); 
    assert.strictEqual(rather.eval('test1'), undefined);
  });
});

test('Evaluator should evaluate and reference rules assigned in a ruleset.', async t => {
  await t.test('Evaluator should parse JSON string rules.', () => {
    const rather = new Evaluator({test: 'data'}, '{"test": "true", "test1": "(4 + 5) >= 9", "test2": ":test + \'string\'"}');
    assert.strictEqual(rather.eval(':test'), true);
    assert.strictEqual(rather.eval(':test1'), true);
    assert.strictEqual(rather.eval(':test2'), 'truestring');
  });
});

