import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../config";

function Home() {
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books`);
        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); 

  const deleteBookHandler = async (index) => {
    const bookToDelete = books[index];
    try {
      const response = await axios.delete(`${BASE_URL}/books/${bookToDelete._id}`); // Assuming book has an 'id' field
      if (response.status === 200) {
        const updatedBooks = books.filter((_, idx) => idx !== index);
        setBooks(updatedBooks);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">Book List</h2>
        <Link to="/add-book" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Book
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(books) && books.map((book, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border text-center">{book.title}</td>
                <td className="px-4 py-2 border text-center">{book.author}</td>
                <td className="px-4 py-2 border text-center">{book.description}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => deleteBookHandler(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
