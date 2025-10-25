/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaRegCommentDots,
  FaPaperPlane,
  FaSpinner,
  FaGithub,
  FaLinkedin,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

// Reusable Input Field
const InputField = ({ id, label, type = "text", placeholder, icon, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-yellow-100 mb-2">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-400">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`block w-full bg-black/50 backdrop-blur-sm border rounded-lg py-3 pl-10 pr-3 
                   text-white placeholder-gray-400 focus:outline-none 
                   focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300
                   ${error ? "border-red-500" : "border-gray-700"}`}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  </div>
);

// Floating Particle
const Particle = ({ x, y, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full bg-yellow-400/30"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    initial={{ opacity: 0.6, scale: 0 }}
    animate={{ opacity: [0.6, 0], scale: [0, 1.8], y: '-30vh' }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  />
);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const newErrors = { ...errors };
    if (name === "name" && !value.trim()) newErrors.name = "Name is required";
    else if (name === "name") delete newErrors.name;

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) newErrors.email = "Invalid email";
    else if (name === "email") delete newErrors.email;

    if (name === "subject" && !value.trim()) newErrors.subject = "Subject is required";
    else if (name === "subject") delete newErrors.subject;

    if (name === "message" && !value.trim()) newErrors.message = "Message is required";
    else if (name === "message") delete newErrors.message;

    setErrors(newErrors);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const accessKey = "f6a8b2f4-095d-41c8-8661-42a386854bdf";
    const form = new FormData(e.target);
    form.append("access_key", accessKey);
    form.set("subject", `[NepTech Tribe] ${formData.subject}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Thank You!",
          text: "Your message has been sent successfully!",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        toast.error(result.message || "Failed to send message.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contactus" className="relative bg-black py-16 lg:py-24 overflow-hidden">
      <Toaster position="top-center" />

      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(25)].map((_, i) => (
          <Particle
            key={i}
            x={Math.random() * 100}
            y={Math.random() * 100}
            size={Math.random() * 6 + 3}
            duration={Math.random() * 12 + 8}
            delay={Math.random() * 5}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Left: Illustration */}
          <motion.div
            className="hidden lg:flex justify-center"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="NepTech Tribe Community"
              className="w-full max-w-md rounded-2xl shadow-2xl border border-yellow-500/20"
            />
          </motion.div>

          {/* Right: Form */}
          <div>
            <motion.header variants={itemVariants} className="text-center lg:text-left mb-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
                Get in <span className="text-yellow-400">Touch</span>
              </h2>
              <p className="mt-3 text-lg text-gray-300">
                Have questions, ideas, or want to collaborate? We'd love to hear from you!
              </p>
            </motion.header>

            <motion.form
              onSubmit={onSubmit}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              <motion.div variants={itemVariants}>
                <InputField
                  id="name"
                  label="Your Name"
                  placeholder="Sabin khatri"
                  icon={<FaUser />}
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="sabin@gmail.com"
                  icon={<FaEnvelope />}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InputField
                  id="subject"
                  label="Subject"
                  placeholder="Collaboration / Feedback / Event"
                  icon={<FaRegCommentDots />}
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-yellow-100 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                  className={`block w-full bg-black/50 backdrop-blur-sm border rounded-lg py-3 px-4 
                             text-white placeholder-gray-400 focus:outline-none
                             focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all
                             ${errors.message ? "border-red-500" : "border-gray-700"}`}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-4 
                             font-bold text-black bg-yellow-400 rounded-lg shadow-lg shadow-yellow-500/30
                             hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-500/50
                             transition-all duration-300 disabled:opacity-60"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>

            {/* Social Links */}
            <motion.div className="mt-10 flex justify-center lg:justify-start gap-5" variants={itemVariants}>
              <motion.a href="https://github.com/NepTechTribe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition" whileHover={{ scale: 1.2 }}>
                <FaGithub size={26} />
              </motion.a>
              <motion.a href="https://www.linkedin.com/company/neptechtribe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition" whileHover={{ scale: 1.2 }}>
                <FaLinkedin size={26} />
              </motion.a>
              <motion.a href="https://www.facebook.com/neptechtribe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition" whileHover={{ scale: 1.2 }}>
                <FaFacebookF size={26} />
              </motion.a>
              <motion.a href="https://www.youtube.com/@NepTechTribe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition" whileHover={{ scale: 1.2 }}>
                <FaYoutube size={26} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;