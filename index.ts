import * as fs from "fs";
import indexFlows from "./utils/indexFlows";

const inputFile = JSON.parse(fs.readFileSync("test.json").toString());

const test = async () => {
  let flows = await indexFlows(inputFile);
  flows = flows.filter(f => f.questions > 50);
  console.log("Gyldige eksamenssæt til eksport er:");
  console.log(flows);
};
test();
