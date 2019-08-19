import { Flow, flowDecoder } from "../interfaces/Flow";
import checkFlow from "./checkFlow";

export class Item {
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

  constructor(item: any) {
    this.baseId = item.baseId;
    this.id = item.id;
    this.features = item.features;
    this["i  d"] = item["i  d"];
    this.index = item.index;
    this.parentId = item.parentId;
    this.questions = item.questions;
    this.showAsItem = item.showAsItem;
    this.title = item.title;
    this.tools = item.tools;
  }
}

class Question {
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

  constructor(question: any) {
    this.data = question.data;
    this.itemId = question.itemId;
    this.maxScore = question.maxScore;
    this.minScore = question.minScore;
    this.id = question.id;
  }
}

const splitExport = async (flows: any[]) => {
  try {
    let flow = flows[0];
    if (
      await checkFlow({
        obj: flow,
        decoders: [{ path: "", decoder: flowDecoder }]
      })
    )
      console.log(flow);
  } catch (err) {
    console.error(err);
  }
};

export default splitExport;
