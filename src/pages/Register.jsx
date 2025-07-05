import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await API.post('/auth/register', {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        alert('Registration successful! Please login.');
        navigate('/login');
      } catch (error) {
        const msg =
          error.response?.data?.message || error.message || 'Registration failed';
        setErrors({ general: msg });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Register for Blogify</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        {formik.errors.general && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {formik.errors.general}
          </div>
        )}

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            {...formik.getFieldProps('username')}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          {formik.touched.username && formik.errors.username && (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps('email')}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps('password')}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...formik.getFieldProps('confirmPassword')}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1f2937',
            color: '#fff',
            border: 'none',
            marginTop: '10px',
            cursor: 'pointer',
          }}
        >
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
