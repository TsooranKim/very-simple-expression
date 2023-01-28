import { Token } from "./token";

const isDigit = (ch: string): boolean => {
  const code = ch.charCodeAt(0);
  return 48 <= code && code <= 57;
};

export default class Lexer {
  private input: string;
  private currentPosition = -1; // 현재 보고있는 문자의 index
  private nextPosition = 0; // 읽어야할 문자의 index
  private character = ""; // 현재 보고 있는 문자

  constructor(input: string) {
    this.input = input;
    this.readCharacter(); // 생성되면 문자를 하나 읽고 시작
  }

  public nextToken(): Token {
    let token: Token;

    this.ignoreWhitespace();

    switch (this.character) {
      case "+":
        token = { type: "plus", literal: this.character };
        break;
      case "-":
        token = { type: "minus", literal: this.character };
        break;
      case "*":
        if (this.input[this.nextPosition] == "*") {
          const character = this.character;
          this.readCharacter();
          const literal = `${character}${this.character}`;
          token = {
            type: "double-asterisk",
            literal,
          };
        } else {
          token = { type: "asterisk", literal: this.character };
        }
        break;
      case "/":
        token = { type: "slash", literal: this.character };
        break;
      case "(":
        token = { type: "lparen", literal: this.character };
        break;
      case ")":
        token = { type: "rparen", literal: this.character };
        break;
      case "":
        token = { type: "eof", literal: this.character };
        break;
      default:
        if (isDigit(this.character)) {
          const literal = this.readNumber();
          token = { type: "number", literal };
          return token;
        } else {
          token = { type: "illegal", literal: this.character };
        }
    }

    this.readCharacter();

    return token;
  }

  private readCharacter(): void {
    if (this.nextPosition >= this.input.length) {
      this.character = "";
    } else {
      this.character = this.input[this.nextPosition];
    }

    this.currentPosition = this.nextPosition;
    this.nextPosition++;
  }

  private readNumber(): string {
    const startPosition = this.currentPosition;
    let dotAppeared = false;
    while (isDigit(this.character) || (this.character === "." && !dotAppeared)) {
      if (this.character === ".") {
        dotAppeared = true;
      }
      this.readCharacter();
    }
    return this.input.substring(startPosition, this.currentPosition);
  }

  private ignoreWhitespace(): void {
    while (this.character === " " || this.character === "\t" || this.character === "\n" || this.character === "\r") {
      this.readCharacter();
    }
  }
}
