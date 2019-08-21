import * as fs from "fs";

import { validateFlow } from "./utils/validation/isValidFlow";
import { returnError } from "./utils/errors/errorHandler";
import { Flow } from "./interfaces/Flow";

import { printIndex } from "./utils/printIndex";
import { askForIndices } from "./utils/interactions";

const inputFile = JSON.parse(fs.readFileSync(process.argv[2]).toString());

const test = () => {
  printIndex(inputFile);
  const indices: Number[] = askForIndices();

  const flows: Flow[] = indices.map(index => inputFile[index]);
  flows.forEach(flow => {
    const checkedFlow = validateFlow(flow);
    if (!checkedFlow.ok) {
      returnError(checkedFlow);
      return;
    }
    console.log(flow.title + " is valid");
  });
};
test();
