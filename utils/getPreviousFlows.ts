import * as fs from "fs";

export const getPreviousFlowIds = (): number[] => {
  if (fs.existsSync("prevFlows.json")) {
    return JSON.parse(fs.readFileSync("prevFlows.json").toString());
  } else {
    return [];
  }
};
