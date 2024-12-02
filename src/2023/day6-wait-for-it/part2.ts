import fs from 'fs';
import path from 'path';

export function waitForItPart2() {
  const filepath = path.resolve(__dirname, 'input.txt');
  const input = fs.readFileSync(filepath, 'utf-8');

  const result = solution(input);

  console.log(result);
}

export function solution(input: string) {
  const [time, distanceRecord] = input
    .split(/\n/)
    .map((entry) => entry.match(/\d+/g)?.join(''))
    .map(Number);

  const possibleRuns: number[] = [];

  for (let i = 1; i < time; i++) {
    const distance = (time - i) * i;
    if (distance > distanceRecord) possibleRuns.push(distance);
  }

  return possibleRuns.length;
}
