import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch {
        setError('Failed to load blog details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>{blog.title}</h2>
      <p>
        <em>By {blog.author.username}</em> |{' '}
        <small>{new Date(blog.createdAt).toLocaleString()}</small>
      </p>
      <p>{blog.content}</p>

      <Comments blogId={id} />
    </div>
  );
};

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const res = await API.get(`/blogs/${blogId}/comments`);
      setComments(res.data);
    } catch {
      setError('Failed to load comments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

const handleAddComment = async (e) => {
  e.preventDefault();
  if (!newComment.trim()) return;

  try {
    const res = await API.post(`/blogs/${blogId}/comments`, {
      content: newComment,
    });
    setComments([...comments, res.data]);
    setNewComment('');
  } catch (err) {
    console.error(err.response?.data?.message || err.message);
    alert('Failed to post comment.');
  }
};


  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Comments</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} style={styles.comment}>
            <strong>{comment.author.username}</strong>
            <p>{comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}

      <form onSubmit={handleAddComment} style={{ marginTop: '20px' }}>
        <textarea
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
        />
        <button type="submit" style={{ marginTop: '8px' }}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

const styles = {
  comment: {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
};

export default BlogDetails;
