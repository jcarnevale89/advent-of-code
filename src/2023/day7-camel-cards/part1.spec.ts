import { solution } from './part1';

describe('solution', () => {
  it('should return correct answer with test input', () => {
    const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

    const result = solution(input);

    expect(result).toEqual(6440);
  });
});
