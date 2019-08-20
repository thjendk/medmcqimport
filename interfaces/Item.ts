import { Question } from "./Question";
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
