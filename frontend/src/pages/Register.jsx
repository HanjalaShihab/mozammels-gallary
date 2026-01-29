import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, AlertCircle, CheckCircle, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (result.success) {
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError(result.error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          {/* Header with gradient */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-purple-600 rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <UserPlus className="text-white" size={40} />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Join Us
            </h1>
            <p className="text-gray-600 text-lg">Be part of our art community</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-semibold mb-3">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-semibold mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-semibold mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3 text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">Minimum 6 characters</p>
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-semibold mb-3">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full pl-12 pr-12 py-3 text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-700 font-medium">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3"
              >
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-green-700 font-medium">{success}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-4 bg-gradient-to-r from-green-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg mt-6"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={22} />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white/95 text-gray-500 font-medium">Already registered?</span>
            </div>
          </div>

          {/* Login Button */}
          <motion.div variants={itemVariants}>
            <Link
              to="/login"
              className="w-full py-4 px-4 border-2 border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all text-center text-lg flex items-center justify-center gap-2"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Back to Home */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
