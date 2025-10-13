import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<h2 className="text-3xl font-bold text-center">Home</h2>} />
        <Route path="/about" element={<h2 className="text-3xl font-bold text-center">About Us</h2>} />
        <Route path="/blog" element={<h2 className="text-3xl font-bold text-center">Blogs</h2>} />
        <Route path="/events" element={<h2 className="text-3xl font-bold text-center">Events</h2>} />
        <Route path="/contact" element={<h2 className="text-3xl font-bold text-center">Contact Us</h2>} />
      </Routes>
    </div>
  );
}

export default App;