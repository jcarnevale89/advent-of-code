import { solution } from './part2';

describe('solution', () => {
  it('should return correct answer with test input', () => {
    const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

    const result = solution(input);

    expect(result).toEqual(6);
  });
});
