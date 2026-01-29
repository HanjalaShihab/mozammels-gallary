import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ShoppingBag, BookOpen, MessageSquare, User, Menu, X, LogOut, Shield, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/gallery', label: 'Gallery', icon: <Palette size={18} /> },
    { path: '/shop', label: 'Shop', icon: <ShoppingBag size={18} /> },
    { path: '/courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { path: '/blog', label: 'Blog', icon: <MessageSquare size={18} /> },
    { path: '/contact', label: 'Contact', icon: <User size={18} /> },
    { path: '/about', label: 'About', icon: <Palette size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full glass-effect z-50 border-b border-primary-100/50 shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/50 transition-all"
            >
              <Palette className="text-white" size={26} />
            </motion.div>
            <span className="text-2xl font-display font-bold">
              <span className="text-gray-900">Mozammel's</span>
              <span className="gradient-text">Gallery</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 relative group ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                >
                  <span className={`transition-transform duration-300 group-hover:scale-110 ${
                    location.pathname === item.path ? 'text-primary-500' : 'text-gray-500 group-hover:text-primary-500'
                  }`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
            
          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{user?.name}</span>
                </motion.div>
                {user?.role === 'admin' && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hover:shadow-lg transition-all duration-300 font-semibold"
                    >
                      <Shield size={18} />
                      Admin
                    </Link>
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  <LogOut size={18} />
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-300 font-semibold"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="px-6 py-2.5 text-white bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg hover:from-primary-600 hover:to-secondary-600 hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-gradient-to-r from-primary-100 to-secondary-100 hover:from-primary-200 hover:to-secondary-200 transition-all"
          >
            {isOpen ? <X size={24} className="text-primary-600" /> : <Menu size={24} className="text-primary-600" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-2 border-t border-primary-100">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-primary-50'
                      }`}
                    >
                      <span className={location.pathname === item.path ? 'text-white' : 'text-primary-500'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="border-t border-primary-100 pt-6 mt-4 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
                        <p className="text-sm font-semibold text-gray-800">Welcome, {user?.name}</p>
                      </div>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all font-semibold"
                        >
                          <Shield size={18} />
                          Admin Panel
                        </Link>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all font-semibold"
                      >
                        <LogOut size={18} />
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block text-center px-4 py-3 text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-all font-semibold"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="block text-center px-4 py-3 text-white bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all font-semibold"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;