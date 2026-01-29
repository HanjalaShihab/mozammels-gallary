import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Sparkles, CheckCircle, Instagram, Twitter, Facebook, Linkedin, Palette } from 'lucide-react';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeSocial, setActiveSocial] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send message. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: <Instagram />, label: 'Instagram', color: 'from-pink-500 to-purple-500', href: '#' },
    { icon: <Twitter />, label: 'Twitter', color: 'from-blue-400 to-cyan-500', href: '#' },
    { icon: <Facebook />, label: 'Facebook', color: 'from-blue-600 to-blue-700', href: '#' },
    { icon: <Linkedin />, label: 'LinkedIn', color: 'from-blue-700 to-blue-800', href: '#' },
  ];

  const contactItems = [
    {
      icon: <Mail className="text-white" size={24} />,
      title: "Email",
      info: "contact@mozammelsgallery.com",
      subInfo: "Response within 24 hours",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: <Phone className="text-white" size={24} />,
      title: "Phone",
      info: "+1 (555) 123-4567",
      subInfo: "Mon-Fri, 9AM-6PM EST",
      gradient: "from-blue-500 to-cyan-400",
      delay: 0.2
    },
    {
      icon: <MapPin className="text-white" size={24} />,
      title: "Studio Location",
      info: "New York, NY",
      subInfo: "By appointment only",
      gradient: "from-emerald-500 to-teal-400",
      delay: 0.3
    },
    {
      icon: <Clock className="text-white" size={24} />,
      title: "Response Time",
      info: "Within 24 hours",
      subInfo: "For all inquiries",
      gradient: "from-amber-500 to-orange-500",
      delay: 0.4
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-primary-200 to-secondary-200 opacity-10"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header with Creative Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 border-2 border-primary-200/30 rounded-full"
            />
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <MessageSquare className="text-white" size={32} />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Let's </span>
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Create Together
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every masterpiece begins with a conversation. Share your vision, and let's bring 
            it to life with colors, textures, and emotions that tell your unique story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactItems.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay }}
                  whileHover={{ y: -6 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40`} />
                  <div className="relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:shadow-[0_25px_45px_rgba(0,0,0,0.14)]">
                    <div className="flex items-start justify-between gap-3">
                      <div className={`h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg ring-4 ring-white/70`}>
                        {item.icon}
                      </div>
                      <div className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white shadow-lg">
                        <CheckCircle size={18} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm uppercase tracking-widest text-gray-500">{item.title}</h3>
                      <p className="mt-1 text-base sm:text-lg font-bold text-gray-900 leading-snug break-words">
                        {item.info}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">{item.subInfo}</p>
                    </div>
                    <div className="mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 overflow-hidden">
                      <span className={`block h-full w-2/3 rounded-full bg-gradient-to-r ${item.gradient}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-yellow-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Connect Socially</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setActiveSocial(social.label)}
                    onHoverEnd={() => setActiveSocial(null)}
                    className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${social.color} 
                               text-white font-semibold transition-all duration-300 
                               hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]`}
                  >
                    <motion.div
                      animate={{ rotate: activeSocial === social.label ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {social.icon}
                    </motion.div>
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>
              
              <p className="text-gray-400 text-sm mt-6 text-center">
                Follow for behind-the-scenes, art tips, and exclusive previews!
              </p>
            </motion.div>

            {/* Studio Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Palette className="text-primary-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Studio Hours</h3>
              </div>
              <div className="space-y-2">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'By Appointment' },
                ].map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700">{schedule.day}</span>
                    <span className="font-semibold text-primary-600">{schedule.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Form Background Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-8">
                <h2 className="text-3xl font-bold text-white mb-2">Send Your Message</h2>
                <p className="text-primary-100">I'm excited to hear about your creative ideas!</p>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <label className="block text-gray-700 font-semibold mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 
                                 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                                 outline-none transition-all duration-300 bg-gray-50"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 
                                 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                                 outline-none transition-all duration-300 bg-gray-50"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Project Type
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 
                               focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                               outline-none transition-all duration-300 bg-gray-50"
                      placeholder="Commission, Collaboration, Workshop, etc."
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Your Vision
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 
                               focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                               outline-none transition-all duration-300 bg-gray-50 resize-none"
                      placeholder="Tell me about your project, ideas, timeline, and any specific requirements..."
                    />
                  </motion.div>

                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-600" size={24} />
                          <div>
                            <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                            <p className="text-green-600">I'll review your message and get back to you within 24 hours.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
                      >
                        <p className="text-red-700 font-medium">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 
                             text-white rounded-xl font-bold text-lg
                             hover:from-primary-700 hover:to-secondary-700 
                             hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)]
                             transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending Your Message...
                      </>
                    ) : (
                      <>
                        Send Creative Brief <Send size={20} />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-500 text-sm">
                    I typically respond within 24 hours. For urgent matters, please call.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Visit the Studio</h3>
            <div className="h-64 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 font-medium">123 Art Street, Creative District</p>
                <p className="text-white/50">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;