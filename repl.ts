import readline from 'readline';
import Lexer from './lexer';
import { Parser }from './parser';
import { Eval }from './eval';

const Prompt = '>> ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
    
const lexer = new Lexer();
const parser = new Parser(lexer);
const evaluator = new Eval(lexer, parser);

function getInput() {
  rl.question(Prompt, line => {
    lexer.lex(line);
    const exp = parser.parse();
    console.log(evaluator.evaluate(exp!));
    getInput();
  });
}

getInput();

