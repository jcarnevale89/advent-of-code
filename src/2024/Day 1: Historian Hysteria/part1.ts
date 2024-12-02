import fs from 'fs';
import path from 'path';
import readline from 'readline';

export default function () {
  const filepath = path.resolve(__dirname, 'input.txt');

  const filestream = fs.createReadStream(filepath, 'utf-8');

  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });

  const list1: number[] = [];
  const list2: number[] = [];

  rl.on('line', (line) => {
    const [a, b] = line.split(/\s+/);

    list1.push(+a);
    list2.push(+b);
  });

  rl.on('close', () => {
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    let differenceTotal = 0;

    for (let i = 0; i < list1.length; i++) {
      differenceTotal += Math.abs(list1[i] - list2[i]);
    }

    console.log(differenceTotal);
  });
}
