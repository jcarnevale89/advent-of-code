import fs from 'fs';
import path from 'path';

export default function () {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file.split(/\n/).map((str) => str.split(/\s+/).map((s) => +s));

  const validReports = data.filter(checkAdjacentLevels).filter(checkIncDec);

  return validReports.length;
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
