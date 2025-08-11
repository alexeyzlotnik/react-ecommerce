# Deployment Guide

## Vercel Deployment (Frontend)

This project is configured for deployment on Vercel. The frontend will be deployed as a static site with optimized builds.

### Prerequisites

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Make sure you have a Vercel account at [vercel.com](https://vercel.com)

### Deployment Steps

1. **Login to Vercel:**

```bash
vercel login
```

2. **Deploy from project root:**

```bash
vercel
```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set project name
   - Confirm build settings

### Environment Variables

Set these in your Vercel project dashboard:

- `VITE_STRAPI_BASE_URL`: Your Strapi backend URL
- `VITE_STRAPI_API_TOKEN`: Your Strapi API token

### Build Configuration

The project is configured with:

- **Build Command**: `npm run build:frontend`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm run install:all`
- **Framework**: Vite

## Backend Deployment

The backend should be deployed separately. Recommended platforms:

### Option 1: Railway

- Easy deployment
- Good for Node.js apps
- Automatic HTTPS

### Option 2: Render

- Free tier available
- Good performance
- Easy environment variable management

### Option 3: Heroku

- Mature platform
- Good documentation
- Various pricing tiers

## Environment Setup

### Frontend (.env)

```bash
VITE_STRAPI_BASE_URL=https://your-backend-url.com
VITE_STRAPI_API_TOKEN=your_api_token
```

### Backend (.env)

```bash
NODE_ENV=production
PORT=3000
# Add your database and other backend configs
```

## Post-Deployment

1. **Update CORS settings** in your backend to allow your Vercel domain
2. **Test all functionality** including authentication and API calls
3. **Monitor performance** using Vercel Analytics
4. **Set up custom domain** if needed

## Troubleshooting

### Common Issues

1. **Build fails**: Check if all dependencies are properly installed
2. **Environment variables not working**: Ensure they're set in Vercel dashboard
3. **API calls failing**: Check CORS settings and backend URL
4. **Routing issues**: Verify Vercel configuration includes proper rewrites

### Useful Commands

```bash
# Test build locally
npm run build:frontend

# Preview build
npm run preview

# Check Vercel status
vercel ls

# Redeploy
vercel --prod
```
