import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs, onDelete, role }) => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);



  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="absolute top-0 right-0 mt-8 mr-8">
        <Link to="/add-blog">
          <button className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded">
            Add Your Blog
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allBlogs && allBlogs.length === 0 ? (
          <p>No blogs added yet.</p>
        ) : (
          allBlogs && allBlogs.map((blog, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 shadow-md block hover:bg-gray-100">
              <Link to={`/blog-detail/${blog._id}`}>
                
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-2">{blog.description}</p>
              </Link>
              <div className="flex justify-between mt-2">
               {role==="Admin" &&  <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button> }
              
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
