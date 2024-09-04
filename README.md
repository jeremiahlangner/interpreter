# Rather 

Rather is a simple expression evaluator.

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
  { rule1: 'some not = data', rule2: ':rule1 and (here = baz)' }
);
const result = rather.eval(':rule1 and :rule2'); // returns true
```

