import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Container = styled.div`
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  color: #4a6fa5;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
`;

const DifficultyIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const DifficultyBadge = styled.div<{ active: boolean; difficulty: string }>`
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 20px;
  font-weight: bold;
  opacity: ${props => props.active ? 1 : 0.3};
  background-color: ${props => {
    switch (props.difficulty) {
      case 'easy': return '#e6f7ed';
      case 'medium': return '#fff4de';
      case 'hard': return '#fde8e8';
      default: return '#e6f7ed';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'easy': return '#2ecc71';
      case 'medium': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#2ecc71';
    }
  }};
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

const ProgressCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;

const ProgressStat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a6fa5;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
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

// Sample questions with different difficulty levels
const allQuestions: Question[] = [
  // Easy questions
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Venus", "Mars", "Saturn"],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "How many continents are there in the world?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  
  // Medium questions
  {
    id: 4,
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 6,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  
  // Hard questions
  {
    id: 7,
    question: "What is the smallest prime number greater than 100?",
    options: ["101", "103", "107", "109"],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 8,
    question: "In quantum physics, what is the name of the principle that states you cannot simultaneously know the exact position and momentum of a particle?",
    options: ["Einstein's Theory", "Heisenberg's Uncertainty Principle", "Schrödinger's Cat Principle", "Pauli Exclusion Principle"],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 9,
    question: "Which of these elements has the highest atomic number?",
    options: ["Uranium", "Plutonium", "Californium", "Einsteinium"],
    correctAnswer: 3,
    difficulty: 'hard'
  },
];

const AdaptiveQuiz: React.FC = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([...allQuestions]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Initialize or get new question
  useEffect(() => {
    if (!currentQuestion && availableQuestions.length > 0 && !quizCompleted) {
      getNewQuestion();
    }
  }, [currentQuestion, availableQuestions, quizCompleted]);
  
  const getNewQuestion = () => {
    // Filter questions by current difficulty
    const difficultyQuestions = availableQuestions.filter(q => q.difficulty === currentDifficulty);
    
    if (difficultyQuestions.length === 0) {
      // If no questions left for current difficulty, try any available question
      if (availableQuestions.length === 0) {
        setQuizCompleted(true);
        return;
      }
      
      // Pick a random question from available ones
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const question = availableQuestions[randomIndex];
      
      // Remove this question from available pool
      setAvailableQuestions(prev => prev.filter(q => q.id !== question.id));
      setCurrentQuestion(question);
    } else {
      // Pick a random question from current difficulty
      const randomIndex = Math.floor(Math.random() * difficultyQuestions.length);
      const question = difficultyQuestions[randomIndex];
      
      // Remove this question from available pool
      setAvailableQuestions(prev => prev.filter(q => q.id !== question.id));
      setCurrentQuestion(question);
    }
  };
  
  const adjustDifficulty = (isCorrect: boolean) => {
    if (isCorrect) {
      setConsecutiveCorrect(prev => prev + 1);
      setConsecutiveIncorrect(0);
      
      // Increase difficulty after 2 consecutive correct answers
      if (consecutiveCorrect + 1 >= 2) {
        if (currentDifficulty === 'easy') {
          setCurrentDifficulty('medium');
        } else if (currentDifficulty === 'medium') {
          setCurrentDifficulty('hard');
        }
        setConsecutiveCorrect(0);
      }
    } else {
      setConsecutiveIncorrect(prev => prev + 1);
      setConsecutiveCorrect(0);
      
      // Decrease difficulty after 2 consecutive wrong answers
      if (consecutiveIncorrect + 1 >= 2) {
        if (currentDifficulty === 'hard') {
          setCurrentDifficulty('medium');
        } else if (currentDifficulty === 'medium') {
          setCurrentDifficulty('easy');
        }
        setConsecutiveIncorrect(0);
      }
    }
  };
  
  const handleOptionSelect = (index: number) => {
    if (!showAnswer) {
      setSelectedOption(index);
    }
  };
  
  const handleCheck = () => {
    setShowAnswer(true);
  };
  
  const handleNext = () => {
    if (selectedOption !== null && currentQuestion) {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      adjustDifficulty(isCorrect);
      setQuestionsAnswered(prev => prev + 1);
      
      // Maximum 10 questions
      if (questionsAnswered >= 9) {
        setQuizCompleted(true);
      } else {
        setSelectedOption(null);
        setShowAnswer(false);
        setCurrentQuestion(null); // This will trigger getting a new question
      }
    }
  };
  
  const handleRetry = () => {
    setCurrentDifficulty('easy');
    setScore(0);
    setQuestionsAnswered(0);
    setConsecutiveCorrect(0);
    setConsecutiveIncorrect(0);
    setAvailableQuestions([...allQuestions]);
    setSelectedOption(null);
    setShowAnswer(false);
    setQuizCompleted(false);
    setCurrentQuestion(null); // This will trigger getting a new question
  };
  
  if (!currentQuestion && !quizCompleted) {
    return (
      <Container>
        <Title>Adaptive Quiz</Title>
        <Subtitle>Loading question...</Subtitle>
      </Container>
    );
  }
  
  // We've already checked that currentQuestion isn't null
  const question = currentQuestion as Question;
  
  return (
    <Container>
      <Title>Adaptive Quiz</Title>
      <Subtitle>Questions adapt to your skill level</Subtitle>
      
      {!quizCompleted ? (
        <>
          <DifficultyIndicator>
            <DifficultyBadge active={currentDifficulty === 'easy'} difficulty="easy">
              Easy
            </DifficultyBadge>
            <DifficultyBadge active={currentDifficulty === 'medium'} difficulty="medium">
              Medium
            </DifficultyBadge>
            <DifficultyBadge active={currentDifficulty === 'hard'} difficulty="hard">
              Hard
            </DifficultyBadge>
          </DifficultyIndicator>
          
          <ProgressCard>
            <ProgressStat>
              <StatNumber>{questionsAnswered}</StatNumber>
              <StatLabel>Questions Answered</StatLabel>
            </ProgressStat>
            <ProgressStat>
              <StatNumber>{score}</StatNumber>
              <StatLabel>Correct Answers</StatLabel>
            </ProgressStat>
            <ProgressStat>
              <StatNumber>{Math.floor((score / Math.max(1, questionsAnswered)) * 100)}%</StatNumber>
              <StatLabel>Success Rate</StatLabel>
            </ProgressStat>
          </ProgressCard>
          
          <QuestionCard>
            <QuestionText>
              {question.question}
            </QuestionText>
            <OptionsList>
              {question.options.map((option, index) => (
                <Option 
                  key={index}
                  selected={selectedOption === index}
                  correct={showAnswer && index === question.correctAnswer}
                  incorrect={showAnswer && selectedOption === index && index !== question.correctAnswer}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </Option>
              ))}
            </OptionsList>
          </QuestionCard>
          
          <ButtonContainer>
            {!showAnswer && selectedOption !== null && (
              <Button onClick={handleCheck}>Check Answer</Button>
            )}
            {showAnswer && (
              <Button onClick={handleNext}>Next Question</Button>
            )}
          </ButtonContainer>
        </>
      ) : (
        <ScoreCard>
          <ScoreText>Your Score: {score}/10</ScoreText>
          <ScoreDescription>
            {score >= 8 
              ? 'Excellent! You have mastered this quiz.' 
              : score >= 5 
                ? 'Good job! You have a solid understanding.' 
                : 'Keep practicing to improve your knowledge.'}
          </ScoreDescription>
          <Button onClick={handleRetry}>Restart Quiz</Button>
        </ScoreCard>
      )}
    </Container>
  );
};

export default AdaptiveQuiz; 