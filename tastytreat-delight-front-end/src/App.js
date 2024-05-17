import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, ThemeProvider } from '@mui/material';
import Nav from './components/Nav';
import Homepage from './pages/Homepage'; 
import YourTreats from './pages/Yourtreats'; 
import Checkoutpage from './pages/Checkoutpage'; 
import Productdetails from './pages/Productdetails'; 
import Productform from './pages/Productform';
import theme from './theme'; 
import '../src/index.css';
import Productcatalog from './pages/Productcatalog'; 

function App() {
  const [products, setProducts] = useState([]);

  const createProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <ThemeProvider theme={theme}> 
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar style={{ justifyContent: 'flex-end' }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Tasty Treat Delights
              </Typography>
              <Nav /> 
            </Toolbar>
          </AppBar>
          <Container className="mt-8">
            <Routes>
              <Route path="/" element={<Homepage />} /> 
              <Route 
                path="/your-treats" 
                element={<YourTreats products={products} deleteProduct={deleteProduct} />} 
              /> 
              <Route path="/checkout" element={<Checkoutpage />} /> 
              <Route path="/product-detail/:id" element={<Productdetails products={products} />} /> 
              <Route 
                path="/add-product" 
                element={<Productform createProduct={createProduct} />} 
              /> 
              <Route 
                path="/edit-product/:id" 
                element={<Productform products={products} updateProduct={updateProduct} />} 
              /> 
              <Route path="/product-catalog" element={<Productcatalog products={products} />} /> 
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
