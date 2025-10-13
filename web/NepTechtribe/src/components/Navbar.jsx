/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import fullogo from "../assets/images/logo.png"; // Adjust path as needed

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          sticky
            ? "bg-navy-dark/90 shadow-lg backdrop-blur-md"
            : "bg-navy-dark"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img
              src={fullogo}
              alt="NepTech Tribe Logo"
              className="h-8 w-auto object-contain"
            />
          </motion.div>

          <ul className="hidden md:flex space-x-6 items-center text-white">
            <li>
              <Link
                to="/"
                className="hover:text-purple-hover transition-colors duration-300 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-purple-hover transition-colors duration-300 font-medium"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-purple-hover transition-colors duration-300 font-medium"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="hover:text-purple-hover transition-colors duration-300 font-medium"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-purple-hover transition-colors duration-300 font-medium"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="ml-4 p-2 rounded-full bg-gray-700 text-white focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {darkMode ? "☀️" : "🌙"}
              </motion.button>
            </li>
          </ul>

          <button
            className="md:hidden p-2 text-white"
            onClick={handleToggle}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-64 bg-navy-dark text-white shadow-lg z-50 md:hidden overflow-y-auto"
        >
          <div className="p-4 flex justify-end">
            <button
              onClick={handleToggle}
              className="text-white"
              aria-label="Close mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link
                to="/"
                onClick={handleToggle}
                className="hover:text-purple-hover transition-colors duration-300 font-medium block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={handleToggle}
                className="hover:text-purple-hover transition-colors duration-300 font-medium block"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                onClick={handleToggle}
                className="hover:text-purple-hover transition-colors duration-300 font-medium block"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                onClick={handleToggle}
                className="hover:text-purple-hover transition-colors duration-300 font-medium block"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={handleToggle}
                className="hover:text-purple-hover transition-colors duration-300 font-medium block"
              >
                Contact Us
              </Link>
            </li>
            <li className="mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-700 text-white focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {darkMode ? "☀️" : "🌙"}
              </motion.button>
            </li>
          </ul>
        </motion.div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleToggle}
        ></div>
      )}
    </>
  );
};

export default Navbar;