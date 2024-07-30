import Token from './token';
import { tokens, keywords } from './token';

export default class Lexer {
  input: string;
  position: number = 0;
  readPosition: number = 0;
  ch: string;

  constructor(input: string) {
    this.input = input;
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

  public nextToken(): string | Token | undefined {
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
    } else if (letter(this.ch)) {
      const literal = this.readIdentifier();
      const type = this.lookupKeyword(literal);
      token = { type, literal };
    } else if (digit(this.ch)) {
      token = { type: 'digit', literal: this.readNumber() };
    } else {
      throw Error(`Token not identifiable at position ${this.position}`);
    }

    this.readChar();
    return token;
  }

  private readIdentifier(): string {
    const position = this.position;
    while (letter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  private readNumber(): string {
    const position = this.position;
    while (digit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  private skipWs() {
    while (this.ch === ' ' || this.ch === '\t' || this.ch === '\n' || this.ch === '\r') {
      this.readChar();
    }
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

function letter(input: string): boolean {
  return 'a' <= input && input <= 'z' || 'A' <= input && input <= 'Z' || input == '_';
}

function digit(input: string): boolean {
  return '0' <= input && input <= '9' || input === '.';
}

