import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, Button } from '@mui/material';

function Nav({ isLoggedIn, handleLogout }) {
  return (
    <Toolbar className="flex justify-between">
      <div className="space-x-4">
        <Button color="inherit" component={Link} to="/" className="hover:text-gray-300">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/your-treats" className="hover:text-gray-300">
          Your Treats
        </Button>
        <Button color="inherit" component={Link} to="/product-catalog" className="hover:text-gray-300">
          Product Catalog
        </Button>
        <Button color="inherit" component={Link} to="/checkout" className="hover:text-gray-300">
          Cart
        </Button>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/add-product" className="hover:text-gray-300">
              Add Product
            </Button>
            <Button color="inherit" onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" className="hover:text-gray-300">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup" className="hover:text-gray-300">
              Sign Up
            </Button>
          </>
        )}
      </div>
    </Toolbar>
  );
}

export default Nav;
