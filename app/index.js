

import axios from 'axios';

export default function Home({ books }) {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    
    const res = await axios.get('http://192.168.0.157:8000/books');
    const books = res.data;
  
   
    return {
      props: {
        books,
      },
    };
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return {
      props: {
        books: [],
      },
    };
  }
}
