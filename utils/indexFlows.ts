import * as fs from "fs";
import { Flow } from "../interfaces/Flow";
import { calculateQuestionCount } from "./validation/calculateQuestionCount";

interface FlowIndex {
  title: string;
  questions: number;
  activityId: number;
}

const indexFlows = (flows: Flow[], removeShortFlows: boolean): FlowIndex[] => {
  let index: FlowIndex[] = [];
  let ids: number[] = [];
  flows.map(flow => {
    ids.push(flow.activityId);
    const questionCount = calculateQuestionCount(flow);
    if (removeShortFlows && questionCount < 50) {
      return;
    }
    index.push({
      title: flow.title,
      questions: calculateQuestionCount(flow),
      activityId: flow.activityId
    });
  });
  fs.writeFileSync("prevFlows.json", JSON.stringify(ids));
  return index;
};

export default indexFlows;
