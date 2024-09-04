# Rather 

Rather is a simple expression evaluator.

Syntax documentation and reference can be found in the file rather.md.

---

## Installation

```bash
npm i rather
```


## Usage 

Import Rather from the library.

```TypeScript
import Rather from 'rather';
```


Instantiate a new instance.

```TypeScript
const rather = new Rather();
```


Evaluate an expression.

```TypeScript
const result = rather.eval('4 <= 5');
console.log(result); // logs 'true'
```

### Data and Rule Sets

Add user specified data to the evaluation context. And reference the data in 
expressions by dot-notated paths.

```TypeScript
const rather = new Rather({ some: 'foo', data: 'bar', here: 'baz' });
const result = rather.eval('some == "foo"'); // returns true
```


Use rules to allow for and store more complex expressions.

```TypeScript
const rather = new Rather(
  { some: 'foo', data: 'bar', here: 'baz' },
  { rule1: 'not (some = data)', rule2: ':rule1 and (here = "baz")' }
);
const result = rather.eval(':rule1 and :rule2'); // returns true
```

### Repl

Rather comes packaged with a basic repl to test and evaluate expressions.

To run the repl, navigate to the lib's directory and run the following command:

```bash
npm start
```

To exit the repl type `exit` or press `^C`.

To add a rule set to the repl compile the rules in a JSON object and type the
following command:

```
>> repl.data = <JSON string of rules>
```

To assign data to the repl execution context, compile the data as a JSON string
and type the following command at the repl prompt:

```
>> repl.data = <JSON string of data>
```


## Unit Tests

Run the test suite using the following command:

```bash
npm test
```


## Acknowledgements

Much of the code here is produced with reference to Robert Nystrom's Crafting
Interpreters and Thorsten Ball's Writing an Interpreter in Go.
