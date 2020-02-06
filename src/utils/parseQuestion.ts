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
export interface Image {
  link: string;
}

export class ParsedQuestion extends QuestionAnswers {
  text: string = "";
  images: Image[] = [];
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
    parsedQuestion.images = [{ link: image[1] }];
    // fjern billed-tagget fra teksten
    stimulus = stimulus.replace(imgRegex, "");
  }

  // Tekst
  // Konverter HTML til markdown
  parsedQuestion.text = turndownService.turndown(stimulus);
  // fjern Item-overskrift
  parsedQuestion.text = parsedQuestion.text.replace(
    /^\s*Item [0-9]{1,2}\s*/,
    ""
  );
  // Svar og korrekte svar
  parsedQuestion.fillAnswers(parseQuestionAnswers(questionRaw));

  return parsedQuestion;
};
