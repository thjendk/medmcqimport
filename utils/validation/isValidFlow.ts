import { Flow, flowDecoder } from "../../interfaces/Flow";
import { Result, DecoderError } from "@mojotech/json-type-validation";

export const validateFlow = (flow: Flow) => {
  const checkedFlow = flowDecoder.run(flow);
  return checkedFlow;
};
