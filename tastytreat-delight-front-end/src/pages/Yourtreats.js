import React from 'react';
import { Link } from 'react-router-dom';

const Yourtreats = () => {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="absolute top-0 right-0 mt-8 mr-8">
        <Link to="/add-product">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Treats
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
      
    </div>
  );
};

export default Yourtreats;
