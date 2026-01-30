const Artwork = require('../models/Artwork');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const { mockArtworks } = require('../data/mockData');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to check if DB is connected
const isDBConnected = () => mongoose.connection.readyState === 1;

// Get all artworks with filtering
exports.getAllArtworks = async (req, res) => {
  try {
    const { category, featured, limit, sort } = req.query;
    
    // Use mock data if DB is not connected
    if (!isDBConnected()) {
      let filtered = [...mockArtworks];
      
      if (category) {
        filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
      }
      if (featured) {
        filtered = filtered.filter(a => a.featured === (featured === 'true'));
      }
      if (limit) {
        filtered = filtered.slice(0, parseInt(limit));
      }
      
      return res.json(filtered);
    }

    let query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    let artworks = Artwork.find(query);

    if (sort) {
      const sortOptions = {
        newest: { createdAt: -1 },
        oldest: { createdAt: 1 },
        popular: { views: -1 }
      };
      artworks = artworks.sort(sortOptions[sort] || { createdAt: -1 });
    }

    if (limit) {
      artworks = artworks.limit(parseInt(limit));
    }

    const result = await artworks.exec();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single artwork
exports.getArtwork = async (req, res) => {
  try {
    // Use mock data if DB is not connected
    if (!isDBConnected()) {
      const artwork = mockArtworks.find(a => a._id === req.params.id);
      if (!artwork) {
        return res.status(404).json({ message: 'Artwork not found' });
      }
      return res.json(artwork);
    }

    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    
    // Increment views
    artwork.views += 1;
    await artwork.save();
    
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create artwork
exports.createArtwork = async (req, res) => {
  try {
    let imageUrl = '';
    
    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'artist-portfolio/artworks'
      });
      imageUrl = result.secure_url;
    } else {
      imageUrl = req.body.imageUrl || req.body.imgUrl || req.body.image || '';
    }

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required.' });
    }

    const artwork = new Artwork({
      ...req.body,
      imageUrl
    });

    await artwork.save();
    res.status(201).json(artwork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get latest artworks for homepage
exports.getLatestArtworks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    
    // Use mock data if DB is not connected
    if (!isDBConnected()) {
      return res.json(mockArtworks.slice(0, limit));
    }

    const artworks = await Artwork.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get artwork categories
exports.getCategories = async (req, res) => {
  try {
    // Use mock data if DB is not connected
    if (!isDBConnected()) {
      const categories = [...new Set(mockArtworks.map(a => a.category))];
      return res.json(categories);
    }

    const categories = await Artwork.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};