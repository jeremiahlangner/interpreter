import readline from 'readline';
import Lexer from './lexer';

const Prompt = '>> ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
    
const lexer = new Lexer();

function getInput() {
  rl.question(Prompt, line => {
    lexer.lex(line);

    let token;
    do {
      token = lexer.next();
      console.log('token', token);
    } while (token);

    getInput();
  });
}

getInput();

