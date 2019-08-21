import { Flow } from "../interfaces/Flow";

import { calculateQuestionCount } from "./validation/calculateQuestionCount";

interface FlowIndex {
  title: string;
  questions: number;
  activityId: number;
}

const indexFlows = (flows: Flow[]): FlowIndex[] => {
  let index: FlowIndex[] = [];

  flows.map(flow => {
    index.push({
      title: flow.title,
      questions: calculateQuestionCount(flow),
      activityId: flow.activityId
    });
  });
  return index;
};

export default indexFlows;
