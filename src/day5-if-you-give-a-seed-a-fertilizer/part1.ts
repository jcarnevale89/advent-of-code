import fs from "fs";
import path from "path";

export function ifYouGiveASeedAFertilizerPart1() {
  const filepath = path.resolve(__dirname, "input.txt");

  const almanac = fs
    .readFileSync(filepath, "utf-8")
    .split(/[\r\n]{2}/)
    .map((dataString) => {
      const [, data] = dataString.split(/:\s?\n?/);
      return data.split(/\n/).map((str) => str.split(" ").map((num) => +num));
    });

  const [[seeds], ...almanacMaps] = almanac;

  console.log(seeds);

  const seedLocations = seeds.map((seed) => {
    return almanacMaps.reduce((acc, map) => {
      const entry = map.find(([, sourceRangeStart, rangeLength]) => {
        return (
          acc >= sourceRangeStart && acc <= sourceRangeStart + rangeLength - 1
        );
      });

      if (entry) {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = entry;

        acc = destinationRangeStart + (acc - sourceRangeStart);
      }

      return acc;
    }, seed);
  });

  console.log(Math.min(...seedLocations));
}
