import * as fs from "fs";
import { Flow } from "../interfaces/Flow";
import { Question } from "../interfaces/Question";
import { parseQuestion, ParsedQuestion } from "./parseQuestion";

// Grimt typecheck fix med number hhv. string tilladt :-(
interface ExamSetMetadata {
  semester: 7 | 8 | 9 | 11 | number;
  exam: { year: number; season: "F" | "E" | string };
}

class ExamSet {
  activityId: number | undefined;
  semesterId: 1 | 2 | 3 | 4 | undefined;
  semesterName: "Inf" | "Abd" | "HLK" | "GOP" | undefined;
  season: "E" | "F" | string | undefined;
  year: number | undefined;
  questions: ParsedQuestion[] | undefined;

  fillMetadata(metadata: ExamSetMetadata) {
    let semesterId: ExamSet["semesterId"];
    let semesterName: ExamSet["semesterName"];

    switch (metadata.semester) {
      case 7:
        semesterId = 1;
        semesterName = "Inf";
        break;
      case 8:
        semesterId = 2;
        semesterName = "Abd";
        break;
      case 9:
        semesterId = 3;
        semesterName = "HLK";
        break;
      case 11:
        semesterId = 1;
        semesterName = "GOP";
        break;
    }

    this.semesterId = semesterId;
    this.semesterName = semesterName;
    this.season = metadata.exam.season;
    this.year = metadata.exam.year;
  }
  toJSON() {
    return JSON.stringify({
      semesterId: this.semesterId,
      season: this.season,
      year: this.year,
      questions: this.questions
    });
  }

  writeToFile() {
    if (!fs.existsSync("examsets")) fs.mkdirSync("examsets");
    let fileName = `examsets/${this.semesterName}-${this.year}${this.season}-${
      this.activityId
    }.json`;
    fs.writeFileSync(fileName, this.toJSON());
    console.log(`Skrev sættet til filen ${fileName}`);
  }
}

export const parseFlow = (flow: Flow, metadata: ExamSetMetadata): ExamSet => {
  const examSet = new ExamSet();
  examSet.activityId = flow.activityId;
  examSet.fillMetadata(metadata);
  const questionsRaw: Question[] = [];
  flow.items.forEach(item => {
    // enkelte sæt har en "intro-tekst" til hvert spørgsmål i item.features
    // -- dette kræver at der kun er 1 spørsmål til hver item, derfor
    //    nedenstående fix
    if (item.questions.length === 1 && item.features) {
      item.questions[0].data.stimulus =
        item.features + "<p></p>" + item.questions[0].data.stimulus;
    }

    item.questions.forEach(question => questionsRaw.push(question));
  });
  const questions = questionsRaw.map((question, index) =>
    parseQuestion(question, index + 1)
  );
  examSet.questions = questions;

  return examSet;
};
