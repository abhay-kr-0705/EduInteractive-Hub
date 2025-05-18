import React, { useState } from 'react';
import styled from 'styled-components';

interface Lesson {
  id: number;
  title: string;
  subject: string;
  duration: number; // in minutes
  date: Date;
  completed: boolean;
}

const Container = styled.div`
  max-width: 1000px;
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

const Timeline = styled.div`
  position: relative;
  padding: 2rem 0;
  margin-bottom: 2rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 140px;
    height: 100%;
    width: 4px;
    background-color: #e0e0e0;
    
    @media (max-width: 768px) {
      left: 100px;
    }
  }
`;

const LessonCard = styled.div<{ isDragging: boolean; isCompleted: boolean }>`
  display: flex;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transform: ${props => props.isDragging ? 'scale(1.02)' : 'scale(1)'};
  transition: transform 0.2s, opacity 0.2s;
  
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${props => props.isCompleted ? '#2ecc71' : '#4a6fa5'};
    left: 134px;
    top: 22px;
    z-index: 2;
    
    @media (max-width: 768px) {
      left: 94px;
    }
  }
`;

const LessonDate = styled.div`
  width: 120px;
  padding: 1rem;
  text-align: right;
  font-weight: bold;
  color: #4a6fa5;
  
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const LessonContent = styled.div<{ isCompleted: boolean }>`
  flex: 1;
  margin-left: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: grab;
  position: relative;
  opacity: ${props => props.isCompleted ? 0.7 : 1};
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const LessonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const LessonTitle = styled.h3<{ isCompleted: boolean }>`
  color: #333;
  margin: 0;
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
`;

const SubjectBadge = styled.span`
  background-color: #e9f0f8;
  color: #4a6fa5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const LessonDuration = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  
  &:before {
    content: '⏱️';
    margin-right: 0.5rem;
  }
`;

const LessonActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
`;

const RescheduleButton = styled.button`
  border: none;
  background: none;
  color: #4a6fa5;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #e9f0f8;
  }
`;

const DatePickerContainer = styled.div`
  position: absolute;
  bottom: -80px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #4a6fa5;
  }
`;

const Button = styled.button`
  background-color: #4a6fa5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #395a86;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;
  
  &:hover {
    background-color: #d0d0d0;
  }
`;

const AddLessonButton = styled.button`
  background-color: #4a6fa5;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  
  &:hover {
    background-color: #395a86;
  }
`;

const AddLessonForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  color: #4a6fa5;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a6fa5;
  }
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

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

// Sample lessons data
const sampleLessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to React",
    subject: "Web Development",
    duration: 60,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    completed: false
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    subject: "Programming",
    duration: 45,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    completed: true
  },
  {
    id: 3,
    title: "CSS Flexbox and Grid",
    subject: "Web Development",
    duration: 90,
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    completed: false
  },
  {
    id: 4,
    title: "Python Data Structures",
    subject: "Programming",
    duration: 75,
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false
  },
  {
    id: 5,
    title: "Database Design Principles",
    subject: "Database",
    duration: 60,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    completed: true
  }
];

// Available subjects
const subjects = ["Web Development", "Programming", "Database", "DevOps", "Mobile Development"];

const LessonTracker: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(sampleLessons);
  const [draggedLessonId, setDraggedLessonId] = useState<number | null>(null);
  const [rescheduleLessonId, setRescheduleLessonId] = useState<number | null>(null);
  const [newLessonDate, setNewLessonDate] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLesson, setNewLesson] = useState<Omit<Lesson, 'id' | 'completed'>>({
    title: "",
    subject: subjects[0],
    duration: 60,
    date: new Date()
  });
  
  // Format date to YYYY-MM-DD for input
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Handle drag start
  const handleDragStart = (lessonId: number) => {
    setDraggedLessonId(lessonId);
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setDraggedLessonId(null);
  };
  
  // Handle drop on a date
  const handleDrop = (newDate: Date) => {
    if (draggedLessonId) {
      setLessons(lessons.map(lesson => 
        lesson.id === draggedLessonId 
          ? { ...lesson, date: newDate } 
          : lesson
      ));
      setDraggedLessonId(null);
    }
  };
  
  // Toggle lesson completion
  const toggleLessonCompletion = (lessonId: number) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId 
        ? { ...lesson, completed: !lesson.completed } 
        : lesson
    ));
  };
  
  // Open reschedule form
  const openRescheduleForm = (lessonId: number) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setRescheduleLessonId(lessonId);
      setNewLessonDate(formatDateForInput(lesson.date));
    }
  };
  
  // Close reschedule form
  const closeRescheduleForm = () => {
    setRescheduleLessonId(null);
    setNewLessonDate("");
  };
  
  // Save rescheduled date
  const saveRescheduledDate = () => {
    if (rescheduleLessonId && newLessonDate) {
      setLessons(lessons.map(lesson => 
        lesson.id === rescheduleLessonId 
          ? { ...lesson, date: new Date(newLessonDate) } 
          : lesson
      ));
      closeRescheduleForm();
    }
  };
  
  // Handle input change for new lesson
  const handleNewLessonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setNewLesson({
      ...newLesson,
      [name]: name === 'duration' ? parseInt(value) : value
    });
  };
  
  // Handle date change for new lesson
  const handleNewLessonDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLesson({
      ...newLesson,
      date: new Date(e.target.value)
    });
  };
  
  // Handle form submission for new lesson
  const handleNewLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const lessonToAdd = {
      ...newLesson,
      id: lessons.length > 0 ? Math.max(...lessons.map(lesson => lesson.id)) + 1 : 1,
      completed: false
    };
    
    setLessons([...lessons, lessonToAdd]);
    setShowAddForm(false);
    setNewLesson({
      title: "",
      subject: subjects[0],
      duration: 60,
      date: new Date()
    });
  };
  
  // Sort lessons by date
  const sortedLessons = [...lessons].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return (
    <Container>
      <Title>Lesson Tracker</Title>
      <Subtitle>Plan and reschedule your learning path</Subtitle>
      
      {showAddForm ? (
        <AddLessonForm onSubmit={handleNewLessonSubmit}>
          <FormTitle>Add New Lesson</FormTitle>
          
          <FormGroup>
            <FormLabel htmlFor="title">Lesson Title</FormLabel>
            <Input 
              id="title"
              name="title"
              value={newLesson.title}
              onChange={handleNewLessonChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="subject">Subject</FormLabel>
            <Select 
              id="subject"
              name="subject"
              value={newLesson.subject}
              onChange={handleNewLessonChange}
              required
            >
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="duration">Duration (minutes)</FormLabel>
            <Input 
              id="duration"
              name="duration"
              type="number"
              value={newLesson.duration}
              onChange={handleNewLessonChange}
              min="15"
              step="15"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="date">Scheduled Date</FormLabel>
            <Input 
              id="date"
              name="date"
              type="date"
              value={formatDateForInput(newLesson.date)}
              onChange={handleNewLessonDateChange}
              required
            />
          </FormGroup>
          
          <FormActions>
            <CancelButton type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </CancelButton>
            <Button type="submit">Add Lesson</Button>
          </FormActions>
        </AddLessonForm>
      ) : (
        <Timeline>
          {sortedLessons.map(lesson => (
            <LessonCard 
              key={lesson.id}
              isDragging={draggedLessonId === lesson.id}
              isCompleted={lesson.completed}
              draggable
              onDragStart={() => handleDragStart(lesson.id)}
              onDragEnd={handleDragEnd}
            >
              <LessonDate>
                {lesson.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </LessonDate>
              
              <LessonContent 
                isCompleted={lesson.completed}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(lesson.date);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <LessonHeader>
                  <LessonTitle isCompleted={lesson.completed}>{lesson.title}</LessonTitle>
                  <SubjectBadge>{lesson.subject}</SubjectBadge>
                </LessonHeader>
                <LessonDuration>{lesson.duration} minutes</LessonDuration>
                <LessonActions>
                  <CheckboxLabel>
                    <Checkbox 
                      type="checkbox" 
                      checked={lesson.completed}
                      onChange={() => toggleLessonCompletion(lesson.id)}
                    />
                    {lesson.completed ? 'Completed' : 'Mark as completed'}
                  </CheckboxLabel>
                  <RescheduleButton onClick={() => openRescheduleForm(lesson.id)}>
                    Reschedule
                  </RescheduleButton>
                </LessonActions>
                
                {rescheduleLessonId === lesson.id && (
                  <DatePickerContainer>
                    <DateInput 
                      type="date"
                      value={newLessonDate}
                      onChange={(e) => setNewLessonDate(e.target.value)}
                    />
                    <Button onClick={saveRescheduledDate}>Save</Button>
                    <CancelButton onClick={closeRescheduleForm}>Cancel</CancelButton>
                  </DatePickerContainer>
                )}
              </LessonContent>
            </LessonCard>
          ))}
        </Timeline>
      )}
      
      {!showAddForm && (
        <AddLessonButton onClick={() => setShowAddForm(true)}>
          Add New Lesson
        </AddLessonButton>
      )}
    </Container>
  );
};

export default LessonTracker; 