import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Yourtreats = ({ products, onDelete, onSell }) => {
  const [treats, setTreats] = useState([]);

  useEffect(() => {
    setTreats(products);
  }, [products]);

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const addToCatalog = (id) => {
    const treat = treats.find(treat => treat._id === id);
    if (treat && onSell) {
      onSell(treat);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="absolute top-0 right-0 mt-8 mr-8">
        <Link to="/add-product">
          <button className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded">
            Add Treats
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Your Treats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {treats.length === 0 ? (
          <p>No treats added yet.</p>
        ) : (
          treats.map((treat, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 shadow-md block hover:bg-gray-100">
              <Link to={`/product-detail/${treat._id}`}>
                {treat.Image && (
                  <img src={treat.Image} alt={treat.productImage} className="w-full h-48 object-cover mb-4" />
                )}
                <h3 className="text-xl font-bold mb-2">{treat.Product}</h3>
                <p className="text-gray-700 mb-2">{treat.Description}</p>
                <p className="text-gray-900 font-bold mb-4">Price: ${treat.Price}</p>
              </Link>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleDelete(treat._id)}
                  className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => addToCatalog(treat._id)}
                  className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded"
                >
                  Add to Catalog
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Yourtreats;
