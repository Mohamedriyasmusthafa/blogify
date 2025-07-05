import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>{blog.content.substring(0, 100)}...</p>
      <p><strong>Author:</strong> {blog.authorName}</p>
      <Link to={`/blogs/${blog._id}`}>Read More</Link>
    </div>
  );
};

export default BlogCard;
