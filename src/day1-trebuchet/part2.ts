import fs from 'fs';
import path from 'path';
import readline from 'readline';

export function trebuchetPart2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const filestream = fs.createReadStream(filepath, 'utf-8');

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  let total = 0;

  rl.on('line', (line) => {
    const value = getNumber(line);
    console.log(line, value);
    total += value;
  });

  rl.on('close', () => {
    console.log(total);
  });
}

function getNumber(input: string) {
  const numbers = [
    ...input.matchAll(/(?=(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine))/g),
  ]
    .flat()
    .filter((v) => v);

  if (!numbers) return 0;

  const start = numberTextToNumber(numbers.at(0));
  const end = numberTextToNumber(numbers.at(-1));

  return parseInt(`${start}${end}`);
}

const numberLookupArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function numberTextToNumber(value?: string): number {
  if (!value) return 0;
  const lookup = numberLookupArray.findIndex((number) => number === value) + 1;
  return lookup === 0 ? parseInt(value) : lookup;
}
