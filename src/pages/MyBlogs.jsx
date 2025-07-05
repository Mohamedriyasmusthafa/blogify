import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      const response = await API.get('/blogs/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to load your blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      alert('Failed to delete blog.');
    }
  };

  if (loading) return <p>Loading your blogs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h2>My Blogs</h2>
      {blogs.length === 0 ? (
        <p>You have no blogs yet. <Link to="/create">Create one now</Link>!</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} style={styles.blogCard}>
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 150)}...</p>
            <div>
              <Link to={`/edit/${blog._id}`} style={styles.actionLink}>Edit</Link> |{' '}
              <button
                onClick={() => handleDelete(blog._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  blogCard: {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
  },
  actionLink: {
    color: '#1e90ff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    padding: 0,
    fontSize: '1em',
  },
};

export default MyBlogs;
