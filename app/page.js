import axios from 'axios';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import Loading from '../components/Loading';

export default function Home({ books, filteredBooks, loading, currentPage, totalPages }) {
  const handlePageChange = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://192.168.0.157:8000/api/books?page=${page}`);
      setFilteredBooks(res.data);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async ({ name, price }) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://192.168.0.157:8000/api/books?name=${name}&price=${price}`);
      setFilteredBooks(res.data);
      setCurrentPage(1); // Reset to first page after filtering
    } catch (error) {
      console.error("Error filtering books:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <Filter onFilter={handleFilter} />
      {loading ? <Loading /> : (
        <div>
          <ul>
            {filteredBooks.map(book => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialBooksRes = await axios.get('http://192.168.0.157:8000/api/books');
    const books = initialBooksRes.data;
    let filteredBooks = [...books]; // Initialize with all books
    let loading = false;
    let currentPage = 1;
    let totalPages = Math.ceil(filteredBooks.length / 10); // Assuming 10 items per page

    return {
      props: {
        books,
        filteredBooks,
        loading,
        currentPage,
        totalPages
      }
    };
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return {
      props: {
        books: [],
        filteredBooks: [],
        loading: false,
        currentPage: 1,
        totalPages: 0
      }
    };
  }
}
