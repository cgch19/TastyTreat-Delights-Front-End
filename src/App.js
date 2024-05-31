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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import Productcatalog from './pages/Productcatalog';
import Blogs from './pages/Blogs';
import BlogForm from './pages/BlogForm';
import BlogDetails from './pages/BlogDetails';

// Used some of the porject 3 inspiration

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    console.log('You need to log in first');
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [userId, setUserId]= useState(localStorage.getItem('userId'));
  const [role,setRole]= useState(localStorage.getItem("role"))
  const URL = process.env.REACT_APP_URL;
  const [products, setProducts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [blogs, setBlogs] = useState([])
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const getToken = () => localStorage.getItem('authToken');

  const handleLogin = async (user, navigate) => {
    try {
      const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
      }
  
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.id)
      localStorage.setItem("role", data.role)
      setIsLoggedIn(true);
      setUserId(data.id)
      setRole(data.role)
      toast.success('Login successful!');
      navigate(`/`);
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.message);
    }
  };
  

  const handleSignUp = async (user) => {
    console.log('Signing up with data:', user);
    try {
      const response = await fetch(`${URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        let errorMessage = 'Failed to sign up';
      if (response.status === 400) {
        const errorData = await response.json();
        errorMessage = errorData.message || 'Invalid data provided';
      }
      throw new Error(errorMessage);
      }
       await response.json();
      toast.success("Signup successfully.")
    } catch (error) {
      console.error('Error during sign up:', error);
      toast.error(error.message);
    }
  };

  const getProduct = useCallback(async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Fetching Treats with headers:', headers);
      const response = await fetch(`${URL}/api/Treats`, {
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
      };
      console.log('Fetching Catalog with headers:', headers);
      const response = await fetch(`${URL}/api/Catalog`, {
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

  const getBlogs = useCallback(async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      };
      console.log('Fetching Catalog with headers:', headers);
      const response = await fetch(`${URL}/api/blogs`, {
        headers,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.data)
        setBlogs(data.data);
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
      getBlogs()
    }
    getCatalog();

  }, [isLoggedIn, getProduct, getCatalog, getBlogs]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId')
    localStorage.removeItem("role")
    setIsLoggedIn(false);
    setUserId(null)
    setRole(null)
  };

  const createBlog = async (newBlog) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Creating Blog with headers:', headers);
      const response = await fetch(`${URL}/api/blogs`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newBlog),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Blog created successfully.', data);
        getBlogs();
        return true;
      } else {
        console.error('Failed to create blog.', response);
        return false;
      }
    } catch (error) {
      console.error('Error creating product:', error);
      return false;
    }
  };

  const updateBlog = async (blog, id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Updating Product with headers:', headers);
      const response = await fetch(`${URL}/api/blogs/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(blog),
      });
      if (response.ok) {
        console.log('Blog updated successfully.');
        getBlogs();
      } else {
        console.error('Failed to update blog:', response.statusText);
        throw new Error(`Failed to update blog with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating blog:', error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const headers = {
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Deleting blog with headers:', headers);
      const response = await fetch(`${URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (response.ok) {
        console.log('Blog deleted successfully.');
        getBlogs();
      } else {
        console.error('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const createProduct = async (newProduct) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      };
      console.log('Creating Product with headers:', headers);
      const response = await fetch(`${URL}/api/Treats`, {
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
      const response = await fetch(`${URL}/api/Treats/${id}`, {
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
      const response = await fetch(`${URL}/api/Treats/${id}`, {
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
      const response = await fetch(`${URL}/api/Catalog/${id}`, {
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
      const response = await fetch(`${URL}/api/Treats/sell`, {
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
              <Nav role={role} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            </Toolbar>
          </AppBar>
          <Container className="mt-8">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/your-treats" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Yourtreats products={products} onDelete={deleteProduct} onSell={sellProduct} />
                </ProtectedRoute>
              } />
               <Route path="/blogs" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Blogs blogs={blogs} onDelete={deleteBlog}  role={role}/>
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
              <Route path="/add-blog" element={<BlogForm createBlog={createBlog} />} />
              <Route path="/blog-detail/:id" element={<BlogDetails blogs={blogs} userId={userId} updateBlog={updateBlog} onDelete={deleteProduct} />} />

              <Route path="/product-catalog" element={<Productcatalog role={role} userId={userId} products={catalog} onDelete={deleteCatalogItem} onAddToCart={addToCart} />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
