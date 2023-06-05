import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Container, Row } from './styles';

type Answer = {
  answer: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

export function Quiz2() {
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number>>([]);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [error, setError] = useState(null);

  // Charger les questions depuis le serveur
  useEffect(() => {
    fetch("/mitigation_questions")
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
      <Container>
          <h1>Teste tes connaissances sur les actions pour aider l'environnement</h1>
        {questions && (
          <>
          <Row>
          <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestionIndex + 1}</span>/
                {questions.length}
              </div>
              <p className="question-text">
                  {questions[currentQuestionIndex]?.question}
              </p>
            </div>
            <div className="answer-section">
            {questions[currentQuestionIndex]?.answers.map(
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
            <Button title="Question suivant" variant="secondary" onClick={handleNextQuestionClick}/>
            {showButton && (
              <div className="soumetre-section">
                <button onClick={handleSoumetreClick}>Soumetre</button>
              </div>
            )}
            {showScore && (
              <div className="score-section">
                Tu as marqué {correctAnswers} sur {questions?.length} questions
              </div>
            )}
              <Link to="/">Revenir sur le premier Quiz</Link>
          </Row>
          </>
        )}
      </Container>
      
    </div>
  );
}

export default Quiz2;
