import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function AddBook() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ title: "", author: "", description: "" });
  

  const addBook = async ({ title, author, description }) => {
    try {
      const response = await axios.post(`${BASE_URL}/books`, {
        title,
        author,
        description,
      });

      // Check if the request was successful
      if (response.status === 201) {
        // Book added successfully, navigate to home page
        navigate("/");
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    let formErrors = {};

    const textOnlyRegex = /^[A-Za-z\s]*$/;  // Allows only letters and spaces

    if (!title.trim()) {
      formErrors.title = "Title is required";
    } else if (!textOnlyRegex.test(title)) {
      formErrors.title = "Title must contain only alphabetic characters";
    }

    if (!author.trim()) {
      formErrors.author = "Author is required";
    } else if (!textOnlyRegex.test(author)) {
      formErrors.author = "Author must contain only alphabetic characters";
    }

    if (!description.trim()) {
      formErrors.description = "Description is required";
    // } else if (!textOnlyRegex.test(description)) {
    //   formErrors.description = "Description must contain only alphabetic characters";
    } else if (description.length < 10) {
      formErrors.description = "Description must be at least 10 characters";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      addBook({ title, author, description });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow rounded">
      <h2 className="text-2xl text-center font-bold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter book title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter author name"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter book description"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Centered Button */}
        <div className="flex justify-around">
          <button onClick={() => navigate('/')}
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-900 uppercase">
            Cancel
          </button>
          <button type="submit" className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-900 uppercase">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
