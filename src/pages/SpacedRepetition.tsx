import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Card {
  id: number;
  question: string;
  answer: string;
  lastReviewed: Date | null;
  nextReview: Date | null;
  difficulty: 'easy' | 'medium' | 'hard';
  box: number; // 1-5 for spaced repetition box
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

const CardContainer = styled.div`
  perspective: 1000px;
  margin-bottom: 2rem;
`;

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 300px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
`;

const CardFront = styled(CardSide)`
  background-color: #ffffff;
`;

const CardBack = styled(CardSide)`
  background-color: #f5f7fa;
  transform: rotateY(180deg);
`;

const CardText = styled.div`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
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

const FlipButton = styled(Button)`
  margin-bottom: 0;
`;

const DifficultyButton = styled(Button)<{ difficulty: string }>`
  background-color: ${props => {
    switch (props.difficulty) {
      case 'easy': return '#2ecc71';
      case 'medium': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#4a6fa5';
    }
  }};
  
  &:hover {
    background-color: ${props => {
      switch (props.difficulty) {
        case 'easy': return '#27ae60';
        case 'medium': return '#e67e22';
        case 'hard': return '#c0392b';
        default: return '#395a86';
      }
    }};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #4a6fa5;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  text-align: center;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex: 1;
  margin: 0 0.5rem;
`;

const InfoTitle = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #4a6fa5;
`;

const NoCardsMessage = styled.div`
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Sample cards with spaced repetition data
const sampleCards: Card[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
    lastReviewed: null,
    nextReview: null,
    difficulty: 'easy',
    box: 1
  },
  {
    id: 2,
    question: "What is the formula for calculating area of a circle?",
    answer: "πr²",
    lastReviewed: null,
    nextReview: null,
    difficulty: 'medium',
    box: 1
  },
  {
    id: 3,
    question: "Who wrote 'Pride and Prejudice'?",
    answer: "Jane Austen",
    lastReviewed: null,
    nextReview: null,
    difficulty: 'easy',
    box: 1
  },
  {
    id: 4,
    question: "What is the Pythagorean theorem?",
    answer: "a² + b² = c²",
    lastReviewed: null,
    nextReview: null,
    difficulty: 'medium',
    box: 1
  },
  {
    id: 5,
    question: "What year did World War II end?",
    answer: "1945",
    lastReviewed: null,
    nextReview: null,
    difficulty: 'easy',
    box: 1
  }
];

const SpacedRepetition: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(sampleCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsCompleted, setCardsCompleted] = useState(0);
  const [reviewsScheduled, setReviewsScheduled] = useState(0);
  
  // Get cards due for review today
  const getDueCards = () => {
    const today = new Date();
    return cards.filter(card => 
      card.nextReview === null || 
      new Date(card.nextReview) <= today
    );
  };
  
  const [dueCards, setDueCards] = useState<Card[]>(getDueCards());
  
  useEffect(() => {
    // Update due cards when cards change
    setDueCards(getDueCards());
  }, [cards]);
  
  // Calculate days to add based on box number
  const getNextReviewDate = (boxNumber: number): Date => {
    const today = new Date();
    let daysToAdd = 1;
    
    // Implement spaced repetition algorithm
    // Box 1: 1 day, Box 2: 3 days, Box 3: 7 days, Box 4: 14 days, Box 5: 30 days
    switch(boxNumber) {
      case 1: daysToAdd = 1; break;
      case 2: daysToAdd = 3; break;
      case 3: daysToAdd = 7; break;
      case 4: daysToAdd = 14; break;
      case 5: daysToAdd = 30; break;
      default: daysToAdd = 1;
    }
    
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);
    return nextDate;
  };
  
  const handleKnowClick = () => {
    if (dueCards.length === 0) return;
    
    const currentCard = dueCards[currentCardIndex];
    const newBox = Math.min(currentCard.box + 1, 5);
    const nextReview = getNextReviewDate(newBox);
    
    // Update the card
    const updatedCards = cards.map(card => 
      card.id === currentCard.id
        ? { 
            ...card, 
            box: newBox, 
            lastReviewed: new Date(), 
            nextReview, 
            difficulty: (newBox >= 4 ? 'easy' : card.difficulty) as 'easy' | 'medium' | 'hard'
          }
        : card
    );
    
    setCards(updatedCards);
    setCardsCompleted(prev => prev + 1);
    setReviewsScheduled(prev => prev + 1);
    
    // Move to next card or reset if all cards reviewed
    handleNextCard();
  };
  
  const handleHardClick = () => {
    if (dueCards.length === 0) return;
    
    const currentCard = dueCards[currentCardIndex];
    // For hard cards, keep in box 1 or move down a box
    const newBox = Math.max(1, currentCard.box - 1);
    const nextReview = getNextReviewDate(newBox);
    
    // Update the card
    const updatedCards = cards.map(card => 
      card.id === currentCard.id
        ? { 
            ...card, 
            box: newBox, 
            lastReviewed: new Date(), 
            nextReview, 
            difficulty: 'hard' as 'hard'
          }
        : card
    );
    
    setCards(updatedCards);
    setCardsCompleted(prev => prev + 1);
    setReviewsScheduled(prev => prev + 1);
    
    // Move to next card or reset if all cards reviewed
    handleNextCard();
  };
  
  const handleNextCard = () => {
    setIsFlipped(false);
    
    if (currentCardIndex < dueCards.length - 1) {
      // Still have cards to review
      setCurrentCardIndex(prev => prev + 1);
    } else {
      // All cards reviewed, update due cards
      setDueCards(getDueCards());
      setCurrentCardIndex(0);
    }
  };
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // If no cards are due
  if (dueCards.length === 0) {
    return (
      <Container>
        <Title>Spaced Repetition</Title>
        <Subtitle>Learn effectively with scheduled reviews</Subtitle>
        
        <InfoContainer>
          <InfoItem>
            <InfoTitle>All caught up!</InfoTitle>
            <InfoValue>No cards due for review</InfoValue>
          </InfoItem>
        </InfoContainer>
        
        <NoCardsMessage>
          <p>You've completed all reviews for today. Check back later for more cards.</p>
          <p>Total cards in system: {cards.length}</p>
          <p>Cards completed today: {cardsCompleted}</p>
        </NoCardsMessage>
      </Container>
    );
  }
  
  const currentCard = dueCards[currentCardIndex];
  const progressPercentage = (currentCardIndex / dueCards.length) * 100;
  
  return (
    <Container>
      <Title>Spaced Repetition</Title>
      <Subtitle>Learn effectively with scheduled reviews</Subtitle>
      
      <InfoContainer>
        <InfoItem>
          <InfoTitle>Cards Due</InfoTitle>
          <InfoValue>{dueCards.length}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoTitle>Completed</InfoTitle>
          <InfoValue>{cardsCompleted}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoTitle>Next Review</InfoTitle>
          <InfoValue>{currentCard.box < 5 ? `Box ${currentCard.box + 1}` : 'Mastered'}</InfoValue>
        </InfoItem>
      </InfoContainer>
      
      <ProgressBar>
        <Progress width={progressPercentage} />
      </ProgressBar>
      
      <CardContainer>
        <CardInner isFlipped={isFlipped}>
          <CardFront>
            <CardText>{currentCard.question}</CardText>
            <FlipButton onClick={handleFlip}>
              Show Answer
            </FlipButton>
          </CardFront>
          <CardBack>
            <CardText>{currentCard.answer}</CardText>
            <ButtonContainer>
              <DifficultyButton 
                onClick={handleHardClick} 
                difficulty="hard"
              >
                Difficult
              </DifficultyButton>
              <DifficultyButton 
                onClick={handleKnowClick} 
                difficulty="easy"
              >
                I Know It
              </DifficultyButton>
            </ButtonContainer>
          </CardBack>
        </CardInner>
      </CardContainer>
      
      <div style={{ textAlign: 'center' }}>
        Card {currentCardIndex + 1} of {dueCards.length} • Box: {currentCard.box}
      </div>
    </Container>
  );
};

export default SpacedRepetition; 