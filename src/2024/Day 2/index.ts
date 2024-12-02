import fs from 'fs';
import path from 'path';

export async function part1() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file.split(/\n/).map((str) => str.split(/\s+/).map((s) => +s));

  const validReports = data.filter(checkAdjacentLevels).filter(checkIncDec);

  return validReports.length;
}

// Could not figure it out. Got the solution from here:
// https://github.com/CodingAP/advent-of-code/blob/main/puzzles/2024/day02/solution.ts
export async function part2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const lists = file
    .trim()
    .split('\n')
    .map((line) => line.split(' ').map((num) => parseInt(num)));

  // find how many lists with one removed element are safe
  return lists.reduce((sum, list) => {
    let isSafe = false;

    for (let j = 0; j < list.length; j++) {
      const newNumbers = [...list];
      newNumbers.splice(j, 1);
      if (testSafety(newNumbers)) isSafe = true;
    }

    if (isSafe) sum++;
    return sum;
  }, 0);
}

function checkIncDec(report: number[]) {
  const isInc = report[1] > report[0];

  return report.every((val, i) => {
    const prev = report[i - 1];

    if (prev === undefined) return true;

    if (isInc) {
      return val > prev;
    } else {
      return val < prev;
    }
  });
}

function checkAdjacentLevels(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    const val = report[i];
    const nextVal = report[i + 1];

    if (nextVal === undefined) break;

    const diff = Math.abs(nextVal - val);

    // if the level is not between 1 and 3, its unsafe
    if (diff === 0 || diff > 3) return false;
  }

  return true;
}

const testSafety = (list: number[]): boolean => {
  let isSafe = true,
    increasing = Math.sign(list[0] - list[1]);

  for (let j = 1; j < list.length; j++) {
    const diff = list[j - 1] - list[j];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3 || Math.sign(diff) !== increasing) isSafe = false;
  }

  return isSafe;
};
