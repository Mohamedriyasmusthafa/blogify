// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Fixed casing from Pages → pages
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import BlogDetails from './pages/BlogDetails';
import MyBlogs from './pages/MyBlogs';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import About from './pages/About';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
<Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myblogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<p style={{ textAlign: 'center' }}>404 - Page not found</p>} />
      </Routes>
    </>
  );
};

export default App;
