import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, Sparkles } from 'lucide-react';
import ArtworkGrid from '../components/ArtworkGrid';
import { fetchLatestArtworks } from '../services/api';

const Home = () => {
  const [latestArtworks, setLatestArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await fetchLatestArtworks(6);
        setLatestArtworks(data);
      } catch (error) {
        console.error('Error loading artworks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, []);

  const stats = [
    { label: 'Artworks Created', value: '150+', icon: <Sparkles /> },
    { label: 'Happy Collectors', value: '200+', icon: <Users /> },
    { label: 'Years Experience', value: '10+', icon: <Award /> },
    { label: 'Exhibitions', value: '25+', icon: <Star /> },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-50 to-accent-100">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-40 right-40 w-80 h-80 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full text-primary-600 font-semibold text-sm border border-primary-200 shadow-lg">
                ✨ Welcome to Artistic Excellence
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Where{' '}
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Imagination
              </span>
              <br />
              Comes to Life
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover breathtaking artworks, master creative techniques, and immerse yourself in the world of art
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transition-all transform shadow-lg"
                >
                  Explore Gallery
                  <ArrowRight className="ml-2" size={24} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white/90 backdrop-blur-sm border-2 border-primary-400 text-primary-700 font-bold text-lg rounded-2xl hover:bg-white hover:shadow-xl transition-all"
                >
                  Start Learning
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Artworks Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900">Latest Creations</h2>
            <p className="text-gray-600 mt-2">Fresh from the studio</p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
          >
            View All Artworks
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-square"></div>
              </div>
            ))}
          </div>
        ) : (
          <ArtworkGrid artworks={latestArtworks} />
        )}
      </section>

      {/* Featured Courses */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Master the Art
            </h2>
            <p className="text-gray-600 mb-8">
              Join my online courses and transform your artistic skills with personalized guidance.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all"
            >
              Explore Courses
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Ready to Start Your Collection?
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              Browse unique artworks available for purchase or commission a custom piece tailored to your vision.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/shop"
                className="inline-flex items-center px-10 py-5 bg-white text-primary-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl"
              >
                Visit Shop
                <ArrowRight className="ml-2" size={24} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;