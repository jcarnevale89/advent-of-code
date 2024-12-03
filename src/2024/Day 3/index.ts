import fs from 'fs';
import path from 'path';

export async function part1() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file.trim();

  // const regex = /mul\((?<x>\d{1,3}),(?<y>\d{1,3})\)/g;
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const matches = [...data.matchAll(regex)].map((match) => {
    const x = +match[1];
    const y = +match[2];
    return x * y;
  });

  return matches.reduce((a, b) => a + b, 0);
}

export async function part2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file.trim();

  const regex = /mul\((?<x>\d{1,3}),(?<y>\d{1,3})\)|(?<go>do\(\))|(?<stop>don't\(\))/g;

  const matches = [...data.matchAll(regex)].map((match) => {
    //@ts-expect-error I don't know how to type a regex
    const { x, y, go, stop } = match.groups;

    return {
      x: x ? +x : undefined,
      y: y ? +y : undefined,
      go: !!go,
      stop: !!stop,
    };
  });

  interface InstructionCheck {
    enabled: boolean;
    result: number;
  }

  const validInstructions = matches.reduce<InstructionCheck>(
    (acc, match) => {
      if (match.go) acc.enabled = true;
      else if (match.stop) acc.enabled = false;

      if (acc.enabled && match.x && match.y) {
        acc.result += match.x * match.y;
      }

      return acc;
    },
    {
      enabled: true,
      result: 0,
    },
  );

  return validInstructions.result;
}
