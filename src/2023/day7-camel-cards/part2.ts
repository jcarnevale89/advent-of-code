import fs from 'fs';
import path from 'path';

export function camelCardsPart2() {
  const filepath = path.resolve(__dirname, 'input.txt');
  const input = fs.readFileSync(filepath, 'utf-8');

  const result = solution(input);

  console.log(result);
}

enum Card {
  'JOKER' = 1,
  'TWO' = 2,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5,
  'SIX' = 6,
  'SEVEN' = 7,
  'EIGHT' = 8,
  'NINE' = 9,
  'TEN' = 10,
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
    case 'J':
      return Card.JOKER;
  }
}

function getHandType(cards: Card[]): Type {
  const cardCountsDict = cards.reduce(
    (acc, card) => {
      if (!acc[card]) acc[card] = 0;
      acc[card]++;

      return acc;
    },
    {} as Record<Card, number>,
  );

  const jokers = cardCountsDict[Card.JOKER];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete cardCountsDict[Card.JOKER];

  const cardCounts = Object.entries(cardCountsDict).sort(
    (a, b) => decendingSort(a[1], b[1]) || decendingSort(+a[0], +b[0]),
  );

  if (jokers) {
    console.log(cards);
    if (cardCounts[0]) cardCounts[0][1] += jokers;
    else cardCounts.push(['1', jokers]);
  }

  if (cardCounts.length === 1) {
    return Type.FIVE_KIND;
  } else if (cardCounts.length === 2) {
    return cardCounts.some(([, count]) => count === 4) ? Type.FOUR_KIND : Type.FULL_HOUSE;
  } else if (cardCounts.length === 3) {
    return cardCounts.some(([, count]) => count === 3) ? Type.THREE_KIND : Type.TWO_PAIR;
  } else if (cardCounts.length === 4) {
    return Type.ONE_PAIR;
  } else {
    return Type.HIGH_CARD;
  }
}

function decendingSort(a: number, b: number) {
  return b - a;
}
