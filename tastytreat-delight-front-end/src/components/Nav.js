import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, Button } from '@mui/material';

function Nav() {
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
          Checkout
        </Button>
      </div>
    </Toolbar>
  );
}

export default Nav;
