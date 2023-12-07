import fs from "fs";
import path from "path";

export function gearRatiosPart1() {
  const filepath = path.resolve(__dirname, "input.txt");

  const rows = fs
    .readFileSync(filepath, "utf-8")
    .split("\n")
    // .slice(0, 2)
    .map((row) => {
      const numbers = [...row.matchAll(/\d+/g)].map((match) => {
        const value = match[0];
        const length = value.length;
        const index = match.index ?? 0;

        const start = index === 0 ? index : index - 1;
        const end = index + length;

        return {
          index,
          start,
          end,
          length,
          value: +value,
        };
      });

      return {
        row,
        numbers,
      };
    });

  const partNumbers = rows
    .map((row, index) => {
      const previousRow = rows[index - 1]?.row;
      const nextRow = rows[index + 1]?.row;

      return row.numbers.filter(
        ({ start, end }) =>
          checkRowForSymbol(previousRow, start, end) ||
          checkRowForSymbol(row.row, start, end) ||
          checkRowForSymbol(nextRow, start, end)
      );
    })
    .flat()
    .map(({ value }) => value);

  console.log(partNumbers.reduce((acc, partNumber) => acc + partNumber, 0));
}

function checkRowForSymbol(
  row: string | undefined,
  start: number,
  end: number
) {
  if (!row) return false;
  const rowBlock = row.substring(start, end + 1);
  return rowBlock.search(/[^\d.]/g) > -1;
}
