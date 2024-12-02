import fs from 'fs';
import path from 'path';

export function hauntedWastelandPart1() {
  const filepath = path.resolve(__dirname, 'input.txt');
  const input = fs.readFileSync(filepath, 'utf-8');

  const result = solution(input);

  console.log(result);
}

export function solution(input: string) {
  const [instructionString, ...nodes] = input.split(/\n+/);

  const instructions = instructionString
    .split('')
    .map((instruction) => (instruction === 'L' ? 0 : 1));

  const nodeMap = nodes.reduce(
    (acc, node) => {
      const [key, ...step] = node.replace(/[()]/g, '').split(/\W+/);
      acc[key] = step;
      return acc;
    },
    {} as Record<string, string[]>,
  );

  let step = 0;
  let element = 'AAA';

  while (element !== 'ZZZ') {
    const instruction = instructions[step % instructions.length];

    const node = nodeMap[element];

    element = node[instruction];

    step++;
  }

  return step;
}
