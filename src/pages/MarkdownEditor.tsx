import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

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

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 70vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const EditorPanel = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  background-color: #f5f7fa;
  padding: 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  color: #4a6fa5;
`;

const Editor = styled.textarea`
  flex: 1;
  padding: 1rem;
  border: none;
  resize: none;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  line-height: 1.5;
  
  &:focus {
    outline: none;
  }
`;

const PreviewPanel = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Preview = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  pre {
    background-color: #f5f7fa;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f5f7fa;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
  
  blockquote {
    border-left: 4px solid #4a6fa5;
    margin-left: 0;
    padding-left: 1rem;
    color: #666;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
`;

// Sample markdown content
const initialMarkdown = `# Welcome to Markdown Editor

## Basic formatting

This is a paragraph with **bold** and *italic* text.

## Lists

* Item 1
* Item 2
* Item 3

1. First item
2. Second item
3. Third item

## Code

\`\`\`javascript
function sayHello() {
  console.log('Hello, world!');
}
\`\`\`

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Links

[Visit Google](https://www.google.com)

## Images

![Alt text](https://via.placeholder.com/150)
`;

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  
  return (
    <Container>
      <Title>Markdown Editor</Title>
      <Subtitle>Write in Markdown and see the live preview</Subtitle>
      
      <EditorContainer>
        <EditorPanel>
          <PanelHeader>Editor</PanelHeader>
          <Editor 
            value={markdown}
            onChange={handleChange}
            placeholder="Write your markdown here..."
          />
        </EditorPanel>
        
        <PreviewPanel>
          <PanelHeader>Preview</PanelHeader>
          <Preview>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Preview>
        </PreviewPanel>
      </EditorContainer>
    </Container>
  );
};

export default MarkdownEditor; 