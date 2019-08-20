import { Flow, flowDecoder } from "../../interfaces/Flow";
import { itemsDecoder } from "../../interfaces/Item";
import { questionsDecoder } from "../../interfaces/Question";
import { DecoderError } from "./runDecoder";
import { checkFlow } from "./checkFlow";

class ValidationError extends Error {
  errors: DecoderError[];
  constructor(err: { message: string; errors: DecoderError[] }) {
    super();
    this.name = "ValidationError";
    this.errors = err.errors;
  }
}

export const isValidFlow = async (flow: Flow): Promise<boolean> => {
  const checkedFlow = checkFlow({
    obj: flow,
    decoders: [
      { path: "", decoder: flowDecoder },
      { path: "items", decoder: itemsDecoder },
      { path: "items[].questions", decoder: questionsDecoder }
    ]
  });
  if (checkedFlow.errors.length > 0) {
    throw new ValidationError({
      message: "Flow did not match expected format",
      errors: checkedFlow.errors
    });
  }
  return true;
};
