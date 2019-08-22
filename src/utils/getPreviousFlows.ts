import * as fs from "fs";
import { rootPath } from "../index";
export const getPreviousFlowIds = (): number[] => {
  if (fs.existsSync(rootPath + "/output/.prevFlows.json")) {
    return JSON.parse(
      fs.readFileSync(rootPath + "/output/.prevFlows.json").toString()
    );
  } else {
    return [];
  }
};
