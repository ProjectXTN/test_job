import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';
import * as mitigationQuestions from './data/questions_mitigation.json';

@Injectable()
export class EnvironmentQuestionsService {
  // Chargement des questions à partir du fichier JSON
  questions = environmentQuestions;

  // Méthode pour obtenir 5 questions aléatoires
  getQuestions(): any {
    const randomizedQuestions = [];

    // Sélection de 5 questions aléatoires
    for (let i = 0; i < 5; i++) {
      // Générer un index aléatoire
      const randomIndex = Math.floor(Math.random() * this.questions.length);

      // Vérifiez si la question existe
      if (this.questions[randomIndex] !== undefined) {
        // Ajoute la question à la liste des questions aléatoires
        randomizedQuestions.push(this.questions[randomIndex]);
        // Supprimer la question de la liste de questions d'origine pour éviter les doublons
        this.questions.splice(randomIndex, 1);
      } else {
        console.error('Erro: this.questions[randomIndex] é undefined');
      }
    }

    // Map des questions aléatoires pour supprimer la propriété isCorrect des réponses
    return randomizedQuestions.map((question) => {
      if (question !== undefined) {
        // Crée une copie de la question pour éviter la mutation de l'objet d'origine
        const randomQuestion = JSON.parse(JSON.stringify(question));

        // randomQuestion.answers.forEach((answer) => {
        //   delete answer.isCorrect;
        // });

        // Renvoie la question modifiée
        return randomQuestion;
      } else {
        console.error('Erro: question é undefined');
        return null;
      }
    });
  }

  // Méthode pour vérifier si les réponses sélectionnées pour une question sont correctes
  checkAnswers(questionIndex: number, selectedAnswers: number[]): boolean {
    // Récuperer les réponses à la question posée
    const questionAnswers = this.questions[questionIndex].answers;

    // Map les réponses pour obtenir les index des bonnes réponses
    const correctAnswersIndexes = questionAnswers
      .map((answer, index) => (answer.isCorrect ? index : -1))
      .filter((index) => index !== -1);

    // Vérifie si toutes les réponses sélectionnées sont correctes
    const allSelectedAreCorrect = selectedAnswers.every((answer) =>
      correctAnswersIndexes.includes(answer),
    );
    // Vérifie les bonnes réponses ont été sélectionnées
    const allCorrectAreSelected = correctAnswersIndexes.every((answer) =>
      selectedAnswers.includes(answer),
    );

    // Renvoie true si les deux conditions ci-dessus sont remplies
    return allSelectedAreCorrect && allCorrectAreSelected;
  }
}

@Injectable()
export class MitigationQuestionsService extends EnvironmentQuestionsService {
  // Chargement des questions à partir du fichier JSON
  questions = mitigationQuestions;
}
