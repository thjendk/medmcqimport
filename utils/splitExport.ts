const colors = require("colors/safe");
import { Flow, flowDecoder } from "../interfaces/Flow";
import { validateFlow } from "./validateFlow";

const splitExport = (flows: Flow[]) => {
  flows.forEach(async flow => {
    try {
      await validateFlow(flow);
      console.log(flow);
    } catch ({ name, errors }) {
      console.error(colors.red("🚨 THE FLOW IS NOT VALID! 🚨"));
      console.error({ name, errors });
    }
  });
};

export default splitExport;
