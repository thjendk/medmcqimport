import readlineSync = require("readline-sync");
import * as fs from "fs";
import { Flow } from "../interfaces/Flow";

export const askForFileAndReadIt = (): Flow[] => {
  const path = readlineSync.questionPath("Hvilken fil skal analyseres?\n> ", {
    limit: /\.json$/i,
    limitMessage: "Det var ikke en gyldig .JSON-fil. Prøv igen, tak!"
  });
  return JSON.parse(fs.readFileSync(path).toString());
};

export const askForIndices = () => {
  let indicesStr = readlineSync.question(
    `Hvilke flows skal eksporteres?
(kommasepareret: 0, 1, 2 ...)
> `,
    {
      limit: /^(([0-9]){1}[, ]*)+$/,
      limitMessage:
        "Indtast et eller flere indices adskilt af kommaer (og evt. mellemrum)"
    }
  );
  indicesStr = indicesStr.replace(" ", "");
  let indices = indicesStr.split(",");
  return indices.map(i => Number(i));
};
