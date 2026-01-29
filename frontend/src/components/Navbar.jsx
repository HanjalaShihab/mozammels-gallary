import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ShoppingBag, BookOpen, MessageSquare, User, Menu, X, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: <Palette size={18} /> },
    { path: '/gallery', label: 'Gallery', icon: <Palette size={18} /> },
    { path: '/shop', label: 'Shop', icon: <ShoppingBag size={18} /> },
    { path: '/courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { path: '/blog', label: 'Blog', icon: <MessageSquare size={18} /> },
    { path: '/contact', label: 'Contact', icon: <MessageSquare size={18} /> },
    { path: '/about', label: 'About', icon: <User size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full glass-effect z-50 border-b border-primary-100/50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Palette className="text-white" size={26} />
            </motion.div>
            <span className="text-2xl font-display font-bold">
              <span className="text-gray-900">Mozammel's</span>
              <span className="gradient-text">Gallery</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all"
                    >
                      <Shield size={18} />
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-white bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg hover:shadow-lg transition-all"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <p className="px-3 py-2 text-sm text-gray-700">Welcome, {user?.name}</p>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block text-center px-4 py-3 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="block text-center px-4 py-3 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors font-medium"
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