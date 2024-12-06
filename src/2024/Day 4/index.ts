import fs from 'fs';
import path from 'path';

export async function part1() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file.trim().split(/\n/);
  // .map((str) => str.split(''));

  console.log(data.length);
  const rows = data;
  // const columns = rows.map((row) => )

  // data.forEach((row, y) => {
  //   row.forEach((char, x) => {
  //     if (char !== 'X') return;

  //     const goodCoords = checkSurroundingLetters({ x, y }, 'M').flatMap((coord) =>
  //       checkSurroundingLetters(coord, 'A'),
  //     );
  //     console.log(goodCoords);

  //     // .flatMap((coord) => checkSurroundingLetters(coord, 'A'));
  //     // .map((coord) => checkSurroundingLetters(coord, 'A'))
  //     // .map((coord2) => checkSurroundingLetters(coord2, 'S'));
  //   });
  // });

  interface Position {
    x: number;
    y: number;
  }
  function checkSurroundingLetters(pos: Position, char: string) {
    const goodCoords: Position[] = [];

    for (let rowIndex = pos.y - 1; rowIndex <= pos.y + 1; rowIndex++) {
      const row = data[rowIndex];

      if (!row) continue;

      for (let charIndex = pos.x - 1; charIndex <= pos.x + 1; charIndex++) {
        if (row[charIndex] !== char) continue;

        goodCoords.push({ x: charIndex, y: rowIndex });
      }
    }

    return goodCoords;
  }
}

export async function part2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file.trim().split(/\n/);
}
