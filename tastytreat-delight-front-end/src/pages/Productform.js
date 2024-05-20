import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Productform = (props) => {
  const newProductForm = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImage: ''
  };

  const [form, setForm] = useState(newProductForm);
  const [formStatus, setFormStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.productName || !form.productDescription || form.productPrice <= 0) {
      setFormStatus('Please fill in all the fields correctly.');
      return;
    }
    try {
      const success = await props.createProduct(form);
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
          <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={form.productDescription}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={form.productPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={form.productImage}
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
