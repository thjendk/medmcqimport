import colors = require("colors/safe");
import { Flow } from "../interfaces/Flow";
import { getPreviousFlowIds } from "./getPreviousFlows";
import indexFlows from "./indexFlows";

export const printIndex = (flows: Flow[], removeShortFlows: boolean) => {
  console.log("\n");
  console.log("Filen indeholder følgende flows:");
  const prevFlows = getPreviousFlowIds();
  let index = indexFlows(flows, removeShortFlows);
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
  console.log("\n");
  console.log(
    `${colors.red("Røde linjer")} var også til stede i sidste eksport.`
  );
  console.log(`${colors.green("Grønne linjer")} er nye flows.\n`);
};
