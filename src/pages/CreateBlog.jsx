import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Your axios instance

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to create a blog.');
        return;
      }

      await API.post(
        '/blogs',
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Blog created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Create a New Blog</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
          />
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
