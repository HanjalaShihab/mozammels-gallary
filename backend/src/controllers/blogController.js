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
    console.log('\n===== BLOG CREATE REQUEST =====');
    console.log('Time:', new Date().toISOString());
    console.log('Body received:', JSON.stringify(req.body, null, 2));
    
    const postData = {
      ...req.body,
      coverImage: req.body.coverImage || (req.file ? req.file.path : null)
    };
    
    console.log('Post data before slug generation:', {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      contentLength: postData.content ? postData.content.length : 0,
      coverImage: postData.coverImage ? 'present' : 'missing'
    });
    
    // Generate slug if not provided or empty
    if (!postData.slug || postData.slug.trim() === '') {
      if (postData.title) {
        postData.slug = postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        console.log('Generated slug from title:', postData.slug);
      } else {
        console.error('NO TITLE PROVIDED');
        throw new Error('Title is required');
      }
    }
    
    // Ensure slug is lowercase and valid
    postData.slug = postData.slug.toLowerCase().trim();
    console.log('Final slug:', postData.slug);
    
    console.log('Creating new Blog instance...');
    const post = new Blog(postData);
    
    console.log('Calling save() on blog instance...');
    const newPost = await post.save();
    
    console.log('✓ Blog saved successfully!');
    console.log('Saved blog ID:', newPost._id);
    console.log('Saved blog title:', newPost.title);
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('\n===== BLOG CREATE ERROR =====');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    console.error('Full error:', error);
    
    res.status(400).json({ 
      message: error.message, 
      details: error.errors,
      errorName: error.name
    });
  }
};

// Update blog post
exports.updatePost = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      ...(req.file && { coverImage: req.file.path }),
      ...(req.body.coverImage && { coverImage: req.body.coverImage })
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
