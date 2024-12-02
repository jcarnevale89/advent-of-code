import fs from 'fs';
import path from 'path';

interface PartNumber {
  start: number;
  end: number;
  value: number;
}

interface Gear {
  index: number;
}

export function gearRatiosPart2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const rows = fs
    .readFileSync(filepath, 'utf-8')
    .split('\n')
    // .slice(0, 4)
    .map((row) => {
      const numbers = [...row.matchAll(/\d+/g)].map((match) => {
        const value = match[0];
        const index = match.index ?? 0;
        const length = value.length;

        const start = index === 0 ? index : index - 1;
        const end = index + length;

        const partNumber: PartNumber = {
          start,
          end,
          value: +value,
        };

        return partNumber;
      });

      const gears = [...row.matchAll(/[*]/g)].map((match) => {
        const index = match.index ?? 0;

        const gear: Gear = {
          index,
        };

        return gear;
      });

      return {
        row,
        numbers,
        gears,
      };
    });

  const validGearNumbers = rows.map((row, index) => {
    const previousRow = rows[index - 1];
    const nextRow = rows[index + 1];

    return row.gears.map((gear) => {
      const numbers: PartNumber[] = [];

      if (previousRow)
        numbers.push(
          ...previousRow.numbers.filter((number) => getNumbersFromIndex(number, gear.index)),
        );
      numbers.push(...row.numbers.filter((number) => getNumbersFromIndex(number, gear.index)));
      if (nextRow)
        numbers.push(
          ...nextRow.numbers.filter((number) => getNumbersFromIndex(number, gear.index)),
        );

      return numbers;
    });
  });

  console.log(
    validGearNumbers
      .flat()
      .filter((v) => v.length === 2)
      .map((v) => v[0].value * v[1].value)
      .reduce((acc, gearRatio) => acc + gearRatio, 0),
  );
}

function getNumbersFromIndex(number: PartNumber, index: number) {
  return index >= number.start && index <= number.end;
}
