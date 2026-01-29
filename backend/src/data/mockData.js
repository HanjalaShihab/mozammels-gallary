// Mock data for demo purposes

const mockArtworks = [
  {
    _id: '1',
    title: 'Starlight Symphony',
    description: 'A breathtaking abstract piece capturing the essence of night sky',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'Abstract',
    featured: true,
    views: 234,
    likes: 89,
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'Ocean Whispers',
    description: 'Serene coastal landscape with dynamic ocean waves',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'Landscape',
    featured: true,
    views: 156,
    likes: 67,
    createdAt: new Date()
  },
  {
    _id: '3',
    title: 'Urban Dreams',
    description: 'Modern cityscape with vibrant colors and architectural elements',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'Urban',
    featured: false,
    views: 123,
    likes: 45,
    createdAt: new Date()
  },
  {
    _id: '4',
    title: 'Forest Serenity',
    description: 'Peaceful woodland scene with natural light streaming through trees',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'Nature',
    featured: true,
    views: 198,
    likes: 76,
    createdAt: new Date()
  },
  {
    _id: '5',
    title: 'Colors of Emotion',
    description: 'Expressive abstract work exploring human emotions through color',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'Abstract',
    featured: false,
    views: 145,
    likes: 58,
    createdAt: new Date()
  },
  {
    _id: '6',
    title: 'Golden Hour',
    description: 'Beautiful portrait capturing the magic of golden hour lighting',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'Portrait',
    featured: true,
    views: 267,
    likes: 102,
    createdAt: new Date()
  }
];

const mockShopItems = [
  {
    _id: '1',
    title: 'Sunset Dreams',
    description: 'Acrylic painting capturing the beauty of coastal sunsets',
    price: 450,
    original: true,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'painting',
    available: true,
    prints: [
      { size: '12x16', price: 45 },
      { size: '18x24', price: 75 },
      { size: '24x36', price: 120 }
    ]
  },
  {
    _id: '2',
    title: 'Abstract Harmony',
    description: 'Modern abstract print for contemporary spaces',
    price: 85,
    original: false,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800',
    category: 'print',
    available: true,
    prints: [
      { size: '8x10', price: 25 },
      { size: '12x16', price: 45 }
    ]
  }
];

const mockCourses = [
  {
    _id: '1',
    title: 'Introduction to Watercolor',
    description: 'Learn the basics of watercolor painting in this beginner-friendly course.',
    price: 49.99,
    level: 'beginner',
    duration: '4 weeks',
    lessons: 12,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800',
    featured: true
  },
  {
    _id: '2',
    title: 'Advanced Oil Painting Techniques',
    description: 'Master advanced techniques in oil painting with professional guidance.',
    price: 99.99,
    level: 'advanced',
    duration: '8 weeks',
    lessons: 24,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800',
    featured: true
  },
  {
    _id: '3',
    title: 'Digital Art Fundamentals',
    description: 'Get started with digital art using modern software and techniques.',
    price: 59.99,
    level: 'intermediate',
    duration: '6 weeks',
    lessons: 18,
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800',
    featured: false
  }
];

const mockBlogs = [
  {
    _id: '1',
    title: 'The Journey of Color Theory',
    excerpt: 'Understanding how colors work together in harmony',
    content: 'Color theory is fundamental to creating compelling artwork. In this post, we explore the color wheel, complementary colors, and how to use them effectively in your art.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800',
    author: 'Mozammel',
    readTime: '5 min read',
    tags: ['art', 'color', 'technique'],
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'Finding Your Artistic Style',
    excerpt: 'Discovering what makes your art unique',
    content: 'Every artist has a unique voice. This article guides you through the process of finding and developing your personal artistic style.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800',
    author: 'Mozammel',
    readTime: '7 min read',
    tags: ['art', 'creativity', 'style'],
    createdAt: new Date()
  }
];

module.exports = {
  mockArtworks,
  mockShopItems,
  mockCourses,
  mockBlogs
};
