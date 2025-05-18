import React, { useState } from 'react';
import styled from 'styled-components';

interface Book {
  id: number;
  title: string;
  author: string;
  dateRead: string;
  pages: number;
  rating: number;
  notes: string;
}

type SortField = 'title' | 'author' | 'dateRead' | 'pages' | 'rating';
type SortDirection = 'asc' | 'desc';

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

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f5f7fa;
`;

const TableHeadCell = styled.th<{ sortable?: boolean }>`
  padding: 1rem;
  text-align: left;
  color: #4a6fa5;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  white-space: nowrap;
  
  &:hover {
    ${props => props.sortable && 'background-color: #e9f0f8;'}
  }
`;

const SortIcon = styled.span<{ active: boolean; direction: SortDirection }>`
  margin-left: 0.5rem;
  opacity: ${props => props.active ? 1 : 0.3};
  
  &:after {
    content: '${props => props.direction === 'asc' ? '↑' : '↓'}';
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f5f7fa;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #f39c12;
  font-size: 1.2rem;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#f39c12' : '#ddd'};
  cursor: pointer;
  transition: transform 0.1s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const TableActions = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  text-align: right;
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
  transition: background-color 0.3s;
  margin-left: 0.5rem;
  
  &:hover {
    background-color: #395a86;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const AddBookForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
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

const CancelButton = styled.button`
  background-color: #e0e0e0;
  color: #333;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #d0d0d0;
  }
`;

const SubmitButton = styled.button`
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

// Sample books data
const sampleBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dateRead: "2023-01-15",
    pages: 180,
    rating: 4,
    notes: "A classic American novel about wealth and the American Dream."
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    dateRead: "2023-02-20",
    pages: 324,
    rating: 5,
    notes: "Powerful story about racial injustice in the American South."
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    dateRead: "2023-03-10",
    pages: 328,
    rating: 5,
    notes: "Dystopian classic about totalitarianism and surveillance."
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    dateRead: "2023-04-05",
    pages: 310,
    rating: 4,
    notes: "Fantasy adventure about Bilbo Baggins and his quest."
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    dateRead: "2023-05-18",
    pages: 279,
    rating: 3,
    notes: "Classic romance novel about societal expectations."
  }
];

const ReadingLog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [sortField, setSortField] = useState<SortField>('dateRead');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    dateRead: new Date().toISOString().slice(0, 10),
    pages: 0,
    rating: 0,
    notes: ''
  });
  
  // Sort books based on current sort field and direction
  const sortedBooks = [...books].sort((a, b) => {
    if (sortField === 'pages' || sortField === 'rating') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField] 
        : b[sortField] - a[sortField];
    } else {
      const aValue = a[sortField].toString().toLowerCase();
      const bValue = b[sortField].toString().toLowerCase();
      
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleDelete = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };
  
  const handleSetRating = (bookId: number, rating: number) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, rating } : book
    ));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setNewBook({
      ...newBook,
      [name]: name === 'pages' ? parseInt(value) || 0 : value
    });
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nextId = Math.max(...books.map(book => book.id)) + 1;
    const bookToAdd = { ...newBook, id: nextId };
    
    setBooks([...books, bookToAdd as Book]);
    setIsAddingBook(false);
    setNewBook({
      title: '',
      author: '',
      dateRead: new Date().toISOString().slice(0, 10),
      pages: 0,
      rating: 0,
      notes: ''
    });
  };
  
  return (
    <Container>
      <Title>Reading Log</Title>
      <Subtitle>Track and rate the books you've read</Subtitle>
      
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeadCell sortable onClick={() => handleSort('title')}>
                Title
                <SortIcon 
                  active={sortField === 'title'} 
                  direction={sortDirection}
                />
              </TableHeadCell>
              <TableHeadCell sortable onClick={() => handleSort('author')}>
                Author
                <SortIcon 
                  active={sortField === 'author'} 
                  direction={sortDirection}
                />
              </TableHeadCell>
              <TableHeadCell sortable onClick={() => handleSort('dateRead')}>
                Date Read
                <SortIcon 
                  active={sortField === 'dateRead'} 
                  direction={sortDirection}
                />
              </TableHeadCell>
              <TableHeadCell sortable onClick={() => handleSort('pages')}>
                Pages
                <SortIcon 
                  active={sortField === 'pages'} 
                  direction={sortDirection}
                />
              </TableHeadCell>
              <TableHeadCell sortable onClick={() => handleSort('rating')}>
                Rating
                <SortIcon 
                  active={sortField === 'rating'} 
                  direction={sortDirection}
                />
              </TableHeadCell>
              <TableHeadCell>Notes</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </tr>
          </TableHead>
          <TableBody>
            {sortedBooks.map(book => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{new Date(book.dateRead).toLocaleDateString()}</TableCell>
                <TableCell>{book.pages}</TableCell>
                <TableCell>
                  <Rating>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        filled={star <= book.rating}
                        onClick={() => handleSetRating(book.id, star)}
                      >
                        ★
                      </Star>
                    ))}
                  </Rating>
                </TableCell>
                <TableCell>{book.notes}</TableCell>
                <TableActions>
                  <DeleteButton onClick={() => handleDelete(book.id)}>
                    Delete
                  </DeleteButton>
                </TableActions>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {isAddingBook ? (
        <AddBookForm onSubmit={handleFormSubmit}>
          <FormTitle>Add New Book</FormTitle>
          
          <FormGroup>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input 
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="author">Author</FormLabel>
            <Input 
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="dateRead">Date Read</FormLabel>
            <Input 
              id="dateRead"
              name="dateRead"
              type="date"
              value={newBook.dateRead}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="pages">Number of Pages</FormLabel>
            <Input 
              id="pages"
              name="pages"
              type="number"
              min="1"
              value={newBook.pages}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <Rating>
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  filled={star <= newBook.rating}
                  onClick={() => setNewBook({ ...newBook, rating: star })}
                >
                  ★
                </Star>
              ))}
            </Rating>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Textarea 
              id="notes"
              name="notes"
              value={newBook.notes}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormActions>
            <CancelButton type="button" onClick={() => setIsAddingBook(false)}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit">Add Book</SubmitButton>
          </FormActions>
        </AddBookForm>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => setIsAddingBook(true)}>Add New Book</Button>
        </div>
      )}
    </Container>
  );
};

export default ReadingLog; 