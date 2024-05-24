import React from 'react';

const Productcatalog = ({ products, onDelete }) => {
  const catalogDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p>No products in catalog.</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 shadow-md">
              <img src={product.Image} alt={product.Product} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-bold mb-2">{product.Product}</h3>
              <p className="text-gray-700 mb-2">{product.Description}</p>
              <p className="text-gray-900 font-bold mb-4">Price: ${product.Price}</p>
              <button
                onClick={() => catalogDelete(product._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productcatalog;
