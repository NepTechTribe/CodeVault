/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import fullogo from "../assets/images/logo.png"; // Update the path if needed

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false); // New state for logo click animation

  // Effect to handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion Variants for staggered animations
  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgba(253, 224, 71, 0.8)", // Yellow glow on hover
      backgroundColor: "rgba(253, 224, 71, 0.2)", // Subtle background change on hover
      borderRadius: "8px", // Rounded corners for the background
      transition: { duration: 0.2 },
    },
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
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(253, 224, 71, 0.2)", // Subtle background for mobile links
      borderRadius: "8px",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  const handleLogoClick = () => {
    setLogoClicked(true);
    // Reset logo animation state after it completes
    setTimeout(() => {
      setLogoClicked(false);
    }, 1000); // Duration of the rotation animation
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        sticky
          ? "bg-black/90 shadow-lg backdrop-blur-lg" // Slightly transparent black when sticky
          : "bg-black" // Solid black when not sticky
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center cursor-pointer" // Add cursor-pointer
          onClick={handleLogoClick} // Handle click for rotation
        >
          <motion.img
            src={fullogo}
            alt="Nep Tech Tribe Logo"
            className="h-10 w-auto object-contain"
            animate={{ rotate: logoClicked ? 360 : 0 }} // Rotate 360 degrees if clicked
            transition={{ duration: 1, ease: "easeOut" }} // Smooth rotation
          />
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul
          initial="hidden"
          animate="visible"
          className="hidden md:flex space-x-2 text-white font-medium" // Reduced space-x to account for padding
        >
          {["Home", "About Us", "Blogs", "Events", "Contact Us"].map((item) => (
            <motion.li
              key={item}
              variants={navLinkVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-3 py-2" // Add padding to li for the background hover effect
            >
              <Link
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className="hover:text-yellow-400 transition-colors duration-300" // Yellow hover effect
              >
                {item}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded" // White icon, yellow focus ring
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
            className="md:hidden bg-black/95 text-white" // Slightly transparent black background for mobile menu
          >
            <motion.ul
              className="flex flex-col items-center space-y-5 py-6 font-medium text-lg"
            >
              {["Home", "About Us", "Blogs", "Events", "Contact Us"].map(
                (item) => (
                  <motion.li
                    key={item}
                    variants={menuItemVariants}
                    whileHover="hover" // Apply hover animation to mobile items
                    whileTap="tap"
                    className="w-full text-center" // Make sure hover background fills width
                  >
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
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;