import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react';


// author: String,
// title: {type:String, require: true},
// genre: String
//
// /books

function App() {

  const [newAuthor, setAuthor] = useState('');
  const [newTitle, setTitle] = useState('');
  const [newGenre, setGenre] = useState('');
  const [books, setBooks] = useState([]);

  const handleNewAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleNewGenre = (event) => {
    setGenre(event.target.value)
  }

  const handleNewBookFormSubmit = (event) => {
    event.preventDefault();
        axios.post(
            'http://localhost:3000/books',
            {
                author: newAuthor,
                title: newTitle,
                genre: newGenre

            }
        ).then(()=>{
            axios
                .get('http://localhost:3000/books')
                .then((response)=>{
                    setBooks(response.data)
                })
            })
  }

  const handleBookUpdate = (books) => {
    axios
      .put(
          `http://localhost:3000/books/${books._id}`,
          {
              author: newAuthor,
              title: newTitle,
              genre: newGenre
          }
      )
      .then(()=>{
          axios
              .get('http://localhost:3000/books')
              .then((response)=>{
                  setBooks(response.data)
              })
      })
  }

  const handleDelete = (bookData) => {
    axios
      .delete(`http://localhost:3000/books/${bookData._id}`)
      .then(() =>{
        axios
          .get(`http://localhost:3000/books`)
          .then((response) => {
            setBooks(response.data)
          })
      })
  }

  useEffect(()=>{
      axios
          .get('http://localhost:3000/books')
          .then((response)=>{
              setBooks(response.data)
              console.log(books)
          })
  },[])





  return (
    <main>
      <h1>Book Listing</h1>
        <section>
          <h2>Create a new Book</h2>
          <form onSubmit={handleNewBookFormSubmit}>
            Author: <input type="text" onChange={handleNewAuthor}/><br/>
            Title: <input type="text" onChange={handleTitleChange} /><br/>
            Genre: <input type="text" onChange={handleNewGenre} /><br/>
            <input type="submit" value="create book"/>
          </form>
        </section>
        <section>
          <h2>Books</h2>
          <ul>
            {
              books.map((book) =>{
                return <li>
                        Author: {book.author}
                        <br/>
                        Title: {book.title}
                        <br/>
                        Genre: {book.genre}
                        <br/>
                        <section>
                          <h2>Edit Book</h2>
                          <form onSubmit={(event) => {handleBookUpdate(book)}}>
                            Author: <input type="text" onChange={handleNewAuthor}/>
                            <br/>
                            Title: <input type="text" onChange={handleTitleChange} />
                            <br/>
                            Genre: <input type="text" onChange={handleNewGenre} />
                            <br/>
                            <input type="submit" value="Submit Edits" />
                          </form>
                        </section>
                      <button onClick={ (event)=>{handleDelete(book)}}>Bought!</button>
                      </li>
                        })
            }
          </ul>
        </section>
    </main>
  );
}

export default App;
