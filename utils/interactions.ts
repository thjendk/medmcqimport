import readlineSync = require("readline-sync");
export const askForIndices = () => {
  let indicesStr = readlineSync.question(
    "Which indices do you want to export?\n> "
  );
  indicesStr = indicesStr.replace(" ", "");
  let indicesArrStr = indicesStr.split(",");
  let indices = indicesArrStr.map(index => Number(index));
  return indices;
};
