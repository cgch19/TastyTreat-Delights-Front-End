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
    return <div>Blog not found</div>;
  }

  return (
    <div style={{ textAlign: 'center', width: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{blog.title}</h2>
      <p><strong>Description:</strong> {blog.description}</p>
    
    {(blog.User._id===userId || blog.User.role==="Admin") &&
      <section style={{ marginTop: '24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', textAlign: 'left', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Edit Blog</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                placeholder="Blog Title"
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                placeholder="Description"
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
           
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Submit
            </button>
          </form>
        </div>
      </section> 
       }
        <button
        style={{margin:'15px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        onClick={()=>navigate("/blogs")}>Back to Blogs List</button>
    </div>
  );
};

export default BlogDetails;
