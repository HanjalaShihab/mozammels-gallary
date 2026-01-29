import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Heart, Share2, Eye } from 'lucide-react';
import axios from 'axios';

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const fetchArtwork = async () => {
    try {
      const response = await axios.get(`/api/artworks/${id}`);
      setArtwork(response.data);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Send like to backend
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: artwork.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 rounded-xl h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Artwork not found</h2>
          <Link to="/gallery" className="text-primary-600 hover:underline">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

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
        {/* Back Button */}
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full rounded-xl shadow-2xl"
            />
            {artwork.featured && (
              <div className="absolute top-4 left-4 bg-primary-600 text-white px-4 py-2 rounded-full font-semibold">
                Featured
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {artwork.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {formatDate(artwork.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Tag size={18} />
                  {artwork.category}
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Medium:</span>
                <span className="font-semibold text-gray-900">
                  {artwork.medium || 'Mixed Media'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-semibold text-gray-900">
                  {artwork.dimensions || '24" x 36"'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span className="font-semibold text-gray-900">
                  {new Date(artwork.createdAt).getFullYear()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  liked
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                {liked ? 'Liked' : 'Like'}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-gray-600 border-t pt-6">
              <span className="flex items-center gap-2">
                <Eye size={20} />
                {artwork.views || 0} views
              </span>
              <span className="flex items-center gap-2">
                <Heart size={20} />
                {artwork.likes || 0} likes
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
