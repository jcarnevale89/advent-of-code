import { solution } from './part2';

describe('solution', () => {
  it('should return correct answer with test input', () => {
    const input = `Time:      7  15   30
Distance:  9  40  200`;

    const result = solution(input);

    expect(result).toEqual(71503);
  });
});
