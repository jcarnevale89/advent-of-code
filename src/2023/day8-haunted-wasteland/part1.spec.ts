import { solution } from './part1';

describe('solution', () => {
  it('should return correct answer with test input', () => {
    const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

    const result = solution(input);

    expect(result).toEqual(2);
  });

  it('should return correct answer with test input', () => {
    const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

    const result = solution(input);

    expect(result).toEqual(6);
  });
});
