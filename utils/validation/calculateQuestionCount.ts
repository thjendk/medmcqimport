import { Flow } from "../../interfaces/Flow";

export const calculateQuestionCount = (flow: Flow): number => {
  let questions = 0;
  flow.items.forEach(item => (questions += item.questions.length));
  return questions;
};
