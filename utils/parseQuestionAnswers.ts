import { Question } from "../interfaces/Question";
import { QuestionAnswers } from "./parseQuestion";

import TurndownService = require("turndown");
import turndownPluginGfm = require("turndown-plugin-gfm");
const turndownService = new TurndownService().use(turndownPluginGfm.gfm);
import shuffle = require("lodash.shuffle");

export const parseQuestionAnswers = (question: Question): QuestionAnswers => {
  let { options, validation } = question.data;
  let parsedAnswers = new QuestionAnswers();
  // Formater svarmuligheder:
  let answers = options.map(answer => turndownService.turndown(answer.label));
  answers = shuffle(answers);

  parsedAnswers.answer1 = answers[0];
  parsedAnswers.answer2 = answers[1];
  parsedAnswers.answer3 = answers[2];

  // Find det korrekte svar:
  const validResponseValue = validation.valid_response.value;
  let correctAnswerValues: string[];
  if (Array.isArray(validResponseValue)) {
    correctAnswerValues = validResponseValue;
  } else {
    correctAnswerValues = [validResponseValue];
  }
  options.forEach(option => {
    if (correctAnswerValues.includes(option.value)) {
      const answer =
        answers.indexOf(turndownService.turndown(option.label)) + 1;
      parsedAnswers.correctAnswers.push({ answer });
    }
  });
  return parsedAnswers;
};
