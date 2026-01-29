const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');

dotenv.config();

const checkDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artist_portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✓ Connected to MongoDB\n');

    // Check blogs collection
    const blogs = await Blog.find();
    console.log('📝 BLOGS IN DATABASE:');
    console.log(`Total: ${blogs.length}\n`);
    
    if (blogs.length > 0) {
      blogs.forEach((blog, index) => {
        console.log(`Blog ${index + 1}:`);
        console.log(`  ID: ${blog._id}`);
        console.log(`  Title: ${blog.title}`);
        console.log(`  Slug: ${blog.slug}`);
        console.log(`  Has Content: ${blog.content ? '✓' : '✗'}`);
        console.log(`  Has Cover Image: ${blog.coverImage ? '✓' : '✗'}`);
        console.log(`  Created: ${blog.createdAt}`);
        console.log('');
      });
    } else {
      console.log('No blogs found in database.\n');
    }

    // Check collection directly
    const collection = mongoose.connection.collection('blogs');
    const count = await collection.countDocuments();
    console.log(`Direct collection count: ${count}`);
    
    // Get raw documents
    if (count > 0) {
      console.log('\nRaw documents from collection:');
      const docs = await collection.find({}).toArray();
      console.log(JSON.stringify(docs, null, 2));
    }

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();
