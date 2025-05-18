import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Habit {
  id: number;
  name: string;
  isCompleted: boolean;
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

const ProgressContainer = styled.div`
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #2ecc71;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.p`
  color: #666;
  text-align: center;
  font-size: 0.9rem;
`;

const HabitsList = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const HabitItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const HabitName = styled.span<{ completed: boolean }>`
  font-size: 1.1rem;
  color: #333;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
  flex-grow: 1;
`;

const AddHabitForm = styled.form`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a6fa5;
  }
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

// Initial sample habits
const initialHabits: Habit[] = [
  { id: 1, name: "Morning meditation", isCompleted: false },
  { id: 2, name: "30 minutes of reading", isCompleted: false },
  { id: 3, name: "Exercise for 20 minutes", isCompleted: false },
  { id: 4, name: "Drink 8 glasses of water", isCompleted: false },
  { id: 5, name: "Practice coding", isCompleted: false }
];

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabitName, setNewHabitName] = useState("");
  const [nextId, setNextId] = useState(6);
  
  const completedHabits = habits.filter(habit => habit.isCompleted).length;
  const progressPercentage = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0;
  
  const toggleHabit = (id: number) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
      )
    );
  };
  
  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim() !== "") {
      setHabits([...habits, { id: nextId, name: newHabitName, isCompleted: false }]);
      setNextId(nextId + 1);
      setNewHabitName("");
    }
  };

  return (
    <Container>
      <Title>Daily Habit Tracker</Title>
      <Subtitle>Track your daily habits and build consistent routines</Subtitle>
      
      <ProgressContainer>
        <ProgressBar>
          <Progress width={progressPercentage} />
        </ProgressBar>
        <ProgressText>
          {completedHabits} of {habits.length} habits completed ({Math.round(progressPercentage)}%)
        </ProgressText>
      </ProgressContainer>
      
      <HabitsList>
        {habits.map(habit => (
          <HabitItem key={habit.id}>
            <Checkbox 
              type="checkbox" 
              checked={habit.isCompleted}
              onChange={() => toggleHabit(habit.id)}
            />
            <HabitName completed={habit.isCompleted}>{habit.name}</HabitName>
          </HabitItem>
        ))}
      </HabitsList>
      
      <AddHabitForm onSubmit={handleAddHabit}>
        <Input 
          type="text"
          placeholder="Add a new habit..."
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </AddHabitForm>
    </Container>
  );
};

export default HabitTracker; 