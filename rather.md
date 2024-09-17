# Rather

"Rather" inherited its name because I would "rather" write a few simplified 
localized comparisons with pre-loaded static data than create discrete api 
calls for configurable conditional statements in a single-page application.

Rather is a simple form of notation to succinctly compare data values in a 
business context. It is a simple expression evaluator for a simplified
expression based language.

Its goal is to enable savvy clients to manage and update business logic for 
pre-existing data points with minimal technical attention.

Comparisons represented in Rather should be easily understandable for a layman
using language and syntax that is succinct, sufficiently abstract, and commonly
accepted.

Rather is not a complete language, but a language subset intended for writing
comparisons.

## Data Paths

A Rather evaluator accepts data either as a JavaScript Object or JSON string.
If data is passed as a string, it is first parsed into a JavaScript Object.

Each instance of an evaluator may have a new data object supplied.

Data paths are indicated by text values with dot notation or bracket index
syntax.

Data paths using dot notation  may only include upper and lowercase letters, 
underscores, and numbers.

Bracket indexes, except when referencing array indexes must be enclosed in 
quoted strings. Data paths that start using bracket syntax must use bracket
syntax consistently.

Data paths may not start with numbers. (e.g. `1test_var` is not a valid path
name.)

### Example
```
some_root.some_SubRoot.someVar
foo['bar'][0]['baz']

```

The left-most name indicates the root of the data object.

Lists are represented with bracket notation. The brackets may include a number
to indicate an item at a specific location in a list. Rather interprets a
question mark within brackets to find an object with any keys following.

Lists are 0-indexed. (The first item starts at index 0, the second and 1, and 
so on.)

### Example
```
some_list[3]['someVar']  <-- Represents someVar of the fourth item in some_list.
some_list[?]['someVar'] <-- Represents a list of all values of someVar for objects in a list.
```

## Syntax

Simplicity is the core of Rather's syntax. It is meant to be quite close to 
plain English. Commonly accepted symbolic substitutes are included for 
comparators such as mathematical symbols to provide more succinct
representation of comparison statements.

All keywords, references, and operators must be separated by at least one space
character. Symbols may be used without white space separators.

### Comparison Operators

Comparison operators allow for the construction of rule statements presenting a
truthy result. For non-mathematical values, see note about values below.

|Operator|Name|Description|
|---|---|---|
| = | equals | Checks for equality on both sides of a statement |
| &gt; | greater than | Checks that the left side of a statement maintains a greater value than the right side |
| &lt; | less than | Checks that the left side of a statement maintains a lesser value than the right side |
| &gt;= | greater than or equal to | Checks that the left side of a statement maintains a value greater than or equal to the right side of a conditional statement. |
| &lt;= | less than or equal to | Checks that the left side of a statement maintains a value leser than or equal to the right side of a conditional statement. |


### Active Operators

Active operators allow for modification to values or data within comparison
statements. Non-mathematical use of operators, if available is indicated in their
descriptions.

|Operator|Name|Description|
|---|---|---|
| + | plus | Mathematically represents an addition operation.|
| - | minus | Mathematically indicates a subtraction operation. |
| * | multiply | Mathematically represents a multiplication operation |
| / | divide | Mathematically represents a division operation |


### Keywords

Keywords are words that represent logical connections within a comparison
statement.

|Keyword|Name|Description|
|---|---|---|
| $ | root | Represents the root level value of the data in the Evaluator. |
| and | and | Joins two or more conditional statements and requires all to be true to satisfy a logical condition. |
| or | or | Represents a logical or condition among two or more conditional statements. |
| not| not | Indicates a negation of a condition or statement. |
| in | in | A comparative keyword that allows for checking whether an item exists in a list or a set of characters appears in a text string |
| true | true | Indicates a truthy condition. |
| false | false | Indicates a truthy condition. |
| date | date | Allows for assignment of date values. (See examples for more information.) |
| find | find | Allows one to conditionally evaluate an item from a list |

#### A note about "not"

Because "not" functions as a prefix in Rather, not cannot be used in conjunction
with infix operators such as "=" directly. `not =` is not a proper operator in 
Rather. To create an inequality expression prefix an equality expresssion with
"not". 

Example
```
not(a = b) <-- is the same as "a != b"
```

#### Dates

Dates are evaluated to epochal numeric values in milliseconds. Dates are best
represented using a date function syntax. (Though date is technically a prefix.)

Because dates are translated to numeric values they may be manipulated with 
mathematical expressions.

Dates may be created using either date strings or number values.

A few reserved strings are useful for creating relative comparisons.

|String|Description|
|---|---|
| now | Represents the current moment |
| today | 00:00 in local time of the current day |

The following will all evaluate to valid dates. Many different formats are 
acceptable, but if using numeric values, remember to represent the date in 
milliseconds.

Example
```
date("12/12/2024")

date(1724952610771)

date("Thu Aug 29 2024 10:30:44 GMT-0700")

date("2024-08-29T17:32:51.802Z")

date("now")

date("today")
```

The following are examples of ways to manipulate dates using mathematical
expressions. 

Example
```
date("12/12/2024") + 1000 <-- adds a second to the date.

date(1724952644000 + (60 * 60 * 1000)) <-- use numeric values for larger time intervals

```

#### Find

Check for the existence of objects or data values  matching expressions.

A `find` function must include two arguments. 1. A list that may or may not contain an object
matching an expression, and 2. a matching expression.

Find can evaluate lists, objects, and strings. 

For strings `find` matches individual characters against the expression argument.

For lists `find` matches against each list value. `find` may be read as 'return
true if an item in a list matches the expression argument'.

For object `find` matches against the values of each key. `find` may be read as 
'return true if the value of a key matches the expression';

`find` returns `true` for only the first object found matching the expression argument.

The properties referenced in the expression argument are rooted to the object
under consideration. For example, for the list `[ { foo: 'bar'}, { bar: 'baz' } ]`
The expression can reference the properties `foo` and `bar` directly, rather
than using index notation for the lists.

In the following example, some_list = [ { property_1: 'foo', property_2: 'bar'} ].

Example
```
find(some_list, property_1 = 'foo' and property_2 = 'bar') <-- returns `true` if an object in some_list has the properties property_1 equal to 'foo' and property_2 equal to 'bar'
```


### Symbols

Symbols correlate to punctuation in most languages. 

|Symbol|Name|Description|
|---|---|---|
| , | comma | Separates items in lists. |
| [ | left bracket | Denotes the beginning of a list. |
| ] | right bracket | Denotes the end of a list |
| " | quote | Indicates the beginning or ending of a text value |
| ' | quote | Indicates the beginning or ending of a text value |
| ( | left parentheses | Indicates the beginning of a group of conditional statements. Signifies a group of conditions that must be evaluated prior to evaluation of an entire conditional statement. Indicates the beginning of a comma separated list if longer than one item. |
| ) | right parentheses | Indicates the end of a group of conditional statements. Signifies a group of conditions that must be evaluated prior to evaluation of an entire conditional statement. |
| : | colon | When prefixing a text value indicates a reference to a named pre-defined rule or condition. |
| - | minus | When prefixing a data path or number, the minus symbol will represent its negative value. |

#### References

The evaluated value of an existing rule may be referenced by the use of a colon
prefixing the rule name from a ruleset supplied to the application. This is
useful for succinctly stating expressions that require multiple conditions to
be true.

Example
```
(:rule1 and :rule2) or some_var >= 5
```

The above example would require both rule1 and rule2 to evaluate to 'true' or 
some_var to be greater than or equal to 5 in order to evaluate as 'true'.

#### Lists

Lists may contain strings, numbers, boolean values, data paths, and even other
expressions. Expressions will of course evaluate to boolean values, and may be
better expressed through the use of rules.


### Strings

When checking for equality, text values must be enclosed in quotes.

Example
```
"This is a string" = "This is a string"
'This is a string' = 'This is a string'
```

### Numbers

Numbers may be integers or decimal values. Negative values are also acceptable.

The following numbers are in the correct format and will be successfully evaluated.

```
5 

0.5

1000.0
```

Decimal numbers must begin with a number or `0`; they cannot start with `.`.

Numbers cannot contain commas.

The following numbers will not be processed correctly.

```
.5

1,000,000
```


### Comparing Non-mathematical Values

Rather resolves sides of expressions to three primary data types, strings,
numbers, and booleans.


#### Examples

Number Comparison
```
data.number_variable > 1234
```

String comparisons check for exact correspondence. 

Strings
```
"String" = "String" <-- is 'true'
"string" = "StrInG" <-- is 'false'
```

