import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function HomePage() {
  return (
    <Box textAlign="center" p={4}>
      <header className='bg to-blue-400'>
        <Typography variant="h4" gutterBottom>
          Welcome to Tasty Treat Delights
        </Typography>
      </header>
      <section>
        <Typography variant="body1" gutterBottom>
          Explore our delicious treats and indulge your cravings!
        </Typography>
        {/* Link the button to the ProductCatalog */}
        <Link to="/product-catalog">
          <Button variant="contained" color="primary">
            View Treats
          </Button>
        </Link>
      </section>
      <footer>
        <Typography variant="body2" fontStyle="italic" mt={4}>
          © 2024 Tasty Treat Delights. All rights reserved.
        </Typography>
      </footer>
    </Box>
  );
}

export default HomePage;
