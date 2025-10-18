/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroBackground from "../assets/images/herobg.png";

function Head({ head, description, subheading }) {
  return (
    <motion.div
      className="text-center space-y-3 sm:space-y-4 md:space-y-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md tracking-tight">
        {head}
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      <p className="text-xs sm:text-sm md:text-base text-yellow-400 font-medium max-w-xs sm:max-w-md md:max-w-lg mx-auto">
        {subheading}
      </p>
    </motion.div>
  );
}

function Button({ buttontext, buttonclass, buttoncontainer, location }) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(location || "/explore");
  }, [navigate, location]);

  return (
    <motion.div
      className={buttoncontainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120, delay: 0.2 }}
    >
      <motion.button
        className={buttonclass}
        onClick={handleClick}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 12px rgba(253, 224, 71, 0.9)",
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {buttontext}
      </motion.button>
    </motion.div>
  );
}

function Hero() {
  const description = (
    <>
      A non-profit organization founded by tech-obsessed youngsters, concentrating on offering digital literacy programs and instructional tools to students.
    </>
  );

  const subheading = "Empowering the next generation through technology and innovation.";

  const backgroundVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 0.7, 
      transition: { 
        duration: 1.2, 
        type: "spring", 
        stiffness: 100,
        ease: "easeOut"
      } 
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        type: "spring", 
        stiffness: 120,
        staggerChildren: 0.2 
      } 
    },
  };

  return (
    <section
      id="home"
      className="relative bg-black min-h-screen flex items-center justify-center text-white py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
    >
      <motion.img
        src={heroBackground}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover sm:object-contain md:object-cover"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        onError={(e) => { e.target.style.display = "none"; console.error("Failed to load background image"); }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <motion.div
        className="relative z-10 text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl mx-auto"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <Head
          head={<span>Welcome to <span className="text-yellow-400">Our Website</span></span>}
          description={description}
          subheading={subheading}
        />
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <Button
            buttontext="Explore Now"
            buttonclass="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
            buttoncontainer="w-full sm:w-auto"
            location="/explore"
          />
          <Button
            buttontext="Learn More"
            buttonclass="bg-transparent border border-yellow-400 text-yellow-400 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
            buttoncontainer="w-full sm:w-auto"
            location="/about"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;