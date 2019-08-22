import * as fs from "fs";
import { rootPath } from "../index";
import { Flow } from "../interfaces/Flow";
import { calculateQuestionCount } from "./validation/calculateQuestionCount";

interface FlowIndex {
  title: string;
  questions: number;
  activityId: number;
}

const indexFlows = (flows: Flow[]): FlowIndex[] => {
  let index: FlowIndex[] = [];
  let ids: number[] = [];
  flows.map(flow => {
    ids.push(flow.activityId);
    index.push({
      title: flow.title,
      questions: calculateQuestionCount(flow),
      activityId: flow.activityId
    });
  });
  if (!fs.existsSync(rootPath + "/output")) fs.mkdirSync(rootPath + "/output");
  fs.writeFileSync(rootPath + "/output/.prevFlows.json", JSON.stringify(ids));
  return index;
};

export default indexFlows;
