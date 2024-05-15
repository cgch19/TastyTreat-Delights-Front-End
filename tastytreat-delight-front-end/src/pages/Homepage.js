import React from 'react';
import Button from '@mui/material/Button';


function HomePage() {
  return (
    <div className="HomePage">
      <header>
        <h1>Welcome to Tasty Treat Delights</h1>
      </header>
      <section>
        <p>Explore our delicious treats and indulge your cravings!</p>
        <Button variant="contained" color="primary">
          View Treats
        </Button>
      </section>
      <footer>
        <p>© 2024 Tasty Treat Delights. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
