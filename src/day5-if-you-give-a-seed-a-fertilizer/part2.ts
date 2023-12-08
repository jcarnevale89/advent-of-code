import fs from "fs";
import path from "path";

export function ifYouGiveASeedAFertilizerPart2() {
  const filepath = path.resolve(__dirname, "input.txt");

  const almanacRawStrings = fs
    .readFileSync(filepath, "utf-8")
    .split(/[\r\n]{2}/)
    .map((dataString) => {
      const [, data] = dataString.split(/:\s?\n?/);
      return data;
      // return data.split(/\n/).map((str) => str.split(" ").map((num) => +num));
    });

  const [seedString, ...almanacMapStrings] = almanacRawStrings;

  const seedGroups = seedString.match(/[\d]+\s[\d]+/g) || [];
  // const seeds = seedGroups.reduce((acc, seedGroup) => {
  //   const [seed, length] = seedGroup.split(" ").map((v) => +v);
  //   // for (let i = seed; i < seed + length; i++) {
  //   //   acc.push(i);
  //   // }

  //   return acc;
  // }, [] as number[]);
  const seeds = seedGroups.map((seedGroup) =>
    seedGroup.split(" ").map((v) => +v)
  );

  const almanacMaps = almanacMapStrings.map((almanacString) =>
    almanacString.split(/\n/).map((str) => str.split(" ").map((num) => +num))
  );

  console.log(seeds);

  let minLocation = 0;

  seeds.forEach(([seed, length]) => {
    for (let i = seed; i < seed + length; i++) {
      minLocation = Math.min(minLocation, getSeedLocation(i));
    }
  });

  console.log(minLocation);

  function getSeedLocation(seed: number) {
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
  }

  // const seedLocations = seeds.map((seed) => {
  //   return almanacMaps.reduce((acc, map) => {
  //     const entry = map.find(([, sourceRangeStart, rangeLength]) => {
  //       return (
  //         acc >= sourceRangeStart && acc <= sourceRangeStart + rangeLength - 1
  //       );
  //     });

  //     if (entry) {
  //       const [destinationRangeStart, sourceRangeStart, rangeLength] = entry;

  //       acc = destinationRangeStart + (acc - sourceRangeStart);
  //     }

  //     return acc;
  //   }, seed);
  // });

  // console.log(Math.min(...seedLocations));
}
