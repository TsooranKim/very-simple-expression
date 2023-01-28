import type { Token } from "./token";
import Lexer from "./lexer";

describe("test lexer", () => {
  it("연산자", () => {
    const express = "+-*/()";

    const expectedTokens: Token[] = [
      { type: "plus", literal: "+" },
      { type: "minus", literal: "-" },
      { type: "asterisk", literal: "*" },
      { type: "slash", literal: "/" },
      { type: "lparen", literal: "(" },
      { type: "rparen", literal: ")" },
      { type: "eof", literal: "" },
    ];

    const lexer = new Lexer(express);
    for (const expected of expectedTokens) {
      const token = lexer.nextToken();
      expect(token).toEqual(expected);
    }
  });

  it("** 연산자", () => {
    const express = "*/**";

    const expectedTokens: Token[] = [
      { type: "asterisk", literal: "*" },
      { type: "slash", literal: "/" },
      { type: "double-asterisk", literal: "**" },
      { type: "eof", literal: "" },
    ];

    const lexer = new Lexer(express);
    for (const expected of expectedTokens) {
      const token = lexer.nextToken();
      expect(token).toEqual(expected);
    }
  });

  it("허용되지 않은 문자", () => {
    const express = "?";

    const expectedTokens: Token[] = [
      { type: "illegal", literal: "?" },
      { type: "eof", literal: "" },
    ];

    const lexer = new Lexer(express);
    for (const expected of expectedTokens) {
      const token = lexer.nextToken();
      expect(token).toEqual(expected);
    }
  });

  it("숫자", () => {
    const express = "12 3.14 300";

    const expectedTokens: Token[] = [
      { type: "number", literal: "12" },
      { type: "number", literal: "3.14" },
      { type: "number", literal: "300" },
      { type: "eof", literal: "" },
    ];

    const lexer = new Lexer(express);
    for (const expected of expectedTokens) {
      const token = lexer.nextToken();
      expect(token).toEqual(expected);
    }
  });

  it("수식", () => {
    const express = "1+2    * 3";

    const expectedTokens: Token[] = [
      { type: "number", literal: "1" },
      { type: "plus", literal: "+" },
      { type: "number", literal: "2" },
      { type: "asterisk", literal: "*" },
      { type: "number", literal: "3" },
      { type: "eof", literal: "" },
    ];

    const lexer = new Lexer(express);
    for (const expected of expectedTokens) {
      const token = lexer.nextToken();
      expect(token).toEqual(expected);
    }
  });
});
