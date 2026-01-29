const Blog = require('../models/Blog');

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const posts = await Blog.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get latest blog posts
exports.getLatestPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const posts = await Blog.find().sort({ createdAt: -1 }).limit(limit);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog post
exports.getPost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create blog post
exports.createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null
    };
    
    const post = new Blog(postData);
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update blog post
exports.updatePost = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      ...(req.file && { imageUrl: req.file.path })
    };
    
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete blog post
exports.deletePost = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
