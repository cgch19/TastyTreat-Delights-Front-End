import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, ThemeProvider } from '@mui/material';
import Nav from './components/Nav';
import Homepage from './pages/Homepage';
import Yourtreats from './pages/Yourtreats';
import Checkoutpage from './pages/Checkoutpage';
import Productdetails from './pages/Productdetails';
import Productform from './pages/Productform';
import Login from './components/Login';
import Signup from './components/Signup';
import theme from './theme';
import './index.css';
import Productcatalog from './pages/Productcatalog';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    console.log('You need to log in first');
    return <Navigate to="/login" replace />;
  }
  return children;
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const URL = process.env.REACT_APP_URL;
  const [products, setProducts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const getToken = () => localStorage.getItem('authToken');

  const handleSignUp = async (formData) => {
    console.log('Signing up with data:', formData);
    try {
      const response = await fetch(`${URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to sign up');
      const data = await response.json();
      console.log('User signed up:', data);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const getProduct = useCallback(async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Fetching Treats with headers:', headers);
      const response = await fetch(`${URL}/Treats`, {
        headers,
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data);
        console.log('Treats fetched successfully.');
      } else {
        console.error('Failed to fetch treats.');
      }
    } catch (error) {
      console.error('Error fetching treats:', error);
    }
  }, [URL]);

  const getCatalog = useCallback(async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Fetching Catalog with headers:', headers);
      const response = await fetch(`${URL}/Catalog`, {
        headers,
      });
      const data = await response.json();
      if (response.ok) {
        setCatalog(data.data);
        console.log('Catalog fetched successfully.');
      } else {
        console.error('Failed to fetch catalog.');
      }
    } catch (error) {
      console.error('Error fetching catalog:', error);
    }
  }, [URL]);

  useEffect(() => {
    if (isLoggedIn) {
      getProduct();
      getCatalog();
    }
  }, [isLoggedIn, getProduct, getCatalog]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  const createProduct = async (newProduct) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Creating Product with headers:', headers);
      const response = await fetch(`${URL}/Treats`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Product created successfully.', data);
        getProduct();
        return true;
      } else {
        console.error('Failed to create product.', response);
        return false;
      }
    } catch (error) {
      console.error('Error creating product:', error);
      return false;
    }
  };

  const updateProduct = async (treat, id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Updating Product with headers:', headers);
      const response = await fetch(`${URL}/Treats/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(treat),
      });
      if (response.ok) {
        console.log('Treat updated successfully.');
        getProduct();
      } else {
        console.error('Failed to update treat:', response.statusText);
        throw new Error(`Failed to update treat with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating treat:', error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const headers = {
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Deleting Product with headers:', headers);
      const response = await fetch(`${URL}/Treats/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (response.ok) {
        console.log('Product deleted successfully.');
        getProduct();
      } else {
        console.error('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const deleteCatalogItem = async (id) => {
    try {
      const headers = {
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Deleting Catalog Item with headers:', headers);
      const response = await fetch(`${URL}/Catalog/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (response.ok) {
        console.log('Catalog item deleted successfully.');
        getCatalog();
      } else {
        console.error('Failed to delete catalog item.');
      }
    } catch (error) {
      console.error('Error deleting catalog item:', error);
    }
  };

  const sellProduct = async (treat) => {
    const { _id } = treat;
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Selling Product with headers:', headers);
      const response = await fetch(`${URL}/Treats/sell`, {
        method: 'POST',
        headers,
        body: JSON.stringify(treat),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Product sold and added to catalog:', data);
        setCatalog([...catalog, data.data]);
        setProducts(products.filter(product => product._id !== _id));
      } else {
        console.error('Failed to sell product.');
      }
    } catch (error) {
      console.error('Error selling product:', error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log('Product added to cart:', product);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
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
              <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            </Toolbar>
          </AppBar>
          <Container className="mt-8">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} URL={URL} />} />
              <Route path="/your-treats" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Yourtreats products={products} onDelete={deleteProduct} onSell={sellProduct} />
                </ProtectedRoute>
              } />
              <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
              <Route path="/checkout" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Checkoutpage cart={cart} onRemove={removeFromCart} />
                </ProtectedRoute>
              } />
              <Route path="/product-detail/:id" element={<Productdetails products={products} updateProduct={updateProduct} onDelete={deleteProduct} />} />
              <Route path="/add-product" element={<Productform createProduct={createProduct} />} />
              <Route path="/product-catalog" element={<Productcatalog products={catalog} onDelete={deleteCatalogItem} onAddToCart={addToCart} />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

