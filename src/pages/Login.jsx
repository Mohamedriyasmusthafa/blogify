 import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../services/api'; // Your axios instance
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await API.post('/auth/login', {
          email: values.email,
          password: values.password,
        });

        // Assuming response contains a token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        alert('Login successful!');
        navigate('/');
      } catch (error) {
        setErrors({ general: error.response?.data?.message || 'Login failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login to Blogify</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        {formik.errors.general && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {formik.errors.general}
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{ marginTop: '10px' }}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;