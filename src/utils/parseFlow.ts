import request = require("request-promise");
import colors = require("colors/safe");
import * as fs from "fs";
import { Flow } from "../interfaces/Flow";
import { Question } from "../interfaces/Question";
import { parseQuestion, ParsedQuestion } from "./parseQuestion";
import { rootPath } from "../index";

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
  questions: ParsedQuestion[] = [];

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
        semesterId = 4;
        semesterName = "GOP";
        break;
    }

    this.semesterId = semesterId;
    this.semesterName = semesterName;
    this.season = metadata.exam.season;
    this.year = metadata.exam.year;
  }
  stringifySetInfo() {
    return `${this.semesterName}-${this.year}${this.season}`;
  }

 async downloadImages() {
    if (this.semesterId === 4) {
      console.log(colors.yellow("Fjerner billeder, da det er 11. semester"));
      this.questions = this.questions.map(question => {
        delete question.images;
        return question;
      });
    } else {
      this.questions = await Promise.all(this.questions.map(async question => {
        if (question.images.length > 0) {
          let imgDir = rootPath + "/output/images";
          if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
          const imageName = `${this.stringifySetInfo()}-${
            question.examSetQno
          }.jpg`;
          
          await request({ uri: question.images[0].link, encoding: "binary" })
          .then(body => {
              const imageFile = fs.createWriteStream(`${imgDir}/${imageName}`);
              imageFile.write(body, "binary");
              imageFile.end();
              question.images[0].link = imageName;
            })
            .catch(() => {
              console.error(
                colors.red(
                  "Kunne ikke hente billede til spørgsmål " +
                  question.examSetQno
                  )
                  );
                });
              }
        return question;
      }));
    }
  }

  toJSON() {
    return JSON.stringify({
      semesterId: this.semesterId,
      season: this.season,
      year: this.year,
      questions: this.questions
    });
  }

  async writeToFile() {
    if (!fs.existsSync(rootPath + "/output"))
      fs.mkdirSync(rootPath + "/output");

    await this.downloadImages();

    let fileName = `${rootPath}/output/${this.stringifySetInfo()}-${
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
