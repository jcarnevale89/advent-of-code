import fs from "fs";
import path from "path";

export function scratchcardsPart2() {
  const filepath = path.resolve(__dirname, "input.txt");

  const cards = fs
    .readFileSync(filepath, "utf-8")
    .split("\n")
    // .slice(0, 4)
    .map((cardString) => {
      const [, numberString] = cardString.split(":");

      const [winningNumbersString, yourNumbersString] = numberString.split("|");

      const winningNumbers = winningNumbersString
        .trim()
        .split(/\s+/g)
        .map((n) => +n);

      const yourNumbers = yourNumbersString
        .trim()
        .split(/\s+/g)
        .map((n) => +n);

      const numberOfMatches = yourNumbers.filter((num) =>
        winningNumbers.includes(num)
      );

      return numberOfMatches.length;
    });

  const scratchCards = Array(cards.length).fill(0);

  cards.forEach((card, index) => processCard(index, card));

  function processCard(cardIndex: number, winCount: number) {
    scratchCards[cardIndex]++;

    for (let index = 1; index <= winCount; index++) {
      processCard(cardIndex + index, cards[cardIndex + index]);
    }
  }

  console.log(scratchCards.reduce((acc, cardCount) => acc + cardCount, 0));
}
