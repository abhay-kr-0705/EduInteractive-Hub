import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Course {
  id: number;
  title: string;
  description: string;
  topic: string;
  estimatedTime: number; // in hours
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
}

const Container = styled.div`
  max-width: 1200px;
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

const FiltersContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4a6fa5;
  }
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RangeSlider = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`;

const RangeValue = styled.span`
  color: #666;
  font-size: 0.9rem;
  text-align: center;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CourseCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CourseImage = styled.div<{ background: string }>`
  height: 160px;
  background-image: ${props => `url(${props.background})`};
  background-size: cover;
  background-position: center;
`;

const CourseContent = styled.div`
  padding: 1.5rem;
`;

const CourseTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const CourseDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.8rem;
`;

const TopicBadge = styled.span`
  background-color: #e9f0f8;
  color: #4a6fa5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`;

const TimeEstimate = styled.span`
  display: flex;
  align-items: center;
  
  &:before {
    content: '⏱️';
    margin-right: 0.25rem;
  }
`;

const DifficultyBadge = styled.span<{ level: string }>`
  background-color: ${props => {
    switch (props.level) {
      case 'Beginner': return '#e6f7ed';
      case 'Intermediate': return '#fff4de';
      case 'Advanced': return '#fde8e8';
      default: return '#e6f7ed';
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'Beginner': return '#2ecc71';
      case 'Intermediate': return '#f39c12';
      case 'Advanced': return '#e74c3c';
      default: return '#2ecc71';
    }
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`;

// Sample course data
const sampleCourses: Course[] = [
  {
    id: 1,
    title: "Introduction to HTML & CSS",
    description: "Learn the basics of web development with HTML and CSS.",
    topic: "Web Development",
    estimatedTime: 8,
    difficulty: "Beginner",
    image: "https://source.unsplash.com/random/300x200/?html"
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript programming.",
    topic: "Web Development",
    estimatedTime: 12,
    difficulty: "Beginner",
    image: "https://source.unsplash.com/random/300x200/?javascript"
  },
  {
    id: 3,
    title: "React for Beginners",
    description: "Build modern user interfaces with React.",
    topic: "Web Development",
    estimatedTime: 16,
    difficulty: "Intermediate",
    image: "https://source.unsplash.com/random/300x200/?react"
  },
  {
    id: 4,
    title: "Python Basics",
    description: "Introduction to Python programming language.",
    topic: "Programming",
    estimatedTime: 10,
    difficulty: "Beginner",
    image: "https://source.unsplash.com/random/300x200/?python"
  },
  {
    id: 5,
    title: "Data Science with Python",
    description: "Learn data analysis and visualization using Python.",
    topic: "Data Science",
    estimatedTime: 20,
    difficulty: "Intermediate",
    image: "https://source.unsplash.com/random/300x200/?data"
  },
  {
    id: 6,
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and applications.",
    topic: "Data Science",
    estimatedTime: 25,
    difficulty: "Advanced",
    image: "https://source.unsplash.com/random/300x200/?ai"
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps using React Native.",
    topic: "Mobile Development",
    estimatedTime: 18,
    difficulty: "Intermediate",
    image: "https://source.unsplash.com/random/300x200/?mobile"
  },
  {
    id: 8,
    title: "Advanced JavaScript Patterns",
    description: "Explore advanced JavaScript concepts and design patterns.",
    topic: "Web Development",
    estimatedTime: 15,
    difficulty: "Advanced",
    image: "https://source.unsplash.com/random/300x200/?code"
  },
  {
    id: 9,
    title: "Database Design and SQL",
    description: "Learn database design principles and SQL queries.",
    topic: "Databases",
    estimatedTime: 14,
    difficulty: "Intermediate",
    image: "https://source.unsplash.com/random/300x200/?database"
  }
];

const CourseCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(sampleCourses);
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [maxTime, setMaxTime] = useState<number>(30);
  
  // Extract unique topics from courses
  const uniqueTopics = Array.from(new Set(courses.map(course => course.topic)));
  const topics = ["all", ...uniqueTopics];
  
  useEffect(() => {
    let result = [...courses];
    
    // Filter by topic
    if (selectedTopic !== "all") {
      result = result.filter(course => course.topic === selectedTopic);
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      result = result.filter(course => course.difficulty === selectedDifficulty);
    }
    
    // Filter by estimated time
    result = result.filter(course => course.estimatedTime <= maxTime);
    
    setFilteredCourses(result);
  }, [selectedTopic, selectedDifficulty, maxTime, courses]);
  
  return (
    <Container>
      <Title>Course Catalog</Title>
      <Subtitle>Browse our collection of courses by topic and estimated completion time</Subtitle>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Topic</FilterLabel>
          <Select 
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic === "all" ? "All Topics" : topic}
              </option>
            ))}
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Difficulty</FilterLabel>
          <Select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Maximum Time (hours)</FilterLabel>
          <RangeContainer>
            <RangeSlider 
              type="range"
              min="1"
              max="30"
              value={maxTime}
              onChange={(e) => setMaxTime(parseInt(e.target.value))}
            />
            <RangeValue>Up to {maxTime} hours</RangeValue>
          </RangeContainer>
        </FilterGroup>
      </FiltersContainer>
      
      {filteredCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>No courses match your filters</h3>
          <p>Try adjusting your filter criteria</p>
        </div>
      ) : (
        <CoursesGrid>
          {filteredCourses.map(course => (
            <CourseCard key={course.id}>
              <CourseImage background={course.image} />
              <CourseContent>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <CourseMeta>
                  <TopicBadge>{course.topic}</TopicBadge>
                  <TimeEstimate>{course.estimatedTime} hours</TimeEstimate>
                </CourseMeta>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <DifficultyBadge level={course.difficulty}>
                    {course.difficulty}
                  </DifficultyBadge>
                </div>
              </CourseContent>
            </CourseCard>
          ))}
        </CoursesGrid>
      )}
    </Container>
  );
};

export default CourseCatalog; 