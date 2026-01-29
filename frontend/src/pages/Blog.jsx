import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  Tag, 
  BookOpen, 
  TrendingUp, 
  Sparkles,
  Share2,
  Bookmark,
  Heart,
  Eye,
  ChevronRight,
  ChevronLeft,
  Grid,
  List,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBlogs, subscribeNewsletter } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [featuredPost, setFeaturedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [imageErrors, setImageErrors] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const postsPerPage = 6;

  const containerRef = useRef(null);
  const featuredRef = useRef(null);

  // Demo posts for fallback
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetchBlogs();
      if (response && response.length > 0) {
        setPosts(response);
        setFeaturedPost(response[0]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract all unique categories from posts
  const categories = ['all', ...new Set(posts.flatMap(post => post.tags || []))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      (post.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (post.content?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (post.excerpt?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) || false);
    
    const matchesCategory = 
      activeCategory === 'all' || 
      (post.tags && post.tags.includes(activeCategory));
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleBookmark = (postId) => {
    setBookmarkedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleImageError = (postId) => {
    console.log('Image failed to load for post ID:', postId);
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  };

  const handleNewsletterSubscribe = async () => {
    if (!newsletterEmail.trim()) {
      setNewsletterStatus('Please enter your email.');
      return;
    }
    try {
      setNewsletterStatus('Subscribing...');
      await subscribeNewsletter({ email: newsletterEmail, source: 'blog-cta' });
      setNewsletterStatus('Subscribed successfully!');
      setNewsletterEmail('');
    } catch (error) {
      const msg = error.response?.data?.message || 'Subscription failed.';
      setNewsletterStatus(msg);
    }
  };

  // Get image URL with fallback
  const getImageUrl = (post) => {
    const postId = post._id;
    
    if (imageErrors[postId]) {
      return getFallbackImage();
    }
    
    const url = post.coverImage || post.image || getFallbackImage();
    console.log('Image URL for', post.title, ':', url);
    return url;
  };

  const getFallbackImage = () => {
    const fallbacks = [
      'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      'https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const getAuthorName = (post) => {
    if (typeof post.author === 'string') return post.author;
    if (post.author?.name) return post.author.name;
    return 'Mozammel';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featuredVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Category pill component
  const CategoryPill = ({ category, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(category)}
      className={`px-4 py-2 rounded-full font-medium transition-all ${
        isActive
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {category}
    </motion.button>
  );

  // Loading skeleton component
  const PostSkeleton = () => (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-20 bg-gray-300 rounded" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 rounded-full w-16" />
          <div className="h-6 bg-gray-300 rounded-full w-16" />
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-12"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: 0
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 1
            }}
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              background: `radial-gradient(circle, hsl(${270 + i * 10}, 60%, 80%) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              opacity: 0.1
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Insights & Inspiration</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
              Creative Chronicles
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Dive into the world of digital artistry, creative techniques, and industry insights. 
            Where imagination meets innovation.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for insights, tutorials, or stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow-lg"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow">
              <Filter size={18} />
            </button>
          </motion.div>
        </motion.div>

        {/* Featured Post */}
        <AnimatePresence>
          {featuredPost && !loading && (
            <motion.div
              ref={featuredRef}
              variants={featuredVariants}
              initial="hidden"
              animate="visible"
              className="mb-16"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                {/* Background Image with Overlay */}
                <div className="relative h-[400px] md:h-[500px] bg-gray-200">
                  <img
                    src={getImageUrl(featuredPost)}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 1,
                      opacity: 1,
                      display: 'block'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src);
                      handleImageError(featuredPost._id);
                    }}
                  />
                  
                  {/* Fallback if image fails */}
                  {imageErrors[featuredPost._id] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-20 h-20 text-white/50 mx-auto mb-4" />
                        <p className="text-white/70">Featured Image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Featured Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10"
                  style={{ position: 'absolute', zIndex: 10 }}
                >
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium">
                        Featured Story
                      </span>
                      <span className="text-white/80 text-sm">
                        {formatDate(featuredPost.createdAt)}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-white/90 mb-6 text-lg line-clamp-2">
                      {featuredPost.excerpt || featuredPost.content?.substring(0, 200) + '...'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">
                            {getAuthorName(featuredPost)}
                          </span>
                        </div>
                        <span className="text-white/70 flex items-center gap-1">
                          <Clock size={16} />
                          {featuredPost.readTime || '5 min read'}
                        </span>
                      </div>
                      
                      <Link
                        to={`/blog/${featuredPost._id}`}
                        className="group flex items-center gap-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-gray-100 transition-all"
                      >
                        Read Full Story
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories & View Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Topics</h2>
              <p className="text-gray-600">Filter by category or browse all</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <List size={20} />
                </button>
              </div>
              <span className="text-gray-500">
                {filteredPosts.length} articles found
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.slice(0, 10).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <CategoryPill
                  category={category}
                  isActive={activeCategory === category}
                  onClick={setActiveCategory}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid/List */}
        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {[...Array(6)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'} gap-6`}
            >
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  variants={itemVariants}
                  className={`group relative ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all'
                      : 'bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'
                  }`}
                  whileHover={{ y: -5 }}
                >
                  {/* Post Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'h-48' : 'h-64 md:h-48 md:w-48 md:float-left mr-6'}`}>
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-100 to-pink-100">
                      <img
                        src={getImageUrl(post)}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          zIndex: 1,
                          opacity: 1,
                          display: 'block'
                        }}
                        onError={() => handleImageError(post._id)}
                      />
                      
                      {/* Fallback if image fails */}
                      {imageErrors[post._id] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                            <p className="text-purple-400 font-medium">{post.title}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(post._id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                      >
                        <Heart 
                          size={18} 
                          className={likedPosts[post._id] ? 'fill-red-500 text-red-500' : 'text-gray-700'} 
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBookmark(post._id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                      >
                        <Bookmark 
                          size={18} 
                          className={bookmarkedPosts[post._id] ? 'fill-blue-500 text-blue-500' : 'text-gray-700'} 
                        />
                      </motion.button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className={viewMode === 'grid' ? 'p-6' : 'p-6 md:pt-6'}>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime || '5 min read'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      <Link to={`/blog/${post._id}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + '...'}
                    </p>

                    {/* Tags & Author */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {getAuthorName(post)}
                          </span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post._id}`}
                        className="flex items-center gap-1 text-purple-600 font-medium text-sm group-hover:gap-2 transition-all"
                      >
                        Read More
                        <ChevronRight size={16} />
                      </Link>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                      {post.tags?.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Newsletter CTA */}
        {!loading && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Stay Inspired</h3>
              <p className="text-white/90 mb-8 text-lg">
                Subscribe to get the latest articles, tutorials, and creative insights delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 rounded-full text-white-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={handleNewsletterSubscribe}
                  className="px-8 py-3 bg-white text-purple-700 font-bold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {newsletterStatus && (
                <p className="mt-4 text-sm text-white/90">{newsletterStatus}</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;