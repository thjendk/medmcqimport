import { Flow, flowDecoder } from "../interfaces/Flow";
import { Item } from "../interfaces/Item";
import { Question } from "../interfaces/Question";
import { Decoder } from "@mojotech/json-type-validation";

interface checkFlowArgs {
  obj: Flow | Item | Question;
  decoders: { path: string; decoder: Decoder<Flow | Item | Question> }[];
}
interface CheckFlowResult {
  obj: Flow | Item | Question;
  ok: boolean;
  results: DecoderResult[];
  errors: DecoderError[];
}
export const checkFlow = ({
  obj,
  decoders
}: checkFlowArgs): CheckFlowResult => {
  const errors: DecoderError[] = [];
  const results = decoders.map(({ path, decoder }) => {
    const result = runDecoder(obj, path, decoder);
    if (result.error) {
      if (path) {
        let errorPath = result.error.at;
        result.error.at =
          errorPath.substring(0, 5) + `.${path}` + errorPath.substring(5);
      }
      errors.push(result.error);
    }
    return result;
  });
  const isOk = results.find(x => !x.ok) ? false : true;
  return { obj, ok: isOk, results, errors };
};

interface DecoderResult {
  ok: boolean;
  result?: Flow | Item | Question;
  error?: DecoderError;
}
interface DecoderError {
  kind: string;
  input: any;
  at: string;
  message: string;
}
const runDecoder = (
  obj: any,
  path: string = "",
  decoder: Decoder<Flow | Item | Question>
): DecoderResult => {
  const partToDecode = path ? obj[path] : obj;
  return decoder.run(partToDecode);
};

class ValidationError extends Error {
  errors: DecoderError[];
  constructor(err: { message: string; errors: DecoderError[] }) {
    super();
    this.name = "ValidationError";
    this.errors = err.errors;
  }
}

export const validateFlow = async (flow: Flow): Promise<boolean> => {
  const checkedFlow = checkFlow({
    obj: flow,
    decoders: [{ path: "", decoder: flowDecoder }]
  });
  if (checkedFlow.errors.length > 0) {
    throw new ValidationError({
      message: "Flow did not match expected format",
      errors: checkedFlow.errors
    });
  }
  return true;
};
