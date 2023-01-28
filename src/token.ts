export type TokenType =
  | "illegal"
  | "number"
  | "plus"
  | "minus"
  | "asterisk"
  | "slash"
  | "lparen"
  | "rparen"
  | "double-asterisk"
  | "eof";

export type Token = {
  type: TokenType;
  literal: string;
};
