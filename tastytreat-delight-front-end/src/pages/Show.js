import React from 'react';
import { useParams } from 'react-router-dom';

const Show = ({ products }) => {
  // Access the parameter from the URL (product ID)
  const { id } = useParams();

  // Find the product with the matching ID
  const product = products.find(product => product.id === id);

  // If product is not found, display a message
  if (!product) {
    return <div>Product not found</div>;
  }

  // If product is found, display its details
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <div className="border border-gray-300 rounded-md p-4 shadow-md">
        <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover mb-4" />
        <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
        <p className="text-gray-700 mb-2">{product.productDescription}</p>
        <p className="text-gray-900 font-bold mb-4">${product.productPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Show;
