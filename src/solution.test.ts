type VerySimpleExpressionProcessor = (expression: string) => number;

const solution: VerySimpleExpressionProcessor = (expression) => {
  return eval(expression);
  // 당신의 코드!
  return undefined as unknown as number;
};

describe("간단한 수식을 처리하자", () => {
  it("덧셈 쯤이야", () => {
    const result = solution("1 + 2");
    expect(result).toEqual(3);
  });

  it("뺄쌤 쯤이야", () => {
    const result = solution("1 - 2");
    expect(result).toEqual(-1);
  });

  it("어..? 뺄쌤 쯤이야??", () => {
    const result = solution("-1 - -2");
    expect(result).toEqual(1);
  });

  it("우선순위 맞출 수 있겠어?", () => {
    const result = solution("4 / 2 + -1 * 3");
    expect(result).toEqual(-1);
  });

  it("별 두개는 제곱이란다", () => {
    const result = solution("2**3*4**2");
    expect(result).toEqual(128);
  });

  it("괄호도 처리해야지?", () => {
    const result = solution("(6*(2/(3-2)))/4");
    expect(result).toEqual(3);
  });
});
