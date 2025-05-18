import React, { useState } from 'react';
import styled from 'styled-components';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const Container = styled.div`
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  color: #4a6fa5;
  margin-bottom: 2rem;
  text-align: center;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const QuestionText = styled.h2`
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.button<{ selected?: boolean; correct?: boolean; incorrect?: boolean }>`
  padding: 1rem;
  background-color: ${props => {
    if (props.correct) return '#2ecc71';
    if (props.incorrect) return '#e74c3c';
    if (props.selected) return '#3498db';
    return 'white';
  }};
  color: ${props => {
    if (props.correct || props.incorrect || props.selected) return 'white';
    return '#333';
  }};
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => {
      if (props.correct) return '#2ecc71';
      if (props.incorrect) return '#e74c3c';
      if (props.selected) return '#3498db';
      return '#f5f5f5';
    }};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: #4a6fa5;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #395a86;
  }
`;

const ScoreCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
`;

const ScoreText = styled.h2`
  color: #4a6fa5;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ScoreDescription = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

// Sample quiz questions
const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Venus", "Mars", "Saturn"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: 1
  }
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (!showAnswer) {
      setSelectedOption(index);
    }
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        setQuizCompleted(true);
      }
    } else {
      setShowAnswer(true);
    }
  };

  const handleCheck = () => {
    setShowAnswer(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Container>
      <Title>Knowledge Quiz</Title>
      
      {!quizCompleted ? (
        <>
          <QuestionCard>
            <QuestionText>
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </QuestionText>
            <OptionsList>
              {currentQuestion.options.map((option, index) => (
                <Option 
                  key={index}
                  selected={selectedOption === index}
                  correct={showAnswer && index === currentQuestion.correctAnswer}
                  incorrect={showAnswer && selectedOption === index && index !== currentQuestion.correctAnswer}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </Option>
              ))}
            </OptionsList>
          </QuestionCard>
          
          <ButtonContainer>
            {!showAnswer && (
              <Button onClick={handleCheck}>Check Answer</Button>
            )}
            {showAnswer && (
              <Button onClick={handleNext}>
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </ButtonContainer>
        </>
      ) : (
        <ScoreCard>
          <ScoreText>Your Score: {score}/{quizQuestions.length}</ScoreText>
          <ScoreDescription>
            {score === quizQuestions.length 
              ? 'Perfect! You got all questions right!' 
              : score >= quizQuestions.length / 2 
                ? 'Good job! You passed the quiz.' 
                : 'Keep practicing to improve your score.'}
          </ScoreDescription>
          <Button onClick={handleRetry}>Retry Quiz</Button>
        </ScoreCard>
      )}
    </Container>
  );
};

export default Quiz; 