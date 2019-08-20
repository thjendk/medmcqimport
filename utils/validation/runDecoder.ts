import { Flow } from "../../interfaces/Flow";
import { Item } from "../../interfaces/Item";
import { Question } from "../../interfaces/Question";
import { Decoder } from "@mojotech/json-type-validation";

export interface DecoderResult {
  ok: boolean;
  result?: Flow | Item[] | Question[];
  error?: DecoderError;
}
export interface DecoderError {
  kind: string;
  input: any;
  at: string;
  message: string;
}
export const runDecoder = (
  obj: Flow,
  path: "" | "items" | "items[].questions",
  decoder: Decoder<Flow | Item[] | Question[]>
): DecoderResult => {
  let partToDecode: any;
  switch (path) {
    case "items":
      partToDecode = obj.items;
      break;
    case "items[].questions":
      partToDecode = [];
      obj.items.forEach(item => {
        partToDecode = partToDecode.concat(item.questions);
      });
      break;
    default:
      partToDecode = obj;
  }

  return decoder.run(partToDecode);
};
