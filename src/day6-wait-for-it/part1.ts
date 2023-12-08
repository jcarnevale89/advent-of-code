import fs from 'fs';
import path from 'path';

export function waitForItPart1() {
  const filepath = path.resolve(__dirname, 'input.txt');
  const input = fs.readFileSync(filepath, 'utf-8');

  const result = solution(input);

  console.log(result);
}

// time, record distance
type RaceTuple = [number, number];

export function solution(input: string): number {
  const races = input
    .split(/\n/)
    .map((entry) => entry.match(/\d+/g)?.map(Number))
    .reduce((acc, group, groupIndex) => {
      group?.forEach((number, index) => {
        if (!acc[index]) acc[index] = [0, 0];
        acc[index][groupIndex] = number;
      });
      return acc;
    }, [] as RaceTuple[]);

  const recordDistances = races.map((race) => {
    const time = race[0];
    const distanceRecord = race[1];
    // const runCount = Math.ceil(time / 2);

    const runs: number[] = [];
    for (let i = 1; i < time; i++) {
      const distance = (time - i) * i;
      if (distance > distanceRecord) runs.push(distance);
    }

    return runs;
  });

  return recordDistances.reduce((acc, recordDistance) => acc * recordDistance.length, 1);
}
