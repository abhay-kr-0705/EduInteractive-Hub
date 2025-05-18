import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Comment {
  id: number;
  username: string;
  timestamp: number; // in seconds
  text: string;
  createdAt: Date;
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

const PlayerContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VideoContainer = styled.div`
  background-color: black;
  border-radius: 8px;
  overflow: hidden;
`;

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const Controls = styled.div`
  background-color: #333;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #4a6fa5;
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #555;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #4a6fa5;
  border-radius: 4px;
  transition: width 0.1s;
`;

const TimeDisplay = styled.div`
  color: white;
  font-size: 0.9rem;
  min-width: 100px;
  text-align: center;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CommentsList = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
`;

const CommentHeader = styled.div`
  background-color: #f5f7fa;
  padding: 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  color: #4a6fa5;
`;

const CommentItem = styled.div<{ active: boolean }>`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.active ? '#e9f0f8' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background-color: #f5f7fa;
  }
`;

const CommentTimestamp = styled.div`
  color: #4a6fa5;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.div`
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const CommentText = styled.div`
  color: #333;
  font-size: 1rem;
`;

const AddCommentForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: 1rem;
`;

const FormTitle = styled.h3`
  color: #4a6fa5;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
  font-size: 0.9rem;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  
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

// Sample comments
const initialComments: Comment[] = [
  {
    id: 1,
    username: "Alice",
    timestamp: 15, // 15 seconds
    text: "Great explanation of the basics!",
    createdAt: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: 2,
    username: "Bob",
    timestamp: 42, // 42 seconds
    text: "I found this part confusing. Could you explain it differently?",
    createdAt: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: 3,
    username: "Charlie",
    timestamp: 78, // 1 minute 18 seconds
    text: "This was very helpful, thank you!",
    createdAt: new Date(Date.now() - 1800000) // 30 minutes ago
  },
  {
    id: 4,
    username: "Diana",
    timestamp: 125, // 2 minutes 5 seconds
    text: "Could you provide more examples of this concept?",
    createdAt: new Date(Date.now() - 600000) // 10 minutes ago
  }
];

// Format seconds to MM:SS
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
};

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({ username: "", text: "" });
  const [activeComment, setActiveComment] = useState<number | null>(null);
  
  // Handle video metadata loaded
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      setProgress((time / duration) * 100);
      
      // Check if we're at a comment timestamp
      const commentAtCurrentTime = comments.find(comment => 
        time >= comment.timestamp && time < comment.timestamp + 1
      );
      
      if (commentAtCurrentTime) {
        setActiveComment(commentAtCurrentTime.id);
      } else {
        setActiveComment(null);
      }
    }
  };
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle progress bar click
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const newTime = position * duration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(position * 100);
    }
  };
  
  // Handle comment form submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newComment.username.trim() === "" || newComment.text.trim() === "") {
      return;
    }
    
    const newCommentObj: Comment = {
      id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
      username: newComment.username,
      timestamp: currentTime,
      text: newComment.text,
      createdAt: new Date()
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment({ username: "", text: "" });
  };
  
  // Handle clicking on a comment
  const handleCommentClick = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      setProgress((timestamp / duration) * 100);
    }
  };
  
  // Sort comments by timestamp
  const sortedComments = [...comments].sort((a, b) => a.timestamp - b.timestamp);
  
  return (
    <Container>
      <Title>Interactive Video Player</Title>
      <Subtitle>Watch videos with timestamp-linked comments</Subtitle>
      
      <PlayerContainer>
        <VideoContainer>
          <VideoElement 
            ref={videoRef}
            onLoadedMetadata={handleMetadataLoaded}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
          />
          <Controls>
            <PlayButton onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </PlayButton>
            <ProgressBar 
              ref={progressBarRef}
              onClick={handleProgressBarClick}
            >
              <Progress width={progress} />
            </ProgressBar>
            <TimeDisplay>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeDisplay>
          </Controls>
        </VideoContainer>
        
        <CommentsSection>
          <CommentsList>
            <CommentHeader>Comments</CommentHeader>
            {sortedComments.length === 0 ? (
              <div style={{ padding: '1rem', color: '#666' }}>
                No comments yet. Be the first to comment!
              </div>
            ) : (
              sortedComments.map(comment => (
                <CommentItem 
                  key={comment.id}
                  active={activeComment === comment.id}
                  onClick={() => handleCommentClick(comment.timestamp)}
                >
                  <CommentTimestamp>
                    {formatTime(comment.timestamp)}
                  </CommentTimestamp>
                  <CommentAuthor>
                    {comment.username} • {comment.createdAt.toLocaleString()}
                  </CommentAuthor>
                  <CommentText>
                    {comment.text}
                  </CommentText>
                </CommentItem>
              ))
            )}
          </CommentsList>
          
          <AddCommentForm onSubmit={handleCommentSubmit}>
            <FormTitle>Add Comment at {formatTime(currentTime)}</FormTitle>
            <FormGroup>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input 
                id="username"
                value={newComment.username}
                onChange={(e) => setNewComment({...newComment, username: e.target.value})}
                placeholder="Your name"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="comment">Comment</FormLabel>
              <Textarea 
                id="comment"
                value={newComment.text}
                onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                placeholder="Write your comment..."
                required
              />
            </FormGroup>
            <Button type="submit">Add Comment</Button>
          </AddCommentForm>
        </CommentsSection>
      </PlayerContainer>
    </Container>
  );
};

export default VideoPlayer; 