import fs from "fs";
import path from "path";

// interface Card {
//   winningNumbers: number[];
//   yourNumbers: number[];
// }

export function scratchcardsPart1() {
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

  console.log(cards);
  console.log(
    cards
      .filter((numberOfMatches) => numberOfMatches > 0)
      .map((numberOfMatches) => {
        let points = 1;

        for (let i = 0; i < numberOfMatches - 1; i++) {
          points = points * 2;
        }

        return points;
      })
      .reduce((acc, partNumber) => acc + partNumber, 0)
  );
}
