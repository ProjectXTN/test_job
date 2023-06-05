import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import React from 'react';

import { Button } from '../../components/Button';
import { Container, Row } from './styles';

// Les types pour les réponses et les questions
type Answer = {
  answer: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

export function Quiz1() {
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number>>([]);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [error, setError] = useState(null);

  // Charger les questions depuis le serveur
  useEffect(() => {
    fetch("/environment_questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data: Question[]) => setQuestions(data))
      .catch((error) => {
        console.error('Error:', error);
        setError(error);
      });
  }, []);
  
  // Fonctionalite pour gérer le clic sur une option de réponse
  const handleAnswerOptionClick = (index: number) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter((value) => value !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  // Fonctionalite pour gérer le clic sur le bouton de la question suivante
  const handleNextQuestionClick = () => {
    const questionAnswers = questions![currentQuestionIndex].answers;
    const correctAnswersIndexes = questionAnswers
      .map((answer, index) => answer.isCorrect ? index : -1)
      .filter(index => index !== -1);
    
    const allSelectedAreCorrect = selectedAnswers.every(answer => correctAnswersIndexes.includes(answer));
    const allCorrectAreSelected = correctAnswersIndexes.every(answer => selectedAnswers.includes(answer));
  
    if (allSelectedAreCorrect && allCorrectAreSelected) {
      setCorrectAnswers(correctAnswers + 1);
    }
  
    setSelectedAnswers([]);
  
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions!.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowButton(true);
    }
  };
  
  // Affichage du score utilisateur
  const handleSoumetreClick = () => {
    setShowScore(true);
  };

  // Rafraîchir la page
  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <Row>
        <h1>Teste tes connaissances sur l'environnement</h1>
      </Row>
      {questions && (
        <>
        <Container>
        <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span>/
              {questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestionIndex].question}
            </div>
          </div>
          <Container>
            <div className="answer-section">
              {questions[currentQuestionIndex].answers.map(
                (answer: Answer, index: number) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={selectedAnswers.includes(index)}
                      onChange={() => handleAnswerOptionClick(index)}
                    />
                    {answer.answer}
                  </label>
                )
              )}
            </div>
          </Container>
          <Button title="Question suivant" variant="primary" onClick={handleNextQuestionClick}/>
          {showButton && (
            <div className="soumetre-section">
              <button onClick={handleSoumetreClick}>Soumetre</button>
              <button onClick={handleReloadPage}>Relancer le quizz</button>
            </div>
          )}
          {showScore && (
            <div className="score-section">
              Tu as marqué {correctAnswers} sur {questions?.length} questions
            </div>
          )}
            <Link to="/quiz2">Passe un autre quiz pour découvrir comment tu peux aider à protéger l'environnement</Link>
        </Container>
        </>
      )}
    </div>
  );
}

export default Quiz1;
