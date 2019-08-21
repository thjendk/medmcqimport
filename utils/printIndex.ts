import colors = require("colors/safe");
import { Flow } from "../interfaces/Flow";
import { getPreviousFlowIds } from "./getPreviousFlows";
import indexFlows from "./indexFlows";

export const printIndex = (flows: Flow[]) => {
  const prevFlows = getPreviousFlowIds();
  let index = indexFlows(flows);
  //index = index.filter(f => f.questions > 50);
  index.forEach(({ title, questions, activityId }, i) => {
    let string = `${i}. ${title} (${questions} questions)`;
    let coloredString;
    if (prevFlows.includes(activityId)) {
      coloredString = colors.red(string);
    } else {
      coloredString = colors.green(string);
    }
    console.log(coloredString);
  });
};
