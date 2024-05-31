import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetails = ({ blogs, updateBlog, userId }) => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const blog = blogs.find((p) => p._id === id);
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (blog) {
      setForm(blog);
    }
  }, [blog]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(form, id).then(() => navigate('/blogs'));
  };

  if (!blog) {
    return <div style={styles.notFound}>Blog not found</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{blog.title}</h2>
      <p style={styles.description}><strong>Description:</strong> {blog.description}</p>
    
      {(blog.User._id === userId || blog.User.role === "Admin") && (
        <section style={styles.editSection}>
          <div style={styles.formContainer}>
            <h2 style={styles.subtitle}>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  placeholder="Blog Title"
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  placeholder="Description"
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </section>
      )}
      <button style={styles.backButton} onClick={() => navigate("/blogs")}>
        Back to Blogs List
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '16px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '24px',
  },
  editSection: {
    marginTop: '24px',
    textAlign: 'center',
  },
  formContainer: {
    display: 'inline-block',
    textAlign: 'left',
    width: '100%',
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#7f1d1d', 
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#a83232',
  },
  backButton: {
    margin: '15px',
    padding: '12px 24px',
    backgroundColor: '#7f1d1d', 
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  backButtonHover: {
    backgroundColor: '#a83232',
  },
  notFound: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '20px',
    color: '#ff0000',
  },
};

export default BlogDetails;
