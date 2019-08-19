import { Item } from "../utils/splitExport";
import {
  Decoder,
  object,
  string,
  array,
  oneOf,
  optional,
  number,
  anyJson,
  constant
} from "@mojotech/json-type-validation";

export interface Flow {
  activityId: number;
  reference: number;
  title: string;
  description: string;
  tags: string[] | null | undefined;
  type: number;
  items: Item[];
  createdAt: number;
  minScore: number | null | undefined;
  maxScore: number | null | undefined;
  assignments: string[];
}

export const flowDecoder: Decoder<Flow> = object({
  activityId: number(),
  reference: number(),
  title: string(),
  description: string(),
  tags: optional(oneOf(array(string()), constant(null))),
  type: number(),
  items: anyJson(),
  createdAt: number(),
  minScore: optional(oneOf(number(), constant(null))),
  maxScore: optional(oneOf(number(), constant(null))),
  assignments: array(string())
});
