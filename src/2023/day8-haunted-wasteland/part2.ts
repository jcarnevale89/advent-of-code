import fs from 'fs';
import path from 'path';

export function hauntedWastelandPart2() {
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

  const nodesEndingInA = Object.keys(nodeMap).filter((node) => node.endsWith('A'));

  const results = nodesEndingInA.map((node) => {
    let step = 0;
    let element = node;

    while (!element.endsWith('Z')) {
      const instruction = instructions[step % instructions.length];

      const node = nodeMap[element];

      element = node[instruction];

      step++;
    }

    return step;
  });

  console.log(results);

  return lcm(results);
}

function lcm(numbers: number[]) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

function gcd(...numbers: number[]) {
  return numbers.reduce((a, b) => {
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  });
}
