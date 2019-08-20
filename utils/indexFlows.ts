import { Flow } from "../interfaces/Flow";
import { isValidFlow } from "./validation/isValidFlow";
import { printError } from "./errors/errorHandler";
import { calculateQuestionCount } from "./validation/calculateQuestionCount";

interface FlowIndex {
  title: string;
  questions: number;
}

const indexFlows = async (flows: Flow[]): Promise<FlowIndex[]> => {
  let index: FlowIndex[] = [];
  await Promise.all(
    flows.map(async flow => {
      try {
        await isValidFlow(flow);
        index.push({
          title: flow.title,
          questions: calculateQuestionCount(flow)
        });
      } catch ({ name, errors }) {
        printError(`${(flow.title || "").toUpperCase()}: IS NOT VALID!`, {
          flow: {
            title: flow.title,
            activityId: flow.activityId
          },
          error: name,
          errors
        });
      }
    })
  );
  return index;
};

export default indexFlows;
