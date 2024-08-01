import { Token, tokens, keywords } from './token';

export default class Lexer {
  ch: string;
  input: string;
  position: number = 0;
  readPosition: number = 0;

  constructor() {
    this.ch = '';
    this.input = '';
  }

  public lex(input: string) {
    this.ch = '';
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
    this.readChar();
  }

  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = '';
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  public nextToken(): Token | undefined {
    let token;

    this.skipWs();

    if (this.ch in tokens) {
      const ch = this.peekChar();
      if (`${this.ch}${ch}` in tokens) {
        const position = this.position;
        this.readChar();
        token = tokens[this.input.slice(position, this.position + 1)];
      } else {
        token = tokens[this.ch];
      }
    } else if (this.ch === '') {
      return;
    } else if (this.ch === '"') {
      token = { type: 'string', literal: this.readString() };
    } else if (letter(this.ch)) {
      const ch = this.peekChar();
      if (letter(ch as string) || ws(ch as string) || typeof ch === 'undefined') {
        const literal = this.readIdentifier();
        const type = this.lookupKeyword(literal);
        token = { type, literal };
      }
    } else if (digit(this.ch)) {
      const ch = this.peekChar();
      if (digit(ch as string) || ws(ch as string) || typeof ch === 'undefined') {
        token = { type: 'number', literal: this.readNumber() };
      }
    } else {
      console.log('Syntax Error at position:', this.position);
      console.log('- Unrecognized character:', this.ch);
    }

    this.readChar();
    return token;
  }

  private readIdentifier(): string {
    const position = this.position;
    while (letter(this.ch)) {
      this.readChar();
    }
    const ident = this.input.slice(position, this.position); 
    this.position--;
    this.readPosition--;
    return ident; 
  }

  private readNumber(): string {
    const position = this.position;
    while (digit(this.ch)) {
      this.readChar();
    }
    const num = this.input.slice(position, this.position);
    this.position--;
    this.readPosition--;
    return num;
  }

  private skipWs() {
    while (ws(this.ch)) {
      this.readChar();
    }
  }

  private readString(): string {
    const position = this.position;
    do {
      this.readChar();
      console.log(this.ch);
    } while(this.ch !== '"' && this.readPosition < this.input.length);
    return this.input.slice(position + 1, this.ch == '"' ? this.position : this.readPosition);
  }

  private peekChar(): string | undefined {
    if (this.readPosition >= this.input.length) {
      return;
    } else {
      return this.input[this.readPosition];
    }
  }

  private lookupKeyword(ident: string): string | undefined {
    if (keywords[ident]) return keywords[ident].type;
    return 'ident';
  }
}

function ws(ch: string): boolean {
  return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' ;
}

function letter(ch: string): boolean {
  return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_' || ch === '.';
}

function digit(ch: string): boolean {
  return '0' <= ch && ch <= '9' || ch === '.';
}

