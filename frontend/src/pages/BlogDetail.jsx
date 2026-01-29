import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Heart, Trash2, MessageCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      console.log(`Fetching blog with ID: ${id}`);
      const response = await api.get(`/blogs/${id}`);
      console.log('Blog fetched:', response.data);
      setBlog(response.data);
      setComments(response.data.comments || []);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        author: 'Anonymous',
        text: comment,
        date: new Date().toLocaleDateString()
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleDeleteComment = (index) => {
    if (user && user.role === 'admin') {
      setComments(comments.filter((_, i) => i !== index));
    }
  };

  const handleReply = (commentIndex) => {
    if (replyText.trim()) {
      const updatedComments = [...comments];
      const comment = updatedComments[commentIndex];
      
      if (!comment.replies) {
        comment.replies = [];
      }
      
      comment.replies.push({
        author: user ? user.name : 'Anonymous',
        text: replyText,
        date: new Date().toLocaleDateString()
      });
      
      setComments(updatedComments);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleDeleteReply = (commentIndex, replyIndex) => {
    if (user && user.role === 'admin') {
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies.splice(replyIndex, 1);
      setComments(updatedComments);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/blog" className="text-primary-600 hover:text-primary-700 font-semibold">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Blog post not found.</p>
          <Link to="/blog" className="text-primary-600 hover:text-primary-700 font-semibold">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Featured Image */}
          {blog.coverImage && (
            <div className="relative h-96 md:h-[500px] overflow-hidden bg-gray-200">
              <img
                src={blog.coverImage || 'https://via.placeholder.com/800x500?text=No+Image'}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                  console.log('Image load error:', blog.coverImage);
                  e.target.src = 'https://via.placeholder.com/800x500?text=No+Image';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {blog.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200"
            >
              <span className="flex items-center gap-2">
                <User size={18} />
                {blog.author?.name || 'Mozammel'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {formatDate(blog.createdAt)}
              </span>
              {blog.readTime && (
                <span className="flex items-center gap-2">
                  ⏱️ {blog.readTime} min read
                </span>
              )}
            </motion.div>

            {/* Excerpt */}
            {blog.excerpt && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-700 italic mb-8 border-l-4 border-primary-600 pl-6"
              >
                {blog.excerpt}
              </motion.p>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="prose prose-lg max-w-none mb-12 text-gray-800"
            >
              <div 
                className="leading-relaxed ql-editor"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 py-8 border-t border-b border-gray-200"
            >
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  liked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                {liked ? 'Liked' : 'Like'}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                <Share2 size={20} />
                Share
              </button>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Comments ({comments.length})</h2>

              {/* Add Comment */}
              <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Leave a Comment</h3>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                  rows="4"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((cmt, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-white">{cmt.author}</p>
                          <span className="text-sm text-gray-400">{cmt.date}</span>
                        </div>
                        <div className="flex gap-2">
                          {user && user.role === 'admin' && (
                            <button
                              onClick={() => handleDeleteComment(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-gray-700 rounded"
                              title="Delete comment"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-white mb-4">{cmt.text}</p>
                      {user && user.role === 'admin' && (
                        <button
                          onClick={() => setReplyingTo(replyingTo === index ? null : index)}
                          className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                        >
                          <MessageCircle size={14} /> Reply
                        </button>
                      )}
                      
                      {/* Reply Form */}
                      {replyingTo === index && user && user.role === 'admin' && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none text-sm"
                            rows="3"
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleReply(index)}
                              className="px-3 py-1 bg-primary-600 text-white rounded text-sm font-semibold hover:bg-primary-700 transition-colors"
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm font-semibold hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Replies List */}
                      {cmt.replies && cmt.replies.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {cmt.replies.map((reply, replyIndex) => (
                            <div
                              key={replyIndex}
                              className="bg-gray-700 rounded-lg p-4 ml-4 border border-gray-600"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-semibold text-white text-sm">{reply.author}</p>
                                  <span className="text-xs text-gray-400">{reply.date}</span>
                                </div>
                                {user && user.role === 'admin' && (
                                  <button
                                    onClick={() => handleDeleteReply(index, replyIndex)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-gray-600 rounded"
                                    title="Delete reply"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                              <p className="text-gray-100 text-sm">{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-white text-center py-8">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.article>

        {/* Related Articles Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <Link
            to="/blog"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Read More Articles
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
