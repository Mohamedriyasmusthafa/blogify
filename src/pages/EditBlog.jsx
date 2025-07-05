import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Title must be at least 5 characters')
        .required('Required'),
      content: Yup.string()
        .min(20, 'Content must be at least 20 characters')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await API.put(`/blogs/${id}`, values);
        alert('Blog updated successfully!');
        navigate('/myblogs');
      } catch (error) {
        setErrors({ general: error.response?.data?.message || 'Failed to update blog' });
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true, // allows values to be set after fetch
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blogs/${id}`);
        formik.setValues({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error('Fetch error:', error);
        setFetchError('Failed to load blog for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading blog data...</p>;
  if (fetchError) return <p style={{ color: 'red' }}>{fetchError}</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Edit Blog Post</h2>

      <form onSubmit={formik.handleSubmit} noValidate>
        {formik.errors.general && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {formik.errors.general}
          </div>
        )}

        <div>
          <label htmlFor="title">Title</label><br />
          <input
            id="title"
            name="title"
            type="text"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <div style={{ color: 'red' }}>{formik.errors.title}</div>
          )}
        </div>

        <div style={{ marginTop: '10px' }}>
          <label htmlFor="content">Content</label><br />
          <textarea
            id="content"
            name="content"
            rows="10"
            {...formik.getFieldProps('content')}
            style={{ width: '100%' }}
          />
          {formik.touched.content && formik.errors.content && (
            <div style={{ color: 'red' }}>{formik.errors.content}</div>
          )}
        </div>

        <button type="submit" disabled={formik.isSubmitting} style={{ marginTop: '15px' }}>
          {formik.isSubmitting ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
