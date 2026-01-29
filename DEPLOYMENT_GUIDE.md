# Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development)
2. [Database Setup](#database-setup)
3. [Authentication Testing](#authentication-testing)
4. [Deploying to Vercel & MongoDB Atlas](#deployment)

---

## 🚀 Local Development

### Prerequisites
- Node.js v14+ installed
- npm or yarn package manager

### Setup Steps

1. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

2. **Configure Environment Variables**

   **Backend** (.env):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/artist_portfolio
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your_secret_key_change_this_in_production
   
   # Optional: Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Optional: Email
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

   **Frontend** (.env):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Access the App**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

---

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Recommended for Cloud Hosting)

**Step-by-Step:**

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up with email or Google/GitHub
   - Click "Build a Cluster"

2. **Create a Free Cluster**
   - Select "Free" tier
   - Choose your region (pick closest to your users)
   - Click "Create Cluster"
   - Wait 2-5 minutes for cluster to be ready

3. **Create Database User**
   - In left sidebar: "Database Access"
   - Click "Add New Database User"
   - Username: your_username (remember this!)
   - Password: generate secure password (copy it!)
   - Role: "Atlas admin"
   - Click "Add User"

4. **Get Connection String**
   - Go to "Clusters" in sidebar
   - Click "Connect" button
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<username>` with your username

5. **Update .env with MongoDB Atlas URI**
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/artist_portfolio?retryWrites=true&w=majority
   ```

6. **Test Connection**
   ```bash
   npm run dev
   # You should see: "✓ MongoDB connected"
   ```

### Option 2: Local MongoDB

**For Windows:**
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Run installer and follow setup
3. MongoDB runs on `mongodb://localhost:27017`

**For macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://pgp.mongodb.com/server-5.0.asc | sudo apt-key add -
echo "deb http://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
```

---

## ✅ Authentication Testing

### Demo Mode (Without Database)
- Email: `demo@example.com`
- Password: `demo123`
- Works even without MongoDB

### Register a New Account
1. Go to http://localhost:3000/register
2. Fill in name, email, password
3. Click "Create Account"
4. Redirected to home as logged-in user

### Login
1. Go to http://localhost:3000/login
2. Enter credentials
3. Click "Login"
4. Token stored in localStorage
5. Navbar shows user name and logout button

### Logout
- Click "Logout" button in navbar
- Token removed from localStorage
- Redirected to login page

---

## 🌐 Deployment Guide

### Deploy Frontend to Vercel

**Step 1: Push to GitHub**
```bash
cd ~/Documents/mozammels-gallary
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mozammels-gallery.git
git branch -M main
git push -u origin main
```

**Step 2: Deploy on Vercel**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Import Project"
4. Select your GitHub repo
5. Configure environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
6. Deploy!

### Deploy Backend to Vercel (Serverless)

**Option A: Vercel for Backend**

1. Create `vercel.json` in backend root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret",
    "FRONTEND_URL": "https://your-frontend.vercel.app"
  }
}
```

2. Install Vercel CLI:
```bash
npm install -g vercel
vercel
```

3. Deploy:
```bash
cd backend
vercel
```

**Option B: Railway.app (Easier for Express)**

1. Go to https://railway.app
2. Sign up with GitHub
3. Connect GitHub repo
4. Add MongoDB plugin (free tier available)
5. Set environment variables:
   - MONGODB_URI (automatically set by plugin)
   - JWT_SECRET
   - FRONTEND_URL
   - CLOUDINARY credentials (optional)
6. Deploy automatically on push!

### Deploy Backend to Render.com

1. Go to https://render.com
2. Connect GitHub
3. Create "New Web Service"
4. Select your repo
5. Build command: `npm install`
6. Start command: `node src/server.js`
7. Add environment variables
8. Deploy!

---

## 📝 Environment Variables for Production

**Backend (.env)**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/artist_portfolio
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=use_a_strong_random_key_here_at_least_32_chars
JWT_EXPIRE=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (for contact form)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
CONTACT_EMAIL=contact@yourdomain.com
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-api.com/api
```

---

## 🔒 Security Checklist

- [ ] Generate strong JWT_SECRET (use `openssl rand -base64 32`)
- [ ] Set NODE_ENV=production in backend
- [ ] Use HTTPS URLs only in production
- [ ] Enable MongoDB IP whitelist in Atlas
- [ ] Don't commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Set up Cloudinary for image uploads
- [ ] Configure email for contact forms
- [ ] Enable CORS for your domain only

---

## 🔧 Troubleshooting

### "MongoDB connection error"
- Local MongoDB not running: `brew services start mongodb-community` (mac) or `sudo systemctl start mongod` (linux)
- Wrong connection string in .env
- Check MongoDB Atlas IP whitelist includes your IP

### "CORS error"
- Backend CORS not configured for your frontend URL
- Update `FRONTEND_URL` in backend .env

### "Token expires immediately"
- JWT_SECRET too short or undefined
- Check JWT_SECRET in .env matches between local and production

### "Images not uploading"
- Cloudinary credentials missing or wrong
- Check CLOUDINARY_* env vars are set correctly

---

## 📚 Useful Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

---

**Questions?** Check the README.md or create an issue on GitHub!
