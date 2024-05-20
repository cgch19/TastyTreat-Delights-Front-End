import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
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
import '../src/index.css';
import Productcatalog from './pages/Productcatalog';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken"));
  const URL = process.env.REACT_APP_URL 
  const [products, setProducts] = useState([]);

  const handleSignUp = async (formData) => {
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

  const getProduct = async () => {
    try {
      // if (!isLoggedIn) {
      //   console.log("User is not logged in. Cannot fetch treats.");
      //   return;
      // }
      const response = await fetch(`${URL}/Treats`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data);
        console.log("treats fetched successfully.");
      } else {
        console.log("Failed to fetch treats.");
      }
    } catch (error) {
      console.error("Error fetching treats:", error);
    }
  };
  
  // useEffect(() => {
  //   let token = localStorage.getItem("authToken");
  //   if (!token) {
  //     setIsLoggedIn(false);
  //   } else {
  //     setIsLoggedIn(true);
  //     getProduct();
  //   }
  // }, );

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
      getProduct();
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

  const updateProduct = async (updateProduct) => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot update product.");
      return;
    }
    try {
      const response = await fetch(`${URL}/products/${updateProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(updateProduct),
      });

      if (response.ok) {
        console.log("Product updated successfully.");
        await getProduct(); 
      } else {
        throw new Error(`Failed to update product with status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error updating product:", err.message);
    }
  };

  const deleteProduct = async (productId) => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot delete product.");
      return;
    }
    try {
      const response = await fetch(`${URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      });

      if (response.ok) {
        console.log("Product deleted successfully.");
        getProduct();
      } else {
        console.log("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleLogout = () => {
    console.log("in handle logout");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
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
