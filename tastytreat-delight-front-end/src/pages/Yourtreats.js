import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Yourtreats = ({ products }) => {
  const [treats, setTreats] = useState([]);

  useEffect(() => {
    setTreats(products);
  }, [products]);

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
      <div className="mt-8">
        {treats.length === 0 ? (
          <p>No treats added yet.</p>
        ) : (
          <ul>
            {treats.map((treat, index) => (
              <li key={index} className="mb-4">
                <div className="bg-white shadow-md rounded p-4">
                  <h3 className="text-xl font-bold">{treat.productName}</h3>
                  <p>{treat.productDescription}</p>
                  <p>Price: ${treat.productPrice}</p>
                  {treat.productImage && (
                    <img src={treat.productImage} alt={treat.productName} className="w-full h-auto object-cover rounded"/>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Yourtreats;
