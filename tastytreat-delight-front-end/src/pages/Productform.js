import React, { useState } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: 0,
    productImage: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.productName || !formData.productDescription || formData.productPrice <= 0) {
      setFormStatus('Please fill in all the fields correctly.');
      return;
    }
    try {
      console.log(formData); 
      setFormStatus('Product added successfully!');
      setFormData({
        productName: '',
        productDescription: '',
        productPrice: 0,
        productImage: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('Error submitting form. Please try again.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add Treats</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">Product Image URL</label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={formData.productImage}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Product Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Product Price</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            min="0"
            step="0.01"
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Treat
          </button>
        </div>
        {formStatus && <p className="text-red-500">{formStatus}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
