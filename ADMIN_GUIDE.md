# Admin Dashboard - Field Requirements Guide

## How to Submit Forms Without Errors

The admin dashboard requires specific fields for each content type. Here's what you need to fill in:

---

## 📖 BLOGS

**Required Fields:**
- **Title**: The blog post title
  - Example: "Understanding Color Theory in Digital Art"
  
- **Slug**: URL-friendly version (auto-generated from title if left empty)
  - Example: "understanding-color-theory-in-digital-art"
  
- **Excerpt**: Short summary (shown in blog listings)
  - Example: "A comprehensive guide to color theory and its application in digital art."
  
- **Content**: Full blog post content
  - Example: "Color theory is the science and art of how colors interact..."
  
- **Cover Image URL**: Link to the blog's featured image
  - Example: "https://example.com/blog-cover.jpg"

**Optional Fields:**
- Author Name: Who wrote the blog
- Tags: Comma-separated tags (e.g., "art, tutorial, digital-art")

---

## 📚 COURSES

**Required Fields:**
- **Title**: Course name
  - Example: "Digital Painting Masterclass"
  
- **Description**: What the course teaches
  - Example: "Learn professional digital painting techniques from beginner to advanced level."
  
- **Price ($)**: Course price in USD
  - Example: 49.99
  
- **Duration**: How long the course takes
  - Example: "6 weeks" or "12 hours of content"
  
- **Category**: Subject area
  - Example: "Digital Art" or "Illustration"
  
- **Level**: Skill level
  - Options: Beginner, Intermediate, Advanced
  
- **Thumbnail Image URL**: Link to course cover image
  - Example: "https://example.com/course-cover.jpg"

**Optional Fields:**
- Instructor Name: Your name as the instructor
- Requirements: What students need (e.g., "Drawing tablet, Procreate")

---

## 🛍️ SHOP ITEMS

**Required Fields:**
- **Artwork ID**: Reference ID of an existing artwork
  - Where to find it: First create an artwork, then copy its ID from the ID field in the artworks list
  - Example: "67a1b2c3d4e5f6g7h8i9j0k1"
  
- **Price ($)**: Item price in USD
  - Example: 29.99
  
- **Available Quantity**: How many copies you have
  - Example: 50

---

## 🎨 ARTWORKS

**Optional Fields (all fields are optional):**
- Title: Artwork name
- Description: Details about the artwork
- Image URL: Link to the artwork image

---

## ❌ Common Errors & Solutions

### Error: "Error saving item: Blog validation failed: slug: duplicate key error"
**Problem**: You're trying to create two blogs with the same slug.
**Solution**: Make sure each blog post has a unique title/slug.

### Error: "Error saving item: ShopItem validation failed: artwork: Cast to ObjectId failed"
**Problem**: The Artwork ID is invalid or doesn't exist.
**Solution**: 
1. Go to Artworks tab
2. Create or find an existing artwork
3. Copy its ID (shown in the item list)
4. Paste it in the "Artwork ID" field in Shop form

### Error: "Network Error"
**Problem**: Server connection issue.
**Solution**: 
1. Check if backend server is running (port 5000)
2. Check browser console for more details
3. Restart the backend: `npm run dev` in backend folder

---

## 🚀 Quick Start Examples

### Create a Blog Post
1. Click "Blogs" tab
2. Click "Add New"
3. Fill in:
   - Title: "My First Artwork Tutorial"
   - Slug: Will be auto-generated
   - Excerpt: "Learn how to create beautiful digital paintings"
   - Content: "In this tutorial, I'll show you..."
   - Cover Image: "https://example.com/image.jpg"
4. Click "Create"

### Create a Course
1. Click "Courses" tab
2. Click "Add New"
3. Fill in:
   - Title: "Watercolor Basics"
   - Description: "Master the fundamentals of watercolor painting"
   - Price: 29.99
   - Duration: "4 weeks"
   - Category: "Painting"
   - Level: "Beginner"
   - Thumbnail: "https://example.com/course.jpg"
4. Click "Create"

### Create a Shop Item
1. **First**: Create an artwork (if not already done)
2. Click "Artworks" tab → "Add New" → Fill details → "Create"
3. Copy the artwork ID
4. **Then**: Create shop item
5. Click "Shop" tab → "Add New"
6. Fill in:
   - Artwork ID: (paste the ID you copied)
   - Price: 25.00
   - Available Quantity: 100
7. Click "Create"

---

## 📋 Required vs Optional Summary

| Content Type | Required Fields | Count |
|---|---|---|
| Blog | Title, Slug, Excerpt, Content, Cover Image | 5 |
| Course | Title, Description, Price, Duration, Category, Level, Thumbnail | 7 |
| Shop Item | Artwork ID, Price, Available Quantity | 3 |
| Artwork | None (all optional) | 0 |

---

## 💡 Tips

- Use descriptive titles that are SEO-friendly
- Keep excerpts under 160 characters for better display
- Use high-quality image URLs
- Always double-check artwork IDs before creating shop items
- Test in a private browsing window if experiencing caching issues
