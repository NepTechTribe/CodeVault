/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

function Head({ title, head }) {
  return (
    <motion.div
      className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
        {head}
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-md sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed">
        {title}
      </p>
    </motion.div>
  );
}

// Registration Form (Upcoming Events)
function RegistrationForm({ eventTitle, onClose }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const accessKey = "f6a8b2f4-095d-41c8-8661-42a386854bdf";

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("event_title", eventTitle);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "Not provided");
    formData.append("skills", data.skills || "Not provided");
    formData.append("what_to_learn", data.what_to_learn || "Not provided");
    formData.append("current_education", data.current_education || "Not provided");

    formData.append(
      "message",
      `Event Registration: ${eventTitle}\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || "N/A"}\n` +
      `Skills: ${data.skills || "N/A"}\n` +
      `What to Learn: ${data.what_to_learn || "N/A"}\n` +
      `Current Education: ${data.current_education || "N/A"}`
    );

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your registration is confirmed! We will send you event details via email.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
        });
        reset();
        onClose();
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-yellow-100 mb-2">Full Name *</label>
        <input
          type="text"
          {...register("name", { required: "Name is required", maxLength: 80 })}
          className={`w-full bg-black/50 border rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.name ? "border-red-500" : "border-gray-700"}`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-100 mb-2">Email Address *</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          className={`w-full bg-black/50 border rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? "border-red-500" : "border-gray-700"}`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-100 mb-2">Phone Number (Optional)</label>
        <input
          type="tel"
          {...register("phone", { maxLength: 15 })}
          className="w-full bg-black/50 border rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-700"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-100 mb-2">
          Skills (e.g., JavaScript, Python)
        </label>
        <input
          type="text"
          {...register("skills", { maxLength: 200 })}
          className="w-full bg-black/50 border rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-700"
          placeholder="List your skills (comma-separated)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-100 mb-2">
          What to Learn (e.g., AI, Web Dev)
        </label>
        <textarea
          rows="2"
          {...register("what_to_learn", { maxLength: 300 })}
          className="w-full bg-black/50 border rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-700"
          placeholder="What do you want to learn?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-100 mb-2">
          Current Education
        </label>
        <select
          {...register("current_education")}
          className="w-full bg-black/50 border rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-700"
        >
          <option value="">Select your status</option>
          <option value="BSc CSIT 1st year">BSc CSIT 1st year</option>
          <option value="BSc CSIT 2nd year">BSc CSIT 2nd year</option>
          <option value="BSc CSIT 3rd year">BSc CSIT 3rd year</option>
          <option value="BSc CSIT 4th year">BSc CSIT 4th year</option>
          <option value="BCA 1st year">BCA 1st year</option>
          <option value="BCA 2nd year">BCA 2nd year</option>
          <option value="BCA 3rd year">BCA 3rd year</option>
          <option value="BIM/BIT 1st year">BIM/BIT 1st year</option>
          <option value="Graduate (BSc CSIT/BCA)">Graduate (BSc CSIT/BCA)</option>
          <option value="High School">High School</option>
          <option value="Working Professional">Working Professional</option>
        </select>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Register for {eventTitle}
      </motion.button>
    </form>
  );
}

// Past Event Detail Modal
function PastEventModal({ event, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-black/95 p-6 sm:p-8 rounded-xl max-w-4xl w-full border border-yellow-400/30 relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-yellow-400"
        >
          ×
        </button>

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{event.title}</h2>
        <p className="text-yellow-400 mb-4">
          Date: {event.date} | Location: {event.location}
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Speakers</h3>
            <ul className="list-disc pl-5 space-y-1">
              {event.speakers.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Participants</h3>
            <p>{event.participants} tech enthusiasts joined!</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Topics Covered</h3>
          <div className="flex flex-wrap gap-2">
            {event.topics.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Key Takeaways</h3>
          <p className="text-gray-300 italic">"{event.takeaways}"</p>
        </div>

        {event.gallery && event.gallery.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Event Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {event.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => window.open(img, "_blank")}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <motion.button
            onClick={onClose}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPastEvent, setSelectedPastEvent] = useState(null);

  const upcomingEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Bootcamp",
      date: "Nov 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Kathmandu, Nepal",
      type: "Bootcamp",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    },
    {
      id: 2,
      title: "Hacktoberfest Nepal 2025",
      date: "Oct 1 - Oct 31, 2025",
      time: "All Month",
      location: "Online + Kathmandu Meetup",
      type: "Open Source",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    },
    {
      id: 3,
      title: "NepTech Summit 2025",
      date: "Dec 20, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Hotel Himalaya, Lalitpur",
      type: "Conference",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Web Development Bootcamp 2025",
      date: "Sep 10, 2025",
      location: "Tribhuvan University, Kirtipur",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
      participants: 85,
      speakers: ["Sabin Khatri", "Anita Shrestha", "Rajesh Hamal"],
      topics: ["React Hooks", "Tailwind CSS", "Node.js API", "Vercel Deployment"],
      takeaways: "Participants built and deployed a full-stack e-commerce app live.",
      gallery: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3",
      ],
    },
    {
      id: 5,
      title: "Women in Tech Meetup",
      date: "Aug 25, 2025",
      location: "CloudFactory Office, Lalitpur",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
      participants: 60,
      speakers: ["Priya Thapa", "Sushma Karki"],
      topics: ["Career in Tech", "Open Source", "Work-Life Balance"],
      takeaways: "Inspiring stories, networking, and mentorship sessions.",
      gallery: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3",
      ],
    },
    {
      id: 6,
      title: "AI for Beginners Workshop",
      date: "Jul 15, 2025",
      location: "Online (Zoom)",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
      participants: 120,
      speakers: ["Dr. Ram Prasad Ghimire"],
      topics: ["Intro to AI", "ML Basics", "Google Colab Hands-on"],
      takeaways: "Participants trained their first ML model using Teachable Machine.",
      gallery: [],
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 120 } },
    hover: { scale: 1.05, boxShadow: "0px 0px 20px rgba(253, 224, 71, 0.8)", transition: { duration: 0.3 } },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: "spring" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("events");
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight;
        section.classList.toggle("shadow-2xl", isVisible);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="events"
      className="relative bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 min-h-[600px] transition-all duration-500"
    >
      <motion.img
        src="https://images.unsplash.com/photo-1505373877841-8d25f22d582f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
        alt="Events Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        onError={(e) => {
          e.target.style.display = "none";
          console.error("Failed to load events background");
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Head
          title="Join workshops, hackathons, conferences, and community meetups"
          head={<span>Our <span className="text-yellow-400">Events</span></span>}
        />

        {/* Upcoming Events */}
        <motion.div className="mb-16" variants={containerVariants} initial="initial" animate="animate">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Upcoming <span className="text-yellow-400">Events</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-black/60 p-5 sm:p-6 rounded-xl shadow-lg border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div className="space-y-2">
                  <h4 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    <span className="text-yellow-400">Date</span> {event.date}
                  </p>
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    <span className="text-yellow-400">Time</span> {event.time}
                  </p>
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    <span className="text-yellow-400">Location</span> {event.location}
                  </p>
                  <span className="inline-block mt-3 px-3 py-1 text-xs font-medium text-yellow-400 bg-yellow-400/20 rounded-full">
                    {event.type}
                  </span>
                </div>
                <motion.button
                  onClick={() => openModal(event)}
                  className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Events */}
        <motion.div variants={containerVariants} initial="initial" animate="animate">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Past <span className="text-yellow-400">Events</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-black/60 p-5 rounded-xl shadow-lg border border-yellow-400/20 hover:border-yellow-400/50 transition-all cursor-pointer"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onClick={() => setSelectedPastEvent(event)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <h4 className="text-lg font-semibold text-white line-clamp-2">{event.title}</h4>
                <p className="text-sm text-gray-300 mt-1">Date: {event.date}</p>
                <p className="text-xs text-yellow-400 mt-2">Click to view details →</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          >
            <motion.div
              className="bg-black/90 p-6 sm:p-8 rounded-xl max-w-md w-full border border-yellow-400/30 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl hover:text-yellow-400"
              >
                ×
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
                Register for: {selectedEvent.title}
              </h2>
              <RegistrationForm eventTitle={selectedEvent.title} onClose={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past Event Detail Modal */}
      <AnimatePresence>
        {selectedPastEvent && (
          <PastEventModal
            event={selectedPastEvent}
            onClose={() => setSelectedPastEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Events;