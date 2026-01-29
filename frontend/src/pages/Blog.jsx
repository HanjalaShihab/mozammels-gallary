import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Art Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Insights, tutorials, and stories from the world of art
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-500"
            />
          </div>
        </motion.div>

        {/* Blog Posts */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={16} />
                        {post.author || 'Mozammel'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.readTime || '5 min read'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                      <Link to={`/blog/${post._id}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 200) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {post.tags?.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/blog/${post._id}`}
                        className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
                      >
                        Read More <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
