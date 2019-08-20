import { Question } from "./Question";
import {
  Decoder,
  object,
  string,
  array,
  optional,
  number,
  anyJson
} from "@mojotech/json-type-validation";

export interface Item {
  baseId: number;
  id: number | undefined;
  features: string;
  "i  d": number | undefined;
  index: number;
  parentId: string;
  questions: Question[];
  showAsItem: number;
  title: string;
  tools: string[];
}

export const itemsDecoder: Decoder<Item[]> = array(
  object({
    baseId: number(),
    id: optional(number()),
    features: string(),
    "i  d": optional(number()),
    index: number(),
    parentId: string(),
    questions: anyJson(),
    showAsItem: number(),
    title: string(),
    tools: array(string())
  })
);
