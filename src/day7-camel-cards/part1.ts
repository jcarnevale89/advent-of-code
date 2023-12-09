import fs from 'fs';
import path from 'path';

export function camelCardsPart1() {
  const filepath = path.resolve(__dirname, 'input.txt');
  const input = fs.readFileSync(filepath, 'utf-8');

  const result = solution(input);

  console.log(result);
}

enum Card {
  'TWO' = 2,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5,
  'SIX' = 6,
  'SEVEN' = 7,
  'EIGHT' = 8,
  'NINE' = 9,
  'TEN' = 10,
  'JACK' = 11,
  'QUEEN' = 12,
  'KING' = 13,
  'ACE' = 14,
}

enum Type {
  'HIGH_CARD',
  'ONE_PAIR',
  'TWO_PAIR',
  'THREE_KIND',
  'FULL_HOUSE',
  'FOUR_KIND',
  'FIVE_KIND',
}

interface Hand {
  cards: Card[];
  type: Type;
  bet: number;
}

export function solution(input: string) {
  const hands = input
    .split(/\n/)
    .map((entry) => {
      const [cardString, bet] = entry.split(' ');

      const cards = cardString.split('').map(getCard);

      const type = getHandType(cards);

      const hand: Hand = {
        cards,
        type,
        bet: +bet,
      };
      return hand;
    })
    .sort((a, b) => {
      const typeSort = decendingSort(a.type, b.type);

      if (typeSort !== 0) return typeSort;

      return (
        decendingSort(a.cards[0], b.cards[0]) ||
        decendingSort(a.cards[1], b.cards[1]) ||
        decendingSort(a.cards[2], b.cards[2]) ||
        decendingSort(a.cards[3], b.cards[3]) ||
        decendingSort(a.cards[4], b.cards[4])
      );
    })
    .reverse();

  const totalWinnings = hands.reduce((acc, hand, index) => acc + hand.bet * (index + 1), 0);

  return totalWinnings;
}

function getCard(card: string): Card {
  switch (card) {
    case 'A':
      return Card.ACE;
    case 'K':
      return Card.KING;
    case 'Q':
      return Card.QUEEN;
    case 'J':
      return Card.JACK;
    case 'T':
      return Card.TEN;
    case '9':
      return Card.NINE;
    case '8':
      return Card.EIGHT;
    case '7':
      return Card.SEVEN;
    case '6':
      return Card.SIX;
    case '5':
      return Card.FIVE;
    case '4':
      return Card.FOUR;
    case '3':
      return Card.THREE;
    case '2':
    default:
      return Card.TWO;
  }
}

function getHandType(cards: Card[]): Type {
  const cardCounts = Object.values(
    cards.reduce(
      (acc, card) => {
        if (!acc[card]) acc[card] = 0;
        acc[card]++;

        return acc;
      },
      {} as Record<Card, number>,
    ),
  );

  if (cardCounts.includes(5)) {
    return Type.FIVE_KIND;
  } else if (cardCounts.includes(4)) {
    return Type.FOUR_KIND;
  } else if (cardCounts.includes(3)) {
    return cardCounts.includes(2) ? Type.FULL_HOUSE : Type.THREE_KIND;
  } else if (cardCounts.includes(2)) {
    const twoCount = cardCounts.filter((count) => count === 2).length;

    return twoCount === 2 ? Type.TWO_PAIR : Type.ONE_PAIR;
  } else {
    return Type.HIGH_CARD;
  }
}

function decendingSort(a: number, b: number) {
  return b - a;
}
