import {
  Decoder,
  object,
  string,
  array,
  constant,
  number,
  oneOf,
  union,
  optional
} from "@mojotech/json-type-validation";

export interface Question {
  data: {
    options: { label: string; value: string }[];
    ui_style: { choice_label: string; type: string };
    stimulus: string;
    type: string;
    validation: {
      scoring_type: "exactMatch";
      valid_response: { score: 1; value: string | string[] };
    };
    score: 1;
    minScore: 0 | null | undefined;
  };
  itemId: number;
  maxScore: 1;
  minScore: 0 | null | undefined;
  id: number;
}

export const questionsDecoder: Decoder<Question[]> = array(
  object({
    data: object({
      options: array(
        object({
          label: string(),
          value: string()
        })
      ),
      ui_style: object({
        choice_label: string(),
        type: string()
      }),
      stimulus: string(),
      type: string(),
      validation: object({
        scoring_type: constant("exactMatch"),
        valid_response: object({
          score: constant(1),
          value: union(array(string()), string())
        })
      }),
      score: constant(1),
      minScore: optional(oneOf(constant(0), constant(null)))
    }),
    itemId: number(),
    maxScore: constant(1),
    minScore: optional(oneOf(constant(0), constant(null))),
    id: number()
  })
);
