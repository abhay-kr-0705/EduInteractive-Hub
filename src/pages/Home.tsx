import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  text-align: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #4a6fa5;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e9f0f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #4a6fa5;
`;

const FeatureTitle = styled.h2`
  color: #4a6fa5;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  text-align: center;
`;

const features = [
  {
    title: "Flashcard Viewer",
    description: "Interactive flashcards with flip animations and tracking",
    icon: "📚",
    path: "/flashcards"
  },
  {
    title: "Quiz App",
    description: "Test your knowledge with quizzes and see your score",
    icon: "❓",
    path: "/quiz"
  },
  {
    title: "Habit Tracker",
    description: "Track daily habits with a visual progress bar",
    icon: "✅",
    path: "/habits"
  },
  {
    title: "Course Catalog",
    description: "Browse courses filterable by topic and estimated time",
    icon: "🎓",
    path: "/courses"
  },
  {
    title: "Reading Log",
    description: "Log your reading with sortable table and star ratings",
    icon: "📖",
    path: "/reading-log"
  },
  {
    title: "Markdown Editor",
    description: "Write notes in Markdown with live preview",
    icon: "📝",
    path: "/markdown"
  },
  {
    title: "Adaptive Quiz",
    description: "Dynamic quiz that adapts to your skill level",
    icon: "🧠",
    path: "/adaptive-quiz"
  },
  {
    title: "Video Player",
    description: "Interactive video player with timestamp-linked comments",
    icon: "🎬",
    path: "/video-player"
  },
  {
    title: "Lesson Tracker",
    description: "Timeline-based lesson tracker with drag-to-reschedule UI",
    icon: "📅",
    path: "/lesson-tracker"
  },
  {
    title: "Spaced Repetition",
    description: "Flashcard engine with review stats for optimal learning",
    icon: "🔄",
    path: "/spaced-repetition"
  }
];

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Title>Welcome to EduInteractive Hub</Title>
      <Subtitle>A comprehensive platform for interactive learning tools</Subtitle>
      
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index} to={feature.path}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default Home; 