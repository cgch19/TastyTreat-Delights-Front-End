import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogForm = (props) => {
  const newBlogForm = {
    title: '',
    description: ''
  };

  const [form, setForm] = useState(newBlogForm);
  const [formStatus, setFormStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!form.Product || !form.Description || form.Price <= 0) {
    //   setFormStatus('Please fill in all the fields correctly.');
    //   return;
    // }
    try {
      const success = await props.createBlog(form);
      console.log(form)
      if (success) {
        setFormStatus('Product added successfully!');
        setForm(newBlogForm);
        navigate('/blogs'); 
      } else {
        setFormStatus('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('Error submitting form. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add Blog</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="Product" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="Title"
            name="title"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="Description"
            name="description"
            onChange={handleChange}
            rows={7}
            className="border border-gray-300 rounded-md p-2 w-full"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <button type="submit" className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded">
            Add Blog
          </button>
          <button type="button" onClick={handleCancel} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
        {formStatus && <p className="text-red-500">{formStatus}</p>}
      </form>
    </div>
  );
};

export default BlogForm;
