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

Data paths are indicated by text values with dot notation.

### Example
```
some_root.some_SubRoot.someVar
```

The left-most name indicates the root of the data object.

Lists are represented with bracket notation. The brackets may include a number
to indicate an item at a specific location in a list or be empty to reference
a current item in an iteration.

Lists are 0-indexed. (The first item starts at index 0, the second and 1, and 
so on.)

### Example
```
some_list.[3].someVar  <-- Represents someVar of the fourth item in some_list.
some_list.[].someVar <-- Represents someVar of the current item in an iteration of some_list.
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
statements. non-mathematical use of operators is indicated in their
descriptions.

|Operator|Name|Description|
|---|---|---|
|+| plus | Mathematically represents an addition operation.|
|-| minus | Mathematically indicates a subtraction operation. |
|*| multiply | Mathematically represents a multiplication operation |
|/| divide | Mathematically represents a division operation |


### Keywords

Keywords are words that represent logical connections within a comparison
statement.

|Keyword|Name|Description|
|---|---|---|
| and | and | Joins two or more conditional statements and requires all to be true to satisfy a logical condition. |
| or | or | Represents a logical or condition among two or more conditional statements. |
| not| not | Indicates a negation of a condition or statement. |
| in | in | A comparative keyword that allows for checking whether an item exists in a list or a set of characters appears in a text string |
| true | true | Indicates a truthy condition. |
| false | false | Indicates a truthy condition. |



### Symbols

Symbols correlate almost directly to punctuation in most languages. 

|Symbol|Name|Description|
|---|---|---|
|,| comma | Separates items in lists. |
|[| left bracket | Denotes the beginning of a list. |
|]| right bracket | Denotes the end of a list |
|"| quote | Indicates the beginning or ending of a text value |
|(| left parentheses | Indicates the beginning of a group of conditional
statements. Signifies a group of conditions that must be evaluated prior to
evaluation of an entire conditional statement. |
|(| right parentheses | Indicates the end of a group of conditional
statements. Signifies a group of conditions that must be evaluated prior to
evaluation of an entire conditional statement. |
|:| colon | When prefixing a text value indicates a reference to a named 
pre-defined rule or condition. |


### Strings

When checking for equality, text values must be enclosed in double-quoted strings.

Example: "This is a string" = "This is a string"


### Numbers

The following are "proper" numbers.

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


### Examples

Number Comparison
```JSON
{
  "rulename": "data.number_variable > 1234"
}
```

