import fs from "fs";
import path from "path";
import readline from "readline";

interface Game {
  id: number;
  rounds: Round[];
}

interface Round {
  blue?: number;
  green?: number;
  red?: number;
}

export function cubeConundrumPart1() {
  const filepath = path.resolve(__dirname, "input.txt");

  const filestream = fs.createReadStream(filepath, "utf-8");

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  let total = 0;

  rl.on("line", (line) => {
    const game = parseGame(line);

    if (isGameValid(game)) total += game.id;
  });

  rl.on("close", () => {
    console.log(total);
  });
}

function isGameValid(game: Game) {
  const limits: Round = {
    blue: 14,
    green: 13,
    red: 12,
  };

  return game.rounds.every((round) => {
    return Object.entries(round).every(([key, count]) => {
      // @ts-ignore
      const limit = limits[key];

      return count <= limit;
    });
  });
}

function parseGame(input: string): Game {
  const [gameString, roundsString] = input.split(":");

  const id = gameString.trim().replace("Game", "");

  const rounds = roundsString
    .split(";")
    .map((roundString) => parseRound(roundString.trim()));

  return {
    id: +id,
    rounds,
  };
}

function parseRound(input: string): Round {
  const values = input.split(",").map((v) => {
    const [count, color] = v.trim().split(" ");
    return [color, +count];
  });

  return Object.fromEntries(values);
}
