import fs from "fs";
import path from "path";
import readline from "readline";

export function trebuchet() {
  const filepath = path.resolve(__dirname, "input.txt");

  const filestream = fs.createReadStream(filepath, "utf-8");

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  let total = 0;

  rl.on("line", (line) => {
    const value = getNumber(line);
    console.log(line, value);
    total += value;
  });

  rl.on("close", () => {
    console.log(total);
  });
}

function getNumber(input: string) {
  const numbers = input.match(/\d/g);
  if (!numbers) return 0;

  const start = numbers[0];
  const end = numbers.length > 0 ? numbers.pop() : start;

  return parseInt(start + end);
}
