import { Question } from "../interfaces/Question";
import { parseQuestionAnswers } from "./parseQuestionAnswers";

import TurndownService = require("turndown");
import turndownPluginGfm = require("turndown-plugin-gfm");
const turndownService = new TurndownService().use(turndownPluginGfm.gfm);

export interface CorrectAnswer {
  answer: number;
}

export class QuestionAnswers {
  answer1: string = "";
  answer2: string = "";
  answer3: string = "";
  correctAnswers: CorrectAnswer[] = [];
}
export class ParsedQuestion extends QuestionAnswers {
  text: string = "";

  image: string | undefined;
  examSetQno: number = 0;

  fillAnswers({ answer1, answer2, answer3, correctAnswers }: QuestionAnswers) {
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.correctAnswers = correctAnswers;
  }
}

export const parseQuestion = (
  questionRaw: Question,
  examSetQno: number
): ParsedQuestion => {
  let { stimulus } = questionRaw.data;
  let parsedQuestion = new ParsedQuestion();

  // examSetQno
  parsedQuestion.examSetQno = examSetQno;

  // billeder
  const imgRegex = /<img src=\"(.*?)\".*?>/;
  let image = stimulus.match(imgRegex);
  if (image) {
    parsedQuestion.image = image[1];
    // fjern billed-tagget fra teksten
    stimulus = stimulus.replace(imgRegex, "");
  }

  // Tekst
  // fjern Item-overskrift
  parsedQuestion.text = stimulus.replace(/^<p>Item [0-9]{1,2}<\/p>/, "");
  // Konverter HTML til markdown
  parsedQuestion.text = turndownService.turndown(parsedQuestion.text);
  // Svar og korrekte svar
  parsedQuestion.fillAnswers(parseQuestionAnswers(questionRaw));

  return parsedQuestion;
};
