import {
  Decoder,
  object,
  string,
  array,
  constant,
  number,
  oneOf
} from "@mojotech/json-type-validation";

export interface Question {
  data: {
    options: { label: string; value: "0" | "1" | "2" }[];
    ui_style: { choice_label: string; type: string };
    stimulus: string;
    type: string;
    validation: {
      scoring_type: "exactMatch";
      valid_response: { score: 1; value: string[] };
    };
    score: 1;
    minScore: 0;
  };
  itemId: number;
  maxScore: 1;
  minScore: 0;
  id: number;
}

export const questionsDecoder: Decoder<Question[]> = array(
  object({
    data: object({
      options: array(
        object({
          label: string(),
          value: oneOf(constant("0"), constant("1"), constant("2"))
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
          value: array(oneOf(constant("0"), constant("1"), constant("2")))
        })
      }),
      score: constant(1),
      minScore: constant(0)
    }),
    itemId: number(),
    maxScore: constant(1),
    minScore: constant(0),
    id: number()
  })
);
