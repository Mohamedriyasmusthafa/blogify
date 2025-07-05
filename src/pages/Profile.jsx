// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePic: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/me');
        setUser(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
          profilePic: res.data.profilePic,
        });
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    if (file) data.append('profilePic', file);

    try {
      const res = await API.put('/auth/profile', data);
      alert('Profile updated!');
      setUser(res.data);
      setFormData({
        username: res.data.username,
        email: res.data.email,
        profilePic: res.data.profilePic,
      });
      setFile(null);
    } catch (err) {
      alert('Update failed');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Profile Picture</label><br />
          {formData.profilePic && (
            <img
              src={formData.profilePic}
              alt="Profile"
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
