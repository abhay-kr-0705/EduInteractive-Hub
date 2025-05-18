import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Flashcard from '../components/Flashcard';

// Interface for flashcard data
interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

// Sample flashcard data
const sampleFlashcards: FlashcardData[] = [
  { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
  { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript that looks like HTML" },
  { id: 3, question: "What is a component in React?", answer: "A reusable piece of code that returns React elements" },
  { id: 4, question: "What is a prop in React?", answer: "A way to pass data from parent to child components" },
  { id: 5, question: "What is a state in React?", answer: "A built-in object used to store data that may change over time" },
  { id: 6, question: "What is a hook in React?", answer: "Functions that let you use state and other React features without writing a class" },
  { id: 7, question: "What is useEffect?", answer: "A hook to perform side effects in function components" },
  { id: 8, question: "What is virtual DOM?", answer: "A lightweight copy of the DOM that React uses to optimize performance" },
  { id: 9, question: "What is Redux?", answer: "A state management library for JavaScript applications" },
  { id: 10, question: "What is React Router?", answer: "A library for handling routing in React applications" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #2ecc71;
  transition: width 0.5s ease-in-out;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
`;

const Stat = styled.div`
  text-align: center;
  
  h2 {
    margin: 0;
    color: #4a6fa5;
  }
  
  p {
    margin: 0.5rem 0 0;
    color: #666;
  }
`;

const ControlButton = styled.button`
  background-color: #4a6fa5;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  
  &:hover {
    background-color: #395a86;
  }
`;

const Message = styled.div`
  font-size: 1.5rem;
  color: #4a6fa5;
  margin: 2rem 0;
  text-align: center;
`;

const Flashcards: React.FC = () => {
  const [deck, setDeck] = useState<FlashcardData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [isDeckComplete, setIsDeckComplete] = useState(false);

  // Initialize deck
  useEffect(() => {
    resetDeck();
  }, []);

  const resetDeck = () => {
    // Shuffle the deck
    const shuffledDeck = [...sampleFlashcards].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setCurrentCardIndex(0);
    setKnownCount(0);
    setTotalCards(shuffledDeck.length);
    setIsDeckComplete(false);
  };

  const handleKnown = () => {
    setKnownCount(knownCount + 1);
    moveToNextCard();
  };

  const handleDontKnow = () => {
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentCardIndex < deck.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setIsDeckComplete(true);
    }
  };

  const progressPercentage = totalCards > 0 ? ((currentCardIndex + (isDeckComplete ? 1 : 0)) / totalCards) * 100 : 0;

  return (
    <Container>
      <ProgressBar>
        <Progress width={progressPercentage} />
      </ProgressBar>
      
      <Stats>
        <Stat>
          <h2>{currentCardIndex + (isDeckComplete ? 0 : 1)}</h2>
          <p>Current Card</p>
        </Stat>
        <Stat>
          <h2>{totalCards}</h2>
          <p>Total Cards</p>
        </Stat>
        <Stat>
          <h2>{knownCount}</h2>
          <p>Known</p>
        </Stat>
        <Stat>
          <h2>{currentCardIndex + (isDeckComplete ? 0 : 1) - knownCount}</h2>
          <p>Don't Know</p>
        </Stat>
      </Stats>
      
      {!isDeckComplete && deck.length > 0 ? (
        <Flashcard
          question={deck[currentCardIndex].question}
          answer={deck[currentCardIndex].answer}
          onKnow={handleKnown}
          onDontKnow={handleDontKnow}
        />
      ) : (
        <div>
          <Message>
            You've completed the deck!
            <br />
            You knew {knownCount} out of {totalCards} cards.
          </Message>
          <ControlButton onClick={resetDeck}>Restart Deck</ControlButton>
        </div>
      )}
    </Container>
  );
};

export default Flashcards; 