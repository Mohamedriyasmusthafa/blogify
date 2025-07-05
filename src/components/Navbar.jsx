import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>Blogify</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link> {/* 👈 Always visible */}

        {token ? (
          <>
          <Link to="/about" style={styles.link}>About Us</Link>

            <Link to="/create" style={styles.link}>Create Blog</Link>
            <Link to="/myblogs" style={styles.link}>My Blogs</Link>
            <Link to="/profile" style={styles.link}>{user?.username}</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
   nav: {
    padding: '12px 30px',
    background: '#121212',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    transition: 'all 0.4s ease-in-out',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '24px',
    textDecoration: 'none',
    color: '#00adb5',
    transition: 'color 0.3s ease-in-out',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#eee',
    textDecoration: 'none',
    fontSize: '16px',
    position: 'relative',
    transition: 'color 0.3s',
  },
  button: {
    background: '#00adb5',
    border: 'none',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    
  },
};

export default Navbar;
