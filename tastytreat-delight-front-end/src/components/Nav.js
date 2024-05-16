import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Nav() {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'flex-end' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tasty Treat Delights
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/product-catalog">Product Catalog</Button>
        <Button color="inherit" component={Link} to="/checkout">Checkout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
