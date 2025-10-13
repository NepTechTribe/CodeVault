/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import fullogo from "../assets/images/logo.png"; // Update the path if needed

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Default to light mode
  const [menuOpen, setMenuOpen] = useState(false);

  // Effect to handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to apply/remove dark mode class to <html> and save preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode); // Initialize dark mode from localStorage
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("bg-gray-900"); // Apply dark background to HTML
      document.documentElement.classList.add("text-gray-200"); // Apply dark text color to HTML
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("bg-gray-900");
      document.documentElement.classList.remove("text-gray-200");
    }
    localStorage.setItem("darkMode", darkMode); // Save dark mode preference
  }, [darkMode]);

  // Framer Motion Variants for staggered animations
  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.1, textShadow: "0px 0px 8px rgba(253, 224, 71, 0.8)" },
    tap: { scale: 0.95 },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        sticky
          ? "bg-black/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-lg"
          : "bg-black dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <img
            src={fullogo}
            alt="Nep Tech Tribe Logo"
            className="h-10 w-auto object-contain"
          />
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul
          initial="hidden"
          animate="visible"
          className="hidden md:flex space-x-8 text-white dark:text-gray-200 font-medium"
        >
          {["Home", "About Us", "Blogs", "Events", "Contact Us"].map((item) => (
            <motion.li
              key={item}
              variants={navLinkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                {item}
              </Link>
            </motion.li>
          ))}
          <li>
            <motion.button
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </motion.button>
          </li>
        </motion.ul>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          aria-label="Toggle Menu"
        >
          <motion.svg
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m0 6H4"
              />
            )}
          </motion.svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden bg-black/95 dark:bg-gray-900/95 text-white dark:text-gray-200"
          >
            <motion.ul
              className="flex flex-col items-center space-y-5 py-6 font-medium text-lg"
            >
              {["Home", "About Us", "Blogs", "Events", "Contact Us"].map(
                (item) => (
                  <motion.li key={item} variants={menuItemVariants}>
                    <Link
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "")}`
                      }
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-yellow-400 transition-colors duration-300 block py-2 px-4 rounded-md"
                    >
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
              <motion.li variants={menuItemVariants}>
                <motion.button
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? "☀️" : "🌙"}
                </motion.button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;