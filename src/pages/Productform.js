import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Productform = (props) => {
  const newProductForm = {
    Product: '',
    Description: '',
    Price: 0,
    Image: ''
  };

  const [form, setForm] = useState(newProductForm);
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
      const success = await props.createProduct(form);
      console.log(form)
      if (success) {
        setFormStatus('Product added successfully!');
        setForm(newProductForm);
        navigate('/your-treats'); 
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
      <h1 className="text-3xl font-bold mb-4">Add Treats</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="Product" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="Product"
            name="Product"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="Description"
            name="Description"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="Price" className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            id="Price"
            name="Price"
            onChange={handleChange}
            min="0"
            step="0.01"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Image" className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            type="text"
            id="Image"
            name="Image"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded">
            Add Treat
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

export default Productform;
