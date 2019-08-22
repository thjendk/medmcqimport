import * as fs from "fs";

import { validateFlow } from "./utils/validation/isValidFlow";
import { returnError } from "./utils/errors/errorHandler";
import { Flow } from "./interfaces/Flow";

import { printIndex } from "./utils/printIndex";
import {
  askForIndices,
  askForFileAndReadIt,
  askForMinQuestionCount
} from "./utils/interactions";

const test = () => {
  console.log("\nmedMCQ WF-scripts\n");
  // Hent en fil og læs resultatet
  let inputFile = askForFileAndReadIt();

  const removeShortFlows = askForMinQuestionCount();
  console.log(removeShortFlows ? "ja" : "nej");
  // Print alle flows i filen
  printIndex(inputFile, removeShortFlows);
  const indices: number[] = askForIndices();

  // Subset flows
  const flows: Flow[] = indices.map(index => inputFile[index]);
  flows.forEach(flow => {
    // For at undgå undefined errors ved dårligt indeks
    if (!flow) return;

    const checkedFlow = validateFlow(flow);
    if (!checkedFlow.ok) {
      returnError(checkedFlow);
      return;
    }
    console.log(flow.title + " is valid");
  });
};
test();
