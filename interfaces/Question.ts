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
  maxScore: 0;
  minScore: 1;
  id: number;
}
