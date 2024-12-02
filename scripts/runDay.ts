import fs from 'fs';
import path from 'path';
import consola from 'consola';
import yargs from 'yargs';

(async function runDay() {
  const {
    d: day,
    p: part,
    y: year,
  } = yargs(process.argv.slice(2))
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
      p: {
        alias: 'part',
        describe: 'The part of the day to run.',
        choices: [1, 2],
        type: 'number',
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

  const yearDir = path.resolve('src', year.toString());
  const dayDir = path.join(yearDir, `Day ${day}`);
  const sourceFile = path.join(dayDir, `index.ts`);

  // If source file doesn't exist, create it
  if (!fs.existsSync(sourceFile)) {
    consola.warn(`Day ${day}, Year ${year} does not exist.`);
    return;
  }

  consola.start(`Running Day ${day}...`);

  const { part1, part2 } = await import(sourceFile);

  if (!part || part === 1) {
    consola.info('🌲 Part One:', await part1());
  }
  if (!part || part === 2) {
    consola.info('🌲 Part Two:', await part2());
  }

  // This is a hack to get the console to print a newline
  // Also just console instead of consola to omit the timestamp
  console.log('\n');
})();
