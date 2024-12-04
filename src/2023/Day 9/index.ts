import fs from 'fs';
import path from 'path';

export async function part1() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file
    .trim()
    .split(/\n/)
    .map((line) => line.split(' ').map((num) => +num));

  return data.reduce((acc, curr) => {
    return acc + getNextValue(curr);
  }, 0);
}

export async function part2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const file = fs.readFileSync(filepath, 'utf-8');

  const data = file
    .trim()
    .split(/\n/)
    .map((line) => line.split(' ').map((num) => +num));

  return data.reduce((acc, curr) => {
    return acc + getPrevValue(curr);
  }, 0);
}

function getNextValue(data: number[]) {
  const steps = [data];

  while (steps.at(-1)?.every((num) => num === 0) !== true) {
    steps.push(getDifferences(steps.at(-1)!));
  }

  steps.reverse();

  steps.forEach((step, index) => {
    const prevStep = steps[index - 1];

    let nextValue = 0;

    if (prevStep) {
      nextValue = step.at(-1)! + prevStep.at(-1)!;
    }

    step.push(nextValue);
  });

  return steps.at(-1)!.at(-1)!;
}

function getPrevValue(data: number[]) {
  const steps = [data];

  while (steps.at(-1)?.every((num) => num === 0) !== true) {
    steps.push(getDifferences(steps.at(-1)!));
  }

  steps.reverse();

  steps.forEach((step, index) => {
    const prevStep = steps[index - 1];

    let prevValue = 0;

    if (prevStep) {
      prevValue = step.at(0)! - prevStep.at(0)!;
    }

    step.unshift(prevValue);
  });

  return steps.at(-1)!.at(0)!;
}

function getDifferences(data: number[]) {
  return data.reduce<number[]>((acc, curr, index, array) => {
    const next = array[index + 1];

    if (next !== undefined) {
      acc.push((curr - next) * -1);
    }

    return acc;
  }, []);
}
