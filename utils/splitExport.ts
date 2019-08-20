import colors = require("colors/safe");
import { Flow } from "../interfaces/Flow";
import { isValidFlow } from "./validation/isValidFlow";

const splitExport = (flows: Flow[]) => {
  flows.forEach(async flow => {
    try {
      await isValidFlow(flow);
      console.log(flow);
    } catch ({ name, errors }) {
      console.error(
        colors.red(`🚨 THE FLOW ${flow.title.toUpperCase()} IS NOT VALID! 🚨`)
      );
      console.error({
        flow: {
          title: flow.title,
          activityId: flow.activityId
        },
        error: name,
        errors
      });
    }
  });
};

export default splitExport;
