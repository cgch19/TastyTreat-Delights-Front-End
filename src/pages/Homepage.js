import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

function HomePage() {
  return (
    <Container 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between' 
      }}
    >
      <Box textAlign="center" p={4}>
        <header>
          <Typography variant="h4" gutterBottom>
            Welcome to Tasty Treat Delights
          </Typography>
        </header>
        <section style={{ marginTop: '20px' }}>
          <Typography variant="body1" gutterBottom>
            Explore our delicious treats and indulge your cravings!
          </Typography>
          <Link to="/product-catalog" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
              View Treats
            </Button>
          </Link>
        </section>
      </Box>
      <Box component="footer" textAlign="center" py={2}>
        <Typography variant="body2" fontStyle="italic">
          © 2024 Tasty Treat Delights. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
