import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Productdetails = ({ products, updateProduct }) => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const product = products.find((p) => p._id === id);

  const [form, setForm] = useState({
    Product: '',
    Description: '',
    Price: '',
    Image: ''
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(form, id).then(() => navigate('/your-treats'));
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ textAlign: 'center', width: '400px', margin: '0 auto', border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{product.Product}</h2>
      <p><strong>Description:</strong> {product.Description}</p>
      <p><strong>Price:</strong> {product.Price}</p>
      <p><strong>Image:</strong><br /><img src={product.Image} alt={product.Product} style={{ maxWidth: '100%', height: 'auto' }} /></p>

      <section style={{ marginTop: '24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', textAlign: 'left', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Product Name</label>
              <input
                type="text"
                name="Product"
                value={form.Product}
                placeholder="Product Name"
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
              <input
                type="text"
                name="Description"
                value={form.Description}
                placeholder="Description"
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Price</label>
              <input
                type="number"
                name="Price"
                value={form.Price}
                placeholder="Price"
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Image URL</label>
              <input
                type="text"
                name="Image"
                value={form.Image}
                placeholder="Image URL"
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
    </div>
  );
};

export default Productdetails;
