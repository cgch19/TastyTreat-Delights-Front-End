import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Productdetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    Product: '',
    Image: '',
    Description: '',
    Price: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details using the id
    fetchProductDetails(id).then(data => {
      setProduct(data);
      setFormValues({
        Product: data.Product,
        Image: data.Image,
        Description: data.Description,
        Price: data.Price
      });
    });
  }, [id]);

  const fetchProductDetails = async (id) => {
    // Replace this with your actual fetch call
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Submit updated product details
    updateProductDetails(id, formValues).then(() => {
      // Navigate back to the treats list or show a success message
      navigate('/your-treats');
    });
  };

  const updateProductDetails = async (id, updatedProduct) => {
    // Replace this with your actual update call
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="Product">Product:</label>
          <input
            type="text"
            id="Product"
            name="Product"
            value={formValues.Product}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <textarea
            id="Description"
            name="Description"
            value={formValues.Description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Price">Price:</label>
          <input
            type="number"
            id="Price"
            name="Price"
            value={formValues.Price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Image">Image URL:</label>
          <input
            type="text"
            id="Image"
            name="Image"
            value={formValues.Image}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Productdetail;
