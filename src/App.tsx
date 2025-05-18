import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

// Pages
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import HabitTracker from './pages/HabitTracker';
import CourseCatalog from './pages/CourseCatalog';
import ReadingLog from './pages/ReadingLog';
import MarkdownEditor from './pages/MarkdownEditor';
import AdaptiveQuiz from './pages/AdaptiveQuiz';
import VideoPlayer from './pages/VideoPlayer';
import LessonTracker from './pages/LessonTracker';
import SpacedRepetition from './pages/SpacedRepetition';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #4a6fa5;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #6889b1;
  flex-wrap: wrap;
  
  a {
    color: white;
    margin: 0.5rem 1rem;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>
          <h1>EduInteractive Hub</h1>
        </Header>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/flashcards">Flashcards</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/habits">Habit Tracker</Link>
          <Link to="/courses">Course Catalog</Link>
          <Link to="/reading-log">Reading Log</Link>
          <Link to="/markdown">Markdown Editor</Link>
          <Link to="/adaptive-quiz">Adaptive Quiz</Link>
          <Link to="/video-player">Video Player</Link>
          <Link to="/lesson-tracker">Lesson Tracker</Link>
          <Link to="/spaced-repetition">Spaced Repetition</Link>
        </Nav>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/habits" element={<HabitTracker />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/reading-log" element={<ReadingLog />} />
            <Route path="/markdown" element={<MarkdownEditor />} />
            <Route path="/adaptive-quiz" element={<AdaptiveQuiz />} />
            <Route path="/video-player" element={<VideoPlayer />} />
            <Route path="/lesson-tracker" element={<LessonTracker />} />
            <Route path="/spaced-repetition" element={<SpacedRepetition />} />
          </Routes>
        </Content>
      </AppContainer>
    </Router>
  );
}

export default App;
