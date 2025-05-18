import React, { useState } from 'react';
import styled from 'styled-components';

interface FlashcardProps {
  question: string;
  answer: string;
  onKnow: () => void;
  onDontKnow: () => void;
}

const Card = styled.div<{ isFlipped: boolean }>`
  width: 400px;
  height: 250px;
  perspective: 1000px;
  margin-bottom: 2rem;
`;

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 8px;
  font-size: 1.5rem;
`;

const CardFront = styled(CardSide)`
  background-color: #4a6fa5;
  color: white;
`;

const CardBack = styled(CardSide)`
  background-color: #ffffff;
  color: #333;
  transform: rotateY(180deg);
  border: 2px solid #4a6fa5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
`;

const Button = styled.button<{ color: string }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.color};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  answer,
  onKnow,
  onDontKnow
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <Card isFlipped={isFlipped} onClick={handleFlip}>
        <CardInner isFlipped={isFlipped}>
          <CardFront>
            <p>{question}</p>
          </CardFront>
          <CardBack>
            <p>{answer}</p>
          </CardBack>
        </CardInner>
      </Card>
      
      <ButtonContainer>
        <Button 
          color="#e74c3c" 
          onClick={() => {
            setIsFlipped(false);
            onDontKnow();
          }}
        >
          Don't Know
        </Button>
        <Button 
          color="#2ecc71" 
          onClick={() => {
            setIsFlipped(false);
            onKnow();
          }}
        >
          Know
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default Flashcard; 