# Monolith Deployment Guide

This guide shows you how to deploy your entire React + Express app as a single service, avoiding the need to deploy frontend and backend separately.

## What We've Changed

1. **Modified backend** to serve the built frontend files
2. **Updated build process** to create a true monolith
3. **Added deployment configurations** for various platforms

## Quick Start

```bash
# Build and test the monolith locally
npm run build:monolith
npm start

# Your app will be available at http://localhost:3000
```

## Deployment Options

### Option 1: Render (Recommended - Free)

**Pros:**

- Free tier: 750 hours/month
- Auto-sleep after 15 min (wakes up on request)
- Easy GitHub integration
- Automatic HTTPS

**Steps:**

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: `react-ecommerce-monolith`
   - **Build Command**: `npm run build:monolith`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
6. Click "Create Web Service"

**Environment Variables:**

- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will override this)

### Option 2: Railway

**Pros:**

- $5 free credit monthly
- Excellent performance
- Simple deployment

**Steps:**

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and sign up
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Configure:
   - **Build Command**: `npm run build:monolith`
   - **Start Command**: `npm start`
6. Deploy

### Option 3: Fly.io

**Pros:**

- Free tier: 3 shared-cpu VMs
- Global deployment
- Good performance

**Steps:**

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Create app: `fly apps create react-ecommerce-monolith`
4. Deploy: `fly deploy`

## Local Testing

Before deploying, test your monolith locally:

```bash
# Build everything
npm run build:monolith

# Start the backend (which now serves the frontend)
npm start

# Visit http://localhost:3000
```

## File Structure After Build

```
backend/
├── public/           # Built frontend files
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/             # Backend source
├── package.json
└── ...
```

## Environment Variables

Set these in your deployment platform:

```bash
NODE_ENV=production
PORT=10000
# Add any other backend environment variables
```

## API Endpoints

Your API endpoints are now available at:

- `/api/auth/*` - Authentication routes
- `/*` - Frontend routes (served by Express)

## Troubleshooting

### Build Issues

```bash
# Clean and rebuild
rm -rf backend/public
npm run build:monolith
```

### Port Issues

- Render uses port 10000 by default
- Railway auto-assigns ports
- Fly.io uses port 8080 by default

### Frontend Not Loading

- Check if `backend/public/` directory exists
- Verify `index.html` is in the public folder
- Check Express static file serving

## Cost Comparison

| Platform | Free Tier     | Paid Plans   | Best For                    |
| -------- | ------------- | ------------ | --------------------------- |
| Render   | 750h/month    | $7/month+    | Pet projects, demos         |
| Railway  | $5 credit     | $5/month+    | Small apps, testing         |
| Fly.io   | 3 VMs         | $1.94/month+ | Production apps             |
| Vercel   | Frontend only | $20/month+   | Frontend + separate backend |

## Recommendation

For your pet project, use **Render**:

- Completely free for small projects
- Simple deployment
- Good performance
- Auto-sleep saves resources
- Perfect for monoliths

## Next Steps

1. Test the monolith locally: `npm run build:monolith && npm start`
2. Push your changes to GitHub
3. Deploy to Render using the steps above
4. Your entire app will be available at one URL! 🎉
