import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';
import * as mitigationQuestions from './data/questions_mitigation.json';

@Injectable()
export class EnvironmentQuestionsService {
  questions = environmentQuestions;

  getQuestions(): any {
    const randomizedQuestions = [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      randomizedQuestions.push(this.questions[randomIndex]);
      this.questions.splice(randomIndex, 1);
    }

    return randomizedQuestions.map((question) => {
      const randomQuestion = JSON.parse(JSON.stringify(question));

      randomQuestion.answers.forEach((answer) => {
        delete answer.isCorrect;
      });

      return randomQuestion;
    });
  }

  checkAnswers(questionIndex: number, selectedAnswers: number[]): boolean {
    const questionAnswers = this.questions[questionIndex].answers;
    const correctAnswersIndexes = questionAnswers
      .map((answer, index) => (answer.isCorrect ? index : -1))
      .filter((index) => index !== -1);

    const allSelectedAreCorrect = selectedAnswers.every((answer) =>
      correctAnswersIndexes.includes(answer)
    );
    const allCorrectAreSelected = correctAnswersIndexes.every((answer) =>
      selectedAnswers.includes(answer)
    );

    return allSelectedAreCorrect && allCorrectAreSelected;
  }
}

@Injectable()
export class MitigationQuestionsService extends EnvironmentQuestionsService {
  questions = mitigationQuestions;
}
