import { Flow } from "../../interfaces/Flow";
import { Item } from "../../interfaces/Item";
import { Question } from "../../interfaces/Question";
import { Decoder } from "@mojotech/json-type-validation";

import { runDecoder, DecoderResult, DecoderError } from "./runDecoder";

interface checkFlowArgs {
  obj: Flow;
  decoders: {
    path: "" | "items" | "items[].questions";
    decoder: Decoder<Flow | Item[] | Question[]>;
  }[];
}
interface CheckFlowResult {
  obj: Flow;
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
