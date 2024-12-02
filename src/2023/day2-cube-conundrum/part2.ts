/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs';
import path from 'path';
import readline from 'readline';

interface Game {
  id: number;
  rounds: Round[];
}

interface Round {
  blue: number;
  green: number;
  red: number;
}

export function cubeConundrumPart2() {
  const filepath = path.resolve(__dirname, 'input.txt');

  const filestream = fs.createReadStream(filepath, 'utf-8');

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  let total = 0;

  rl.on('line', (line) => {
    const game = parseGame(line);

    total += getCubeCount(game);
  });

  rl.on('close', () => {
    console.log(total);
  });
}

function getCubeCount(game: Game): number {
  const maxCubes = game.rounds.reduce(
    (acc, round) => {
      Object.entries(round).forEach(([key, count]) => {
        // @ts-ignore
        const currentMax = acc[key];
        if (count > currentMax) {
          //@ts-ignore
          acc[key] = count;
        }
      });

      return acc;
    },
    { red: 0, blue: 0, green: 0 },
  );

  return maxCubes.green * maxCubes.blue * maxCubes.red;
}

function parseGame(input: string): Game {
  const [gameString, roundsString] = input.split(':');

  const id = gameString.trim().replace('Game', '');

  const rounds = roundsString.split(';').map((roundString) => parseRound(roundString.trim()));

  return {
    id: +id,
    rounds,
  };
}

function parseRound(input: string): Round {
  const values = input.split(',').map((v) => {
    const [count, color] = v.trim().split(' ');
    return [color, +count];
  });

  return {
    red: 0,
    blue: 0,
    green: 0,
    ...Object.fromEntries(values),
  };
}
