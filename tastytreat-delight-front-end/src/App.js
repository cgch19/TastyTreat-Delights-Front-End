import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, ThemeProvider } from '@mui/material';
import Nav from './components/Nav';
import Homepage from './pages/Homepage'; 
import Productcatalog from './pages/Productcatalog'; 
import Checkoutpage from './pages/Checkoutpage'; 
import Productdetails from './pages/Productdetails'; 
import theme from './theme'; 



function App() {
  return (
    <ThemeProvider theme={theme}> 
      <Router>
        <div>
          <AppBar position="static">
          </AppBar>
          <Container>
            <Nav />
            <Routes>
              <Route path="/" exact element={<Homepage />} /> 
              <Route path="/product-catalog" element={<Productcatalog />} /> 
              <Route path="/checkout" element={<Checkoutpage />} /> 
              <Route path="/product-detail/:id" element={<Productdetails />} /> 
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
