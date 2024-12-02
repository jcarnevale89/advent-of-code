import fs from 'fs';
import path from 'path';
import consola from 'consola';
import yargs from 'yargs';

(async function setupDay() {
  const { d: day, y: year } = yargs(process.argv.slice(2))
    .options({
      d: {
        alias: 'day',
        describe: 'The day of the Advent of Code to run.',
        type: 'number',
        choices: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        ],
        default: 1,
      },
      y: {
        alias: 'year',
        describe: 'The year of the Advent of Code to run.',
        type: 'number',
        default: new Date().getFullYear(),
      },
    })
    .parseSync();

  consola.box(`
🎅🎄 Advent of Code 🎄🎅
          ${year}
`);

  consola.start(`Setting up Day ${day}.`);

  const yearDir = path.resolve('src', year.toString());
  const dayDir = path.join(yearDir, `Day ${day}`);
  const inputFile = path.join(dayDir, `input.txt`);
  const sourceFile = path.join(dayDir, `index.ts`);

  // If year doesn't exist, create it
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir);
  }

  // If day doesn't exist, create it
  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir);
  }

  consola.start(`Fetching input...`);
  // Get the input file for that days challenge
  const input = await getInput(year, day);
  fs.writeFileSync(inputFile, input);

  // If source file doesn't exist, create it
  if (!fs.existsSync(sourceFile)) {
    fs.writeFileSync(
      path.resolve(dayDir, 'index.ts'),
      `import fs from 'fs';
import path from 'path';

export async function part1 () {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');
  
  const data = file.trim().split(/\\n/);
}

export async function part2 () {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');
  
  const data = file.trim().split(/\\n/);
}
`,
    );
  }

  consola.success(`Created day ${day}!`);
})();

function getInput(year: number, day: number) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;

  const headers = new Headers();
  headers.set('cookie', `session=${process.env.AOC_SESSION}`);

  return fetch(url, {
    headers,
  }).then((res) => res.text());
}
