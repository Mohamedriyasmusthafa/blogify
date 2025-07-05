import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchBlogs = async (searchQuery = '') => {
    try {
      setLoading(true);
      const response = await API.get(`/blogs?search=${searchQuery}`);
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Initial fetch
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs(search); // Fetch with search query
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h2>All Blogs</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px 16px', marginLeft: '8px' }}>
          Search
        </button>
      </form>

      {/* Blog List */}
      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found. Try another keyword or <Link to="/create">create one</Link>.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={styles.blogCard}>
            <h3>
              <Link to={`/blogs/${blog._id}`} style={styles.blogTitle}>
                {blog.title}
              </Link>
            </h3>
            <p>By: {blog.author?.username || 'Unknown'}</p>
            <p>{blog.content?.substring(0, 150)}...</p>
            <Link to={`/blogs/${blog._id}`}>Read More</Link>
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
  blogTitle: {
    textDecoration: 'none',
    color: '#1e90ff',
  },
};

export default Home;
