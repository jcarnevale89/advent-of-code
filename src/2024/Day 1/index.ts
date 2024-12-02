import fs from 'fs';
import path from 'path';

export async function part1() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file
    .trim()
    .split(/\n/)
    .map((str) => str.split(/\s+/));

  const list1: number[] = [];
  const list2: number[] = [];

  data.forEach(([a, b]) => {
    list1.push(+a);
    list2.push(+b);
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  let differenceTotal = 0;

  for (let i = 0; i < list1.length; i++) {
    differenceTotal += Math.abs(list1[i] - list2[i]);
  }

  return differenceTotal;
}

export async function part2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file.split(/\n/).map((str) => str.split(/\s+/));

  const list1: number[] = [];
  const list2: Record<string, number> = {};

  data.forEach(([a, b]) => {
    list1.push(+a);

    if (!list2[b]) list2[b] = 0;
    list2[b]++;
  });

  const similarityScores = list1.map((a) => {
    const count = list2[a.toString()] ?? 0;
    return a * count;
  });

  const similarityScoreTotal = similarityScores.reduce((a, b) => a + b, 0);

  return similarityScoreTotal;
}
