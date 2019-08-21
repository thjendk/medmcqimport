import * as fs from "fs";
import indexFlows from "./utils/indexFlows";
import { validateFlow } from "./utils/validation/isValidFlow";
import { returnError } from "./utils/errors/errorHandler";
import { Flow } from "./interfaces/Flow";
import { getPreviousFlowIds } from "./utils/getPreviousFlows";
const inputFile = JSON.parse(fs.readFileSync("flow-example.json").toString());

const test = async () => {
  const prevFlows = getPreviousFlowIds();
  let index = await indexFlows(inputFile);
  console.log(index);
  //index = index.filter(f => f.questions > 50);
  index.forEach(({ title, questions, activityId }, i) => {
    let string = `${i}. ${title} (${questions} questions)`;
    if (prevFlows.includes(activityId)) console.log("already exists");
    console.log(string);
  });

  const selectedFlows = [0];
  const flows: Flow[] = selectedFlows.map(index => inputFile[index]);
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
