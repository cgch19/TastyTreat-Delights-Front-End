import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken"));
  const URL = process.env.REACT_APP_URL;
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await fetch(`${URL}/Treats`, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log("API response:", response);
      console.log("Parsed data:", data);
      if (response.ok) {
        setProducts(data.data);
        console.log("Treats fetched successfully.");
      } else {
        console.log("Failed to fetch treats.");
      }
    } catch (error) {
      console.error("Error fetching treats:", error);
    }
  }, [URL]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleSignUp = async (formData) => {
    console.log("Signing up with data:", formData);

    try {
      const response = await fetch(`${URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      console.log('User signed up:', data);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const createProduct = async (newProduct) => {
    try {
      const response = await fetch(`${URL}/Treats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log("Product created successfully.");
        getProducts();
        return true;
      } else {
        console.log("Failed to create product.");
        console.log(response);
        return false;
      }
    } catch (error) {
      console.error("Error creating product:", error);
      return false;
    }
  };

  const updateProduct = async (updatedProduct, id) => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot update product.");
      return;
    }
    try {
      const response = await fetch(`${URL}/Treats/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        console.log("Product updated successfully.");
        getProducts();
      } else {
        throw new Error(`Failed to update product with status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error updating product:", err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot delete product.");
      return;
    }
    try {
      const response = await fetch(`${URL}/Treats/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      });

      if (response.ok) {
        console.log("Product deleted successfully.");
        getProducts();
      } else {
        console.log("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
              <Route path="/your-treats" element={<Yourtreats products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
              <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
              <Route path="/checkout" element={<Checkoutpage />} />
              <Route path="/product-detail/:id" element={<Productdetails products={products} />} />
              <Route path="/add-product" element={<Productform createProduct={createProduct} />} />
              <Route path="/product-catalog" element={<Productcatalog products={products} />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
