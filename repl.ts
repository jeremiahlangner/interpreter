import readline from 'readline';
import Lexer from './lexer';
import { Parser }from './parser';
import { Eval }from './eval';

const Prompt = '>> ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
    
let data: any;
let rules: any;
const lexer = new Lexer();
const parser = new Parser(lexer);
let evaluator = new Eval(lexer, parser, data, rules);

function getInput() {
  rl.question(Prompt, line => {
    if (!getCommand(line)) {
      lexer.lex(line);
      const exp = parser.parse();
      console.log(exp);
      console.log(evaluator.evaluate(exp!));
    }
    getInput();
  });
}

function getCommand(line: string) {
  const cmd = line.split('\n')[0];
  
  if (cmd === 'exit') {
    console.log('Thanks for playing!');
    return process.exit(0);
  }
  
  if (cmd.includes('repl.data = ')) {
    data = cmd.split('repl.data = ')[1];
    console.log('Setting repl data to', data);
    evaluator = new Eval(lexer, parser, data, rules);
    return true;
  }

  if (cmd.includes('repl.rules = ')) {
    rules = cmd.split('repl.rules = ')[1];
    console.log('Setting repl rules to', rules);
    evaluator = new Eval(lexer, parser, data, rules);
    return true;
  }
}

getInput();

