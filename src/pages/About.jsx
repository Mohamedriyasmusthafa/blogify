import React, { useState } from 'react';

const About = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Blogify</h1>
      <p style={styles.subheading}>
        A place to express ideas, share knowledge, and connect with the world through blogging.
      </p>

      <div style={styles.section}>
        <div style={styles.collapsibleHeader} onClick={() => toggleSection(0)}>
          What You Can Do {openSection === 0 ? '▲' : '▼'}
        </div>
        {openSection === 0 && (
          <ul style={styles.list}>
            <li>📝 Publish your blogs</li>
            <li>🔐 Register & Login securely</li>
            <li>✏️ Edit and manage your posts</li>
            <li>💬 Comment on others’ blogs</li>
            <li>📚 View all your blogs in one place</li>
          </ul>
        )}
      </div>

      <div style={styles.section}>
        <div style={styles.collapsibleHeader} onClick={() => toggleSection(1)}>
          Tech Stack Used {openSection === 1 ? '▲' : '▼'}
        </div>
        {openSection === 1 && (
          <p style={styles.text}>
            <strong>Frontend:</strong> React.js<br />
            <strong>Backend:</strong> Node.js, Express<br />
            <strong>Database:</strong> MongoDB<br />
            <strong>Authentication:</strong> JWT & Bcrypt
          </p>
        )}
      </div>

      <div style={styles.credit}>
        ⚡ Application created by <strong>Mohamed Riyas Musthafa</strong>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#e0e0e0',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    marginTop:'20px',
  },
  heading: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#00bfff',
  },
  subheading: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#cccccc',
  },
  section: {
    marginBottom: '25px',
  },
  collapsibleHeader: {
    fontSize: '1.2rem',
    cursor: 'pointer',
    backgroundColor: '#1e1e1e',
    padding: '10px 15px',
    borderRadius: '6px',
    marginBottom: '10px',
    color: '#00bfff',
    transition: 'all 0.3s ease',
  },
  list: {
    paddingLeft: '20px',
    listStyleType: 'none',
    lineHeight: '1.8rem',
    color: '#dddddd',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#bbbbbb',
    paddingLeft: '15px',
  },
  credit: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: '40px',
    color: '#aaaaaa',
  },
};

export default About;
