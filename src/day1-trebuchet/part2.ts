import fs from "fs";
import path from "path";
import readline from "readline";

export function trebuchetPart2() {
  const filepath = path.resolve(__dirname, "input.txt");

  const filestream = fs.createReadStream(filepath, "utf-8");

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  let total = 0;

  rl.on("line", (line) => {
    const value = getNumber(line);
    console.log(line, value);
    total += value;
  });

  rl.on("close", () => {
    console.log(total);
  });
}

function getNumber(input: string) {
  const teest = input.matchAll(
    /\d|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g
  );
  console.log([...teest]);

  const numbers = input.match(
    /\d|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g
  );
  if (!numbers) return 0;

  // console.log(numbers);

  const start = numberTextToNumber(numbers[0]);
  const end =
    numbers.length > 1 ? numberTextToNumber(numbers.pop() || "") : start;

  console.log(input, start, end);

  return parseInt(`${start}${end}`);
}

const numberLookupArray = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function numberTextToNumber(value: string): number {
  const lookup = numberLookupArray.findIndex((number) => number === value) + 1;
  return lookup === 0 ? parseInt(value) : lookup;
}
