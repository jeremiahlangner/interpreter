import readline from 'readline';
import Evaluator from './eval';

const Prompt = '>> ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
    
let data: any;
let rules: any;
let evaluator = new Evaluator(data, rules);

// Evaluate by line.
function getInput() {
  rl.question(Prompt, line => {
    if (!getCommand(line)) {
      console.log(evaluator.eval(line));
    }
    getInput();
  });
}

function getCommand(line: string) {
  const cmd = line.split('\n')[0];
  
  // Exit.
  if (cmd === 'exit') {
    console.log('Thanks for playing!');
    return process.exit(0);
  }
  
  // Assign data using JSON string value.
  if (cmd.includes('repl.data = ')) {
    data = cmd.split('repl.data = ')[1];
    console.log('Setting repl data to', data);
    evaluator = new Evaluator(data, rules);
    return true;
  }

  // Assign rule set using JSON string value.
  if (cmd.includes('repl.rules = ')) {
    rules = cmd.split('repl.rules = ')[1];
    console.log('Setting repl rules to', rules);
    evaluator = new Evaluator(data, rules);
    return true;
  }
}

getInput();

