import React, { useState } from 'react';
import ProductForm from './Productform'; 
import Button from '@mui/material/Button';

function ProductCatalog() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Catalog</h1>
      <Button onClick={toggleForm} variant="contained" color="primary">
        {showForm ? 'Hide Form' : 'Show Form'}
      </Button>
      {showForm && <ProductForm />}
    </div>
  );
}

export default ProductCatalog;
