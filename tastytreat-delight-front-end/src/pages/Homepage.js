import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function HomePage() {
  return (
    <Box textAlign="center" p={4}>
      <header>
        <Typography variant="h4" gutterBottom>
          Welcome to Tasty Treat Delights
        </Typography>
      </header>
      <section>
        <Typography variant="body1" gutterBottom>
          Explore our delicious treats and indulge your cravings!
        </Typography>
        <Button variant="contained" color="primary">
          View Treats
        </Button>
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


