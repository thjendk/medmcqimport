import * as fs from "fs";
import splitExport from "./utils/splitExport";

const flow = JSON.parse(fs.readFileSync("flow-example.json").toString());

splitExport([flow]);
