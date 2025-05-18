import React, { useState } from 'react';
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
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  
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

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
    align-self: flex-end;
    position: absolute;
    top: 1rem;
    right: 1rem;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <AppContainer>
        <Header>
          <h1>EduInteractive Hub</h1>
        </Header>
        <Nav>
          <MenuButton onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MenuButton>
          <NavLinks isOpen={isMenuOpen}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/flashcards" onClick={() => setIsMenuOpen(false)}>Flashcards</Link>
            <Link to="/quiz" onClick={() => setIsMenuOpen(false)}>Quiz</Link>
            <Link to="/habits" onClick={() => setIsMenuOpen(false)}>Habit Tracker</Link>
            <Link to="/courses" onClick={() => setIsMenuOpen(false)}>Course Catalog</Link>
            <Link to="/reading-log" onClick={() => setIsMenuOpen(false)}>Reading Log</Link>
            <Link to="/markdown" onClick={() => setIsMenuOpen(false)}>Markdown Editor</Link>
            <Link to="/adaptive-quiz" onClick={() => setIsMenuOpen(false)}>Adaptive Quiz</Link>
            <Link to="/video-player" onClick={() => setIsMenuOpen(false)}>Video Player</Link>
            <Link to="/lesson-tracker" onClick={() => setIsMenuOpen(false)}>Lesson Tracker</Link>
            <Link to="/spaced-repetition" onClick={() => setIsMenuOpen(false)}>Spaced Repetition</Link>
          </NavLinks>
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
