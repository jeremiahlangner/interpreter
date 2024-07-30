import readline from 'readline';
import Lexer from './lexer';

const Prompt = '>> ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getInput() {
  rl.question(Prompt, line => {
    const lexer = new Lexer(line);

    let token;
    do {
      token = lexer.nextToken();
      console.log('token', token);
    } while (token);

    getInput();
  });
}

getInput();

