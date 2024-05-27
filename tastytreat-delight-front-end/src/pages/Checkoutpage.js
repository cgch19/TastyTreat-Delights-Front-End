import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

const Checkoutpage = ({ cart, onRemove, onQuantityChange }) => {
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const savedQuantities = localStorage.getItem('quantities');
    if (savedQuantities) {
      setQuantities(JSON.parse(savedQuantities));
    } else {
      const initialQuantities = cart.reduce((acc, item) => {
        acc[item._id] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (id, delta) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      newQuantities[id] = Math.max(1, newQuantities[id] + delta); // Ensure quantity doesn't go below 1
      localStorage.setItem('quantities', JSON.stringify(newQuantities));
      if (onQuantityChange) {
        onQuantityChange(id, newQuantities[id]);
      }
      return newQuantities;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 lg:pr-8">
        <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body1" className="text-lg">
            No items in the cart.
          </Typography>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="border-b border-gray-300 py-4 flex items-center">
                <img
                  src={item.Image}
                  alt={item.Product}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-grow">
                  <Typography variant="h5" component="h3" className="text-xl font-bold">
                    {item.Product}
                  </Typography>
                  <div className="flex items-center">
                    <Button
                      size="small"
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </Button>
                    <Typography variant="body1" className="mx-2">
                      {quantities[item._id]}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <Typography variant="body1" className="text-lg font-bold">
                    ${(item.Price * quantities[item._id]).toFixed(2)}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    className="text-red-500 hover:text-red-700 mt-2"
                    onClick={() => onRemove(item._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-xl mt-4">
              Subtotal: ${cart.reduce((sum, item) => sum + item.Price * quantities[item._id], 0).toFixed(2)}
            </div>
          </div>
        )}
      </div>
      <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
        <Typography variant="h3" component="h2" className="text-3xl font-bold mb-4">
          Checkout
        </Typography>
        <div className="bg-white shadow-md rounded-lg p-8">
          <Typography variant="body1" className="mb-4">
            Enter your email address.
          </Typography>
          <input
            type="email"
            placeholder="Your email address"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <div className="flex items-center mb-4">
            <input type="checkbox" id="newsletter" className="mr-2" />
            <label htmlFor="newsletter" className="text-sm">Keep me up to date on news and exclusive offers</label>
          </div>
          <Button className="bg-rose-900 text-white font-bold py-2 px-4 rounded w-full mb-4" variant="contained">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkoutpage;
